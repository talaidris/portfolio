const STORYGRAPH_PROFILE_URL = 'https://app.thestorygraph.com/profile/talaidris';

const CURRENT_BOOK = {
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl: "https://cdn.thestorygraph.com/i6ymy7lixnjd92criaeph7gly11p"
};

function createStoryGraphWidget() {
    const appGrid = document.getElementById('app-grid');
    if (!appGrid) return;

    // Remove existing widget if any
    const existing = document.getElementById('storygraphWidget');
    if (existing) existing.parentElement?.remove();

    // Create clickable link
    const widgetLink = document.createElement('a');
    widgetLink.href = STORYGRAPH_PROFILE_URL;
    widgetLink.target = '_blank';
    widgetLink.className = 'widget-link';

    // Create widget div
    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'storygraphWidget';
    widgetDiv.className = 'app widget-2x2';

    // Cover image or fallback emoji
    const coverHtml = CURRENT_BOOK.coverUrl
        ? `<img src="${CURRENT_BOOK.coverUrl}" alt="Book cover" onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\'width:80px;height:120px;background:#2c2c2e;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:2rem;\'>📖</div>';">`
        : `<div style="width:80px;height:120px;background:#2c2c2e;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:2rem;">📖</div>`;

    widgetDiv.innerHTML = `
        <div class="widget-content">
            <div class="widget-header">
                <span class="widget-title">currently reading</span>
            </div>
            <div class="book-cover">
                ${coverHtml}
            </div>
            <div class="book-info">
                <div class="book-title">${escapeHtml(CURRENT_BOOK.title)}</div>
                <div class="book-author">${escapeHtml(CURRENT_BOOK.author)}</div>
            </div>
        </div>
    `;

    widgetLink.appendChild(widgetDiv);

    // Insert at the very beginning of app-grid
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

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', createStoryGraphWidget);