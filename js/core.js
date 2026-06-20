function showTime() {
  let date = new Date();
  let hours24 = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours24 >= 12 ? 'PM' : 'AM';
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;
  let minutesStr = minutes < 10 ? "0" + minutes : minutes;
  let time = hours12 + ":" + minutesStr + " " + ampm;
  document.getElementById("clockdisplay").innerText = time;
  setTimeout(showTime, 1000);
}
showTime();

let screen = document.getElementById("device-screen");
let appgrid = document.getElementById("app-grid");
let homeB = document.getElementById("home");

let expCon = document.getElementById("experienceC");
let eduCon = document.getElementById("educationC");
let skillCon = document.getElementById("skillsC");
let pcon = document.getElementById("projectsC");
let messagesContainer = document.getElementById("messagesC");
let musicCon = document.getElementById("musicAppC");
let photosCon = document.getElementById("photosAppC");
let notesCon = document.getElementById("notesAppC");
let weatherCon = document.getElementById("weatherAppC");
let calcCon = document.getElementById("calculatorAppC");
let todoCon = document.getElementById("todoAppC");
let booksCon = document.getElementById("booksAppC");

let expApp = document.getElementById("experienceApp");
let eduApp = document.getElementById("educationApp");
let skillApp = document.getElementById("skillsApp");
let projectsApp = document.getElementById("projectspage");
let messagesApp = document.getElementById("messagesApp");
let musicApp = document.getElementById("musicApp");
let photosApp = document.getElementById("photosApp");
let notesApp = document.getElementById("notesApp");
let weatherApp = document.getElementById("weatherApp");
let calcApp = document.getElementById("calculatorApp");
let todoApp = document.getElementById("todoApp");
let booksApp = document.getElementById("booksApp");

const allContainers = [
  expCon, eduCon, skillCon, pcon, messagesContainer,
  musicCon, photosCon, notesCon, weatherCon, calcCon,
  todoCon, booksCon
];
allContainers.forEach(function (c) {
  if (c) c.style.display = "none";
});

function resetToHome() {
  allContainers.forEach(function (c) {
    if (c) c.style.display = "none";
  });
  appgrid.style.display = "grid";
  screen.style.background = "";
  screen.style.display = "";
  screen.style.flexDirection = "";
  screen.style.overflowY = "hidden";
  appgrid.classList.remove('app-grid-transition');
  appgrid.classList.add('app-grid-transition');
  setTimeout(function () {
    appgrid.classList.remove('app-grid-transition');
  }, 250);
}

function showAppContainer(container, bgColor, isMessages) {
  resetToHome();
  if (container) {
    container.style.display = isMessages ? "flex" : "block";
  }
  appgrid.style.display = "none";
  screen.style.background = bgColor;
  if (isMessages) {
    screen.style.display = "flex";
    screen.style.flexDirection = "column";
    screen.style.overflowY = "hidden";
  } else {
    screen.style.overflowY = "auto";
  }
  if (container) {
    container.classList.add('app-content-enter');
    setTimeout(function () {
      container.classList.remove('app-content-enter');
    }, 250);
  }
  if (isMessages && window.initMessagesApp) {
    window.initMessagesApp();
    setTimeout(function () {
      var msgInput = document.getElementById("messageInput");
      if (msgInput) msgInput.focus();
    }, 100);
  }
}

expApp.addEventListener("click", function () {
  showAppContainer(expCon, "#4e2f63", false);
});
eduApp.addEventListener("click", function () {
  showAppContainer(eduCon, "#4e2f63", false);
});
skillApp.addEventListener("click", function () {
  showAppContainer(skillCon, "#4e2f63", false);
});
projectsApp.addEventListener("click", function () {
  showAppContainer(pcon, "#4e2f63", false);
});
messagesApp.addEventListener("click", function () {
  showAppContainer(messagesContainer, "#0C0C0D", true);
});
musicApp.addEventListener("click", function () {
  showAppContainer(musicCon, "#4e2f63", false);
  initMusicPlayer();
});
photosApp.addEventListener("click", function () {
  showAppContainer(photosCon, "#0C0C0D", false);
  loadPhotos();
});
notesApp.addEventListener("click", function () {
  showAppContainer(notesCon, "#0C0C0D", false);
  loadNote();
});
weatherApp.addEventListener("click", function () {
  showAppContainer(weatherCon, "#2c3e50", false);
  fetchWeather();
});
calcApp.addEventListener("click", function () {
  showAppContainer(calcCon, "#0C0C0D", false);
});
todoApp.addEventListener("click", function () {
  showAppContainer(todoCon, "#4e2f63", false);
});
booksApp.addEventListener("click", function () {
  showAppContainer(booksCon, "#0C0C0D", false);
  loadBooks();
});

