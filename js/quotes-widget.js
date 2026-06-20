const QUOTES_API_URL = 'https://programming-quotes-api.vercel.app/api/quotes/random';
const QUOTE_STORAGE_KEY = 'dailyTechQuote';
const QUOTE_STORAGE_TIMESTAMP_KEY = 'dailyTechQuoteTimestamp';

const FALLBACK_QUOTES = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "It’s not a bug – it’s an undocumented feature.", author: "Anonymous" }
];

function getRandomFallback() {
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
}

async function fetchQuote() {
    try {
        const response = await fetch(QUOTES_API_URL);
        if (!response.ok) throw new Error('API response not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch quote:', error);
        return getRandomFallback();
    }
}

async function getDailyQuote() {
    const stored = localStorage.getItem(QUOTE_STORAGE_KEY);
    const storedTimestamp = localStorage.getItem(QUOTE_STORAGE_TIMESTAMP_KEY);
    const now = Date.now();

    if (stored && storedTimestamp) {
        const age = now - parseInt(storedTimestamp, 10);
        if (age < 24 * 60 * 60 * 1000) {
            try {
                return JSON.parse(stored);
            } catch (e) { }
        }
    }

    const newQuote = await fetchQuote();
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(newQuote));
    localStorage.setItem(QUOTE_STORAGE_TIMESTAMP_KEY, String(now));
    return newQuote;
}

async function createQuotesWidget() {
    const quoteData = await getDailyQuote();
    const appGrid = document.getElementById('app-grid');
    if (!appGrid) return;

    const existing = document.getElementById('quotesWidget');
    if (existing) existing.remove();

    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'quotesWidget';
    widgetDiv.className = 'app quotes-widget-link';

    const quoteText = quoteData.text || "Debugging is twice as hard as writing the code in the first place.";
    const author = quoteData.author || "Kent Beck";

    widgetDiv.innerHTML = `
    <div class="quotes-content">
      <div class="quote-icon">💬</div>
      <div class="quote-text">"${escapeHtml(quoteText)}"</div>
      <div class="quote-author">— ${escapeHtml(author)}</div>
    </div>
  `;

    widgetDiv.addEventListener('click', async (e) => {
        e.stopPropagation();
        const newQuote = await fetchQuote();
        localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(newQuote));
        localStorage.setItem(QUOTE_STORAGE_TIMESTAMP_KEY, String(Date.now()));
        createQuotesWidget();
    });

    appGrid.appendChild(widgetDiv);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

document.addEventListener('DOMContentLoaded', createQuotesWidget);