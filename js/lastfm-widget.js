const LASTFM_USERNAME = 'tala_99';
const LASTFM_API_KEY = '89568cb61390b9b6852985589a863c8d';
const LASTFM_PROFILE_URL = `https://www.last.fm/user/${LASTFM_USERNAME}`;

async function fetchNowPlaying() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const track = data.recenttracks?.track?.[0];
        if (!track) throw new Error('No track data');
        const nowPlaying = track['@attr']?.nowplaying === 'true';
        return {
            nowPlaying,
            name: track.name || 'Unknown',
            artist: track.artist?.['#text'] || 'Unknown',
            cover: track.image?.find(img => img.size === 'large')?.['#text'] || '',
            url: track.url || LASTFM_PROFILE_URL
        };
    } catch (error) {
        console.error('Last.fm fetch error:', error);
        return null;
    }
}

async function createLastFmWidget() {
    const track = await fetchNowPlaying();
    const appGrid = document.getElementById('app-grid');
    if (!appGrid) return;

    // Remove existing widget if any
    const existing = document.getElementById('lastfmWidget');
    if (existing) existing.parentElement?.remove();

    const widgetLink = document.createElement('a');
    widgetLink.href = track?.url || LASTFM_PROFILE_URL;
    widgetLink.target = '_blank';
    widgetLink.className = 'lastfm-widget-link';

    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'lastfmWidget';
    widgetDiv.className = 'app';

    let coverHtml = '';
    if (track?.cover) {
        coverHtml = `<img src="${track.cover}" alt="Album art" onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\'width:80px;height:80px;background:#2c2c2e;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2rem;\'>🎵</div>';">`;
    } else {
        coverHtml = `<div style="width:80px;height:80px;background:#2c2c2e;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2rem;">🎵</div>`;
    }

    const statusText = track?.nowPlaying ? 'Now playing' : 'Last played';
    const trackName = track?.name || 'Nothing playing';
    const artistName = track?.artist || 'Check my profile';

    widgetDiv.innerHTML = `
        <div class="lastfm-content">
            <div class="lastfm-header">
                <span class="lastfm-icon">🎧</span>
                <span class="lastfm-title">last.fm</span>
            </div>
            <div class="lastfm-cover">
                ${coverHtml}
            </div>
            <div class="lastfm-track-info">
                <div class="lastfm-track-name">${escapeHtml(trackName)}</div>
                <div class="lastfm-artist">${escapeHtml(artistName)}</div>
                <div class="lastfm-status">${statusText}</div>
            </div>
        </div>
    `;

    widgetLink.appendChild(widgetDiv);
    appGrid.appendChild(widgetLink); // appended at end to appear bottom‑right
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

// Refresh every 30 seconds
createLastFmWidget();
setInterval(createLastFmWidget, 30000);