homeB.addEventListener("click", function (e) {
  e.stopPropagation();
  resetToHome();
});

// ---------- Lock Screen ----------
document.addEventListener('DOMContentLoaded', function () {
  var lockScreen = document.getElementById('lockScreen');
  if (!lockScreen) return;

  function updateLockDateTime() {
    var now = new Date();
    var dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    var dateStr = now.toLocaleDateString(undefined, dateOptions);
    var hours12 = now.getHours() % 12;
    if (hours12 === 0) hours12 = 12;
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var timeStr = hours12 + ":" + minutes;
    var dateElem = document.getElementById('lockDate');
    var timeElem = document.getElementById('lockTime');
    if (dateElem) dateElem.textContent = dateStr;
    if (timeElem) timeElem.textContent = timeStr;
  }

  updateLockDateTime();
  var lockClockInterval = setInterval(updateLockDateTime, 1000);

  var observer = new MutationObserver(function () {
    if (!document.getElementById('lockScreen')) {
      clearInterval(lockClockInterval);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  var initMessage = document.getElementById('lockInitMessage');
  var passcodeArea = document.getElementById('lockPasscodeArea');
  var numberPad = document.getElementById('numberPad');
  var dots = document.querySelectorAll('.dot');
  var bigClockContainer = document.querySelector('.lock-screen-top');
  var deviceScreen = document.getElementById('device-screen');
  var CORRECT_PASSCODE = '2026';

  function unlock() {
    lockScreen.classList.add('hide');
    setTimeout(function () {
      lockScreen.remove();
    }, 600);
  }

  function startAutoUnlock() {
    if (initMessage) initMessage.style.display = 'none';
    if (passcodeArea) passcodeArea.style.display = 'flex';
    if (numberPad) numberPad.style.display = 'flex';
    if (bigClockContainer) bigClockContainer.style.display = 'none';
    if (deviceScreen) deviceScreen.classList.add('show-top-clock');
    dots.forEach(function (dot) {
      dot.classList.remove('filled');
    });

    var index = 0;
    var interval = setInterval(function () {
      if (index < CORRECT_PASSCODE.length) {
        var digit = CORRECT_PASSCODE[index];
        if (dots[index]) dots[index].classList.add('filled');

        var buttons = document.querySelectorAll('.num-row button[data-num]');
        buttons.forEach(function (btn) {
          if (btn.getAttribute('data-num') === digit) {
            btn.style.transform = 'scale(0.94)';
            btn.style.backgroundColor = 'rgba(255,255,255,0.4)';
            setTimeout(function () {
              btn.style.transform = '';
              btn.style.backgroundColor = '';
            }, 150);
          }
        });
        index++;
      } else {
        clearInterval(interval);
        setTimeout(unlock, 200);
      }
    }, 450);
  }

  lockScreen.addEventListener('click', function clickHandler() {
    lockScreen.removeEventListener('click', clickHandler);
    startAutoUnlock();
  });
});

// ---------- Music Player ----------
var audio = new Audio();
var isPlaying = false;
var currentTrackIndex = 0;
var volume = 0.7;
var PLAYLIST = [
  { title: 'Adding the Sun', artist: 'Kevin MacLeod (incompetech.com)', file: 'AddingtheSun.mp3' },
  { title: 'CloudDancer', artist: 'Kevin MacLeod (incompetech.com)', file: 'CloudDancer.mp3' },
  { title: 'Leavinig Home', artist: 'Kevin MacLeod (incompetech.com)', file: 'LeavingHome.mp3' },
  { title: 'Thunderbird', artist: 'Kevin MacLeod (incompetech.com)', file: 'Thunderbird.mp3' },
  { title: 'Almost Bliss', artist: 'Kevin MacLeod (incompetech.com)', file: 'AlmostBliss.mp3' }
];

function initMusicPlayer() {
  var trackName = document.getElementById('musicTrackName');
  var artistName = document.getElementById('musicArtistName');
  var playBtn = document.getElementById('musicPlayBtn');
  var prevBtn = document.getElementById('musicPrevBtn');
  var nextBtn = document.getElementById('musicNextBtn');
  var volDown = document.getElementById('musicVolDownBtn');
  var volUp = document.getElementById('musicVolUpBtn');
  var progressFill = document.getElementById('musicProgressFill');
  var currentTimeEl = document.getElementById('musicCurrentTime');
  var totalTimeEl = document.getElementById('musicTotalTime');
  var artworkEl = document.getElementById('musicArtwork');

  if (!playBtn) return;

  playBtn.onclick = function (e) {
    e.stopPropagation();
    togglePlay();
  };
  prevBtn.onclick = function (e) {
    e.stopPropagation();
    prevTrack();
  };
  nextBtn.onclick = function (e) {
    e.stopPropagation();
    nextTrack();
  };
  volDown.onclick = function (e) {
    e.stopPropagation();
    volume = Math.max(0, volume - 0.1);
    audio.volume = volume;
    var volText = document.getElementById('musicVolumeText');
    if (volText) volText.textContent = Math.round(volume * 100) + '%';
    if (window.updateMusicWidgetUI) window.updateMusicWidgetUI();
  };
  volUp.onclick = function (e) {
    e.stopPropagation();
    volume = Math.min(1, volume + 0.1);
    audio.volume = volume;
    var volText = document.getElementById('musicVolumeText');
    if (volText) volText.textContent = Math.round(volume * 100) + '%';
    if (window.updateMusicWidgetUI) window.updateMusicWidgetUI();
  };

  if (audio.src && currentTrackIndex >= 0 && currentTrackIndex < PLAYLIST.length) {
    updateMusicUI();
    return;
  }
  loadTrack(0);
}

function updateMusicUI() {
  var trackName = document.getElementById('musicTrackName');
  var artistName = document.getElementById('musicArtistName');
  var playBtn = document.getElementById('musicPlayBtn');
  var progressFill = document.getElementById('musicProgressFill');
  var currentTimeEl = document.getElementById('musicCurrentTime');
  var totalTimeEl = document.getElementById('musicTotalTime');
  var artworkEl = document.getElementById('musicArtwork');

  if (!trackName) return;

  trackName.textContent = PLAYLIST[currentTrackIndex].title || 'Unknown Track';
  artistName.textContent = PLAYLIST[currentTrackIndex].artist || 'Unknown Artist';
  if (artworkEl) artworkEl.textContent = '🎵';
  if (playBtn) playBtn.textContent = isPlaying ? '⏸' : '▶';
  if (audio.duration) {
    var progress = (audio.currentTime / audio.duration) * 100;
    if (progressFill) progressFill.style.width = progress + '%';
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    if (totalTimeEl) totalTimeEl.textContent = formatTime(audio.duration);
  }
}

function loadTrack(index) {
  if (index >= PLAYLIST.length) index = 0;
  if (index < 0) index = PLAYLIST.length - 1;
  currentTrackIndex = index;
  audio.src = 'music/' + PLAYLIST[index].file;
  audio.volume = volume;
  var trackName = document.getElementById('musicTrackName');
  var artistName = document.getElementById('musicArtistName');
  var artworkEl = document.getElementById('musicArtwork');
  if (trackName) trackName.textContent = PLAYLIST[index].title || 'Unknown Track';
  if (artistName) artistName.textContent = PLAYLIST[index].artist || 'Unknown Artist';
  if (artworkEl) artworkEl.textContent = '🎵';
  if (isPlaying) {
    audio.play().catch(function (e) { console.log('Playback error:', e); });
  }
  if (window.updateMusicWidgetUI) window.updateMusicWidgetUI();
}

function togglePlay() {
  if (audio.src === '') loadTrack(0);
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(function (e) { console.log('Playback error:', e); });
  }
  isPlaying = !isPlaying;
  var playBtn = document.getElementById('musicPlayBtn');
  if (playBtn) playBtn.textContent = isPlaying ? '⏸' : '▶';
  if (window.updateMusicWidgetUI) window.updateMusicWidgetUI();
}

function nextTrack() {
  loadTrack(currentTrackIndex + 1);
  if (isPlaying) audio.play().catch(function (e) { console.log('Playback error:', e); });
  if (window.updateMusicWidgetUI) window.updateMusicWidgetUI();
}

function prevTrack() {
  loadTrack(currentTrackIndex - 1);
  if (isPlaying) audio.play().catch(function (e) { console.log('Playback error:', e); });
  if (window.updateMusicWidgetUI) window.updateMusicWidgetUI();
}

function updateProgress() {
  if (audio.duration) {
    var progress = (audio.currentTime / audio.duration) * 100;
    var progressFill = document.getElementById('musicProgressFill');
    var currentTimeEl = document.getElementById('musicCurrentTime');
    var totalTimeEl = document.getElementById('musicTotalTime');
    if (progressFill) progressFill.style.width = progress + '%';
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    if (totalTimeEl) totalTimeEl.textContent = formatTime(audio.duration);
  }
}

function formatTime(seconds) {
  var mins = Math.floor(seconds / 60);
  var secs = Math.floor(seconds % 60);
  return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', function () {
  updateProgress();
  if (window.updateMusicWidgetUI) window.updateMusicWidgetUI();
});
audio.addEventListener('ended', function () {
  nextTrack();
});

// ---------- Photos ----------
// ---------- Photos ----------
var PHOTO_LIST = [
  { file: 'bunnies.jpg', description: 'matching amigurumi bunnies' },
  { file: 'angrycat.jpg', description: 'amigurumi angry cat' },
  { file: 'rose.jpg', description: 'crochet rose' },
  { file: 'cat.jpg', description: 'amigurumi cat' },
  { file: 'hearts.jpg', description: 'matching heart pillows' },
  { file: 'spidey.jpg', description: 'hanging spiderman charm' },
  { file: 'sunflowers.jpg', description: 'crochet sunflowers' },
  { file: 'turtle.jpg', description: 'amigurumi baby sea turtle' },

];

function loadPhotos() {
  var grid = document.getElementById('photosGrid');
  if (!grid) return;
  grid.innerHTML = '';
  PHOTO_LIST.forEach(function (item, index) {
    var div = document.createElement('div');
    div.className = 'photo-item';
    var img = document.createElement('img');
    img.src = 'images/photos/' + item.file;
    img.alt = 'Photo ' + (index + 1);
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    img.style.cursor = 'pointer';
    img.dataset.index = index;
    div.appendChild(img);
    div.addEventListener('click', function () {
      openLightbox(index);
    });
    grid.appendChild(div);
  });
}

function openLightbox(index) {
  var lightbox = document.getElementById('photoLightbox');
  var img = document.getElementById('photoLightboxImg');
  var desc = document.getElementById('photoLightboxDesc');
  if (!lightbox || !img || !desc) return;
  var item = PHOTO_LIST[index];
  img.src = 'images/photos/' + item.file;
  desc.textContent = item.description;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  var lightbox = document.getElementById('photoLightbox');
  if (lightbox) lightbox.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  var closeBtn = document.getElementById('photoLightboxClose');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  var lightbox = document.getElementById('photoLightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });
  }
});

