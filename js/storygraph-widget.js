const STORYGRAPH_PROFILE_URL = 'https://app.thestorygraph.com/profile/talaidris';

const CURRENT_BOOK = {
    title: "Infinite Jest",
    author: "David Foster Wallace",
    coverUrl: "https://cdn.thestorygraph.com/k33mx8ap8nk4anb8rzkb9xrjfz8z"
};

function createStoryGraphWidget() {
    const appGrid = (window.widgetHost ? window.widgetHost() : document.getElementById('app-grid'));
    if (!appGrid) return;

    const existing = document.getElementById('storygraphWidget');
    if (existing) (existing.closest('.widget-link') || existing).remove();

    const widgetLink = document.createElement('a');
    widgetLink.href = STORYGRAPH_PROFILE_URL;
    widgetLink.target = '_blank';
    widgetLink.className = 'widget-link';

    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'storygraphWidget';
    widgetDiv.className = 'app widget-2x2';

    // Shown when there's no cover URL, or when the cover image fails to load.
    const coverFallback = '<div style="width:70px;height:105px;background:#2c2c2e;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:2rem;">📖</div>';
    const coverHtml = CURRENT_BOOK.coverUrl
        ? `<img src="${CURRENT_BOOK.coverUrl}" alt="Book cover">`
        : coverFallback;

    widgetDiv.innerHTML = `
        <div class="widget-content">
            <p style ="font-size:0.7rem">currently reading</p>
            <div class="book-cover">${coverHtml}</div>
            <div class="book-info">
                <div class="book-title">${escapeHtml(CURRENT_BOOK.title)}</div>
                <div class="book-author">${escapeHtml(CURRENT_BOOK.author)}</div>
            </div>
        </div>
    `;

    const coverImg = widgetDiv.querySelector('.book-cover img');
    if (coverImg) {
        coverImg.addEventListener('error', function () {
            coverImg.parentElement.innerHTML = coverFallback;
        }, { once: true });
    }

    widgetLink.appendChild(widgetDiv);

    if (appGrid.firstChild) {
        appGrid.insertBefore(widgetLink, appGrid.firstChild);
    } else {
        appGrid.appendChild(widgetLink);
    }
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

document.addEventListener('DOMContentLoaded', createStoryGraphWidget);