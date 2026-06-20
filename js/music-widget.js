var musicWidgetInterval = null;

function createMusicWidget() {
    var appGrid = document.getElementById('app-grid');
    if (!appGrid) return;

    var existing = document.getElementById('musicWidget');
    if (existing) existing.remove();

    var widgetDiv = document.createElement('div');
    widgetDiv.id = 'musicWidget';
    widgetDiv.className = 'app music-widget-link';

    var trackName = audio.src ? (PLAYLIST[currentTrackIndex]?.title || 'No track') : 'No track';
    var artistName = audio.src ? (PLAYLIST[currentTrackIndex]?.artist || '') : '';
    var playSymbol = isPlaying ? '⏸' : '▶';
    var progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    var currentTime = audio.currentTime || 0;
    var totalTime = audio.duration || 0;

    widgetDiv.innerHTML = `
    <div class="music-widget-content">
      <div class="music-widget-track">${escapeHtml(trackName)}</div>
      <div class="music-widget-artist">${escapeHtml(artistName)}</div>
      <div class="music-widget-controls">
        <button class="music-widget-btn" id="mwPrev">⏮</button>
        <button class="music-widget-btn music-widget-play-btn" id="mwPlay">${playSymbol}</button>
        <button class="music-widget-btn" id="mwNext">⏭</button>
      </div>
      <div class="music-widget-progress">
        <span class="music-widget-time" id="mwCurrent">${formatTimeWidget(currentTime)}</span>
        <div class="music-widget-progress-bar">
          <div class="music-widget-progress-fill" id="mwProgress" style="width: ${progress}%;"></div>
        </div>
        <span class="music-widget-time" id="mwTotal">${formatTimeWidget(totalTime)}</span>
      </div>
      <div class="music-widget-volume">
        <button class="music-widget-vol-btn" id="mwVolDown">🔉</button>
        <span class="music-widget-vol-text" id="mwVolText">${Math.round(volume * 100)}%</span>
        <button class="music-widget-vol-btn" id="mwVolUp">🔊</button>
      </div>
    </div>
  `;

    appGrid.appendChild(widgetDiv);

    document.getElementById('mwPlay').addEventListener('click', function (e) {
        e.stopPropagation();
        togglePlay();
        updateMusicWidgetUI();
    });
    document.getElementById('mwPrev').addEventListener('click', function (e) {
        e.stopPropagation();
        prevTrack();
        updateMusicWidgetUI();
    });
    document.getElementById('mwNext').addEventListener('click', function (e) {
        e.stopPropagation();
        nextTrack();
        updateMusicWidgetUI();
    });
    document.getElementById('mwVolDown').addEventListener('click', function (e) {
        e.stopPropagation();
        volume = Math.max(0, volume - 0.1);
        audio.volume = volume;
        updateMusicWidgetUI();
    });
    document.getElementById('mwVolUp').addEventListener('click', function (e) {
        e.stopPropagation();
        volume = Math.min(1, volume + 0.1);
        audio.volume = volume;
        updateMusicWidgetUI();
    });

    audio.addEventListener('play', updateMusicWidgetUI);
    audio.addEventListener('pause', updateMusicWidgetUI);
    audio.addEventListener('timeupdate', updateMusicWidgetUI);
    audio.addEventListener('ended', updateMusicWidgetUI);

    if (musicWidgetInterval) clearInterval(musicWidgetInterval);
    musicWidgetInterval = setInterval(updateMusicWidgetUI, 1000);

    updateMusicWidgetUI();
}

function updateMusicWidgetUI() {
    var trackEl = document.querySelector('#musicWidget .music-widget-track');
    var artistEl = document.querySelector('#musicWidget .music-widget-artist');
    var playBtn = document.getElementById('mwPlay');
    var progressFill = document.getElementById('mwProgress');
    var currentTimeEl = document.getElementById('mwCurrent');
    var totalTimeEl = document.getElementById('mwTotal');
    var volText = document.getElementById('mwVolText');

    if (!trackEl) return;

    var track = PLAYLIST[currentTrackIndex] || { title: 'No track', artist: '' };
    trackEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;

    if (playBtn) playBtn.textContent = isPlaying ? '⏸' : '▶';

    if (audio.duration) {
        var progress = (audio.currentTime / audio.duration) * 100;
        if (progressFill) progressFill.style.width = progress + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTimeWidget(audio.currentTime);
        if (totalTimeEl) totalTimeEl.textContent = formatTimeWidget(audio.duration);
    } else {
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = '0:00';
        if (totalTimeEl) totalTimeEl.textContent = '0:00';
    }

    if (volText) volText.textContent = Math.round(volume * 100) + '%';
}

function formatTimeWidget(seconds) {
    if (!seconds) return '0:00';
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
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

window.updateMusicWidgetUI = updateMusicWidgetUI;

document.addEventListener('DOMContentLoaded', createMusicWidget);