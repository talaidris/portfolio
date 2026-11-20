/* ==========================================================================
   SITE CONFIG  (loaded in <head>, before anything else)

   - Decides whether to show the PHONE or the LAPTOP experience.
   - Holds every image the two experiences use, so you can swap artwork
     for the laptop without touching any other code.

   HOW TO CUSTOMISE THE LAPTOP IMAGES
   1. Drop your files in  images/laptop/  (see the README.txt in there).
   2. Put the path in the `laptop` section below. Any value left as null
      falls back to the phone image, so you can replace things one at a time.
   ========================================================================== */

// Laptop mode kicks in at this viewport size; anything smaller gets the phone.
window.LAPTOP_QUERY = '(min-width: 900px) and (min-height: 520px)';

// Windows that open automatically after the laptop "logs in".
window.LAPTOP_AUTO_OPEN = ['experience'];

window.SITE_IMAGES = {
  phone: {
    wallpaper: 'images/bg.jpg', // set in CSS (#device-screen); listed here for reference
    icons: {
      experience: 'images/safari.png',
      education: 'images/edu.jpg',
      skills: 'images/settings.png',
      projects: 'images/files.png',
      messages: 'images/messages.jpg',
      music: 'images/music.jpg',
      photos: 'images/photos.jpg',
      notes: 'images/notes.jpg',
      weather: 'images/weather.jpg',
      calculator: 'images/calc.jpg',
      todo: 'images/todo.jpg',
      books: 'images/books.jpg'
    },
    // Project thumbnails (portrait/square crops work best on the phone)
    projects: {
      aiaa: 'images/aiaalogo.png',
      misa: 'images/misa.png',
      movies: 'images/movies.jpg',
      draw: 'images/draw.png'
    }
  },

  laptop: {
    // Desktop wallpaper. null = built-in purple gradient (matches the phone).
    // Recommended: 2560x1600 (16:10) landscape, e.g. 'images/laptop/wallpaper.jpg'
    wallpaper: null,

    // Dock icons. Recommended: square, 256x256 or larger.
    // e.g.  projects: 'images/laptop/projects-icon.png'
    icons: {
      experience: null, education: null, skills: null, projects: null,
      messages: null, music: null, photos: null, notes: null,
      weather: null, calculator: null, todo: null, books: null
    },

    // Project thumbnails. Recommended: wide, 16:9 (e.g. 1280x720).
    // e.g.  movies: 'images/laptop/movies-wide.jpg'
    projects: {
      aiaa: null, misa: null, movies: null, draw: null
    }
  }
};

(function () {
  var root = document.documentElement;
  root.dataset.mode = window.matchMedia(window.LAPTOP_QUERY).matches ? 'laptop' : 'phone';

  window.siteMode = function () { return root.dataset.mode; };

  // Image for the current mode, falling back to the phone image.
  window.siteImage = function (kind, key) {
    var own = SITE_IMAGES[siteMode()] && SITE_IMAGES[siteMode()][kind];
    return (own && own[key]) || SITE_IMAGES.phone[kind][key];
  };

  // Re-point every <img data-img-kind data-img-key> and the wallpaper.
  window.applySiteImages = function () {
    document.querySelectorAll('img[data-img-kind]').forEach(function (img) {
      var src = siteImage(img.dataset.imgKind, img.dataset.imgKey);
      if (src && img.getAttribute('src') !== src) img.setAttribute('src', src);
    });
    var wp = SITE_IMAGES.laptop.wallpaper;
    if (wp) root.style.setProperty('--laptop-wallpaper', 'url("' + wp + '") center / cover no-repeat');
    else root.style.removeProperty('--laptop-wallpaper');
  };

  // Where the home-screen widgets live in the current mode.
  window.widgetHost = function () {
    return document.getElementById(siteMode() === 'laptop' ? 'desktop-widgets' : 'app-grid');
  };
})();