// ---------- Notes ----------
function loadNote() {
  var textarea = document.getElementById('notesTextarea');
  if (!textarea) return;
  var saved = localStorage.getItem('userNote');
  if (saved) textarea.value = saved;
  textarea.addEventListener('input', function () {
    localStorage.setItem('userNote', textarea.value);
  });
}

// ---------- Weather ----------
function fetchWeather() {
  var statusEl = document.getElementById('weatherCondition');
  if (statusEl) statusEl.textContent = 'Loading...';

  if (!navigator.geolocation) {
    if (statusEl) statusEl.textContent = 'Geolocation not supported';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (pos) {
      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;
      var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh';

      fetch(url)
        .then(function (response) {
          if (!response.ok) throw new Error('Weather API error');
          return response.json();
        })
        .then(function (data) {
          var weather = data.current_weather;
          var temp = Math.round(weather.temperature);
          var wind = Math.round(weather.windspeed);
          var code = weather.weathercode;
          var icon, condition;

          if (code === 0) { icon = '☀️'; condition = 'Clear'; }
          else if (code <= 3) { icon = '⛅'; condition = 'Partly cloudy'; }
          else if (code <= 49) { icon = '🌫️'; condition = 'Fog'; }
          else if (code <= 69) { icon = '🌧️'; condition = 'Rain'; }
          else if (code <= 79) { icon = '❄️'; condition = 'Snow'; }
          else if (code <= 99) { icon = '⛈️'; condition = 'Thunderstorm'; }
          else { icon = '☁️'; condition = 'Cloudy'; }

          var iconEl = document.getElementById('weatherIcon');
          var tempEl = document.getElementById('weatherTemp');
          var condEl = document.getElementById('weatherCondition');
          var humidEl = document.getElementById('weatherHumidity');
          var windEl = document.getElementById('weatherWind');

          if (iconEl) iconEl.textContent = icon;
          if (tempEl) tempEl.textContent = temp + '°C';
          if (condEl) condEl.textContent = condition;
          if (humidEl) humidEl.textContent = '--';
          if (windEl) windEl.textContent = wind + ' km/h';
        })
        .catch(function (err) {
          console.error('Weather fetch error:', err);
          if (statusEl) statusEl.textContent = 'Error loading weather';
        });
    },
    function (err) {
      console.error('Geolocation error:', err);
      if (statusEl) statusEl.textContent = 'Location unavailable';
    }
  );
}

var weatherRefreshBtn = document.getElementById('weatherRefreshBtn');
if (weatherRefreshBtn) {
  weatherRefreshBtn.addEventListener('click', fetchWeather);
}

// ---------- Calculator ----------
var calcDisplay = document.getElementById('calcDisplay');
var calcExpression = '';

function updateCalcDisplay(value) {
  if (calcDisplay) calcDisplay.textContent = value || '0';
}

var calcButtons = document.querySelectorAll('.calc-btn');
calcButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var val = btn.dataset.value;
    if (val === 'C') {
      calcExpression = '';
      updateCalcDisplay('0');
    } else if (val === '⌫') {
      calcExpression = calcExpression.slice(0, -1);
      updateCalcDisplay(calcExpression || '0');
    } else if (val === '=') {
      try {
        var expr = calcExpression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        var result = Function('"use strict"; return (' + expr + ')')();
        updateCalcDisplay(result);
        calcExpression = String(result);
      } catch (e) {
        updateCalcDisplay('Error');
        calcExpression = '';
      }
    } else {
      calcExpression += val;
      updateCalcDisplay(calcExpression);
    }
  });
});

// ---------- Custom Cursor (inside phone screen) ----------
(function () {
  var phone = document.getElementById('phone');
  if (!phone) return;

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  // Create cursor element
  var cursor = document.createElement('div');
  cursor.id = 'customCursor';
  cursor.style.position = 'absolute';
  cursor.style.width = '20px';
  cursor.style.height = '20px';
  cursor.style.borderRadius = '50%';
  cursor.style.background = 'rgba(255, 255, 255, 0.5)';
  cursor.style.pointerEvents = 'none';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.zIndex = '9999';
  cursor.style.transition = 'width 0.15s, height 0.15s, background 0.15s';
  cursor.style.display = 'none';
  phone.style.cursor = 'none';
  phone.appendChild(cursor);

  var isInside = false;

  function moveCursor(e) {
    var rect = phone.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    if (!isInside) {
      cursor.style.display = 'block';
      isInside = true;
    }
  }

  function hideCursor() {
    cursor.style.display = 'none';
    isInside = false;
  }

  phone.addEventListener('mousemove', moveCursor);
  phone.addEventListener('mouseleave', hideCursor);
})();