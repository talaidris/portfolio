/* Builds the Experience / Education / Skills / Projects apps from js/data.js.
   The same DOM is reused by the phone and by the laptop windows. */
(function () {
  var S = window.SITE;
  if (!S) return;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function chips(list) {
    if (!list || !list.length) return '';
    return '<div class="chips">' + list.map(function (t) {
      return '<span class="chip">' + esc(t) + '</span>';
    }).join('') + '</div>';
  }
  function bullets(list) {
    return '<ul>' + list.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>';
  }
  function put(id, html) {
    var c = document.getElementById(id);
    if (c) c.innerHTML = html;
  }
  function pill(text, now) {
    return '<span class="pill' + (now ? ' now' : '') + '">' + esc(text) + '</span>';
  }

  // ---- Experience (timeline) ----
  put('experienceC', '<div class="tl">' + S.experience.map(function (x, i) {
    return '<article class="resume-card tl-card reveal" style="--i:' + i + '">' +
      '<div class="card-head"><h2>' + esc(x.role) + '</h2>' + pill(x.dates, x.current) + '</div>' +
      '<p class="org">' + esc(x.org) + '</p>' + bullets(x.bullets) + chips(x.tags) + '</article>';
  }).join('') + '</div>');

  // ---- Education ----
  put('educationC', S.education.map(function (e, i) {
    return '<article class="resume-card reveal" style="--i:' + i + '">' +
      '<div class="card-head"><h2>' + esc(e.school) + '</h2>' + pill(e.dates) + '</div>' +
      '<p class="org">' + esc(e.degree) + '</p>' +
      (e.coursework ? '<p class="sub-label">Relevant coursework</p>' + chips(e.coursework) : '') +
      (e.highlights ? bullets(e.highlights) : '') + '</article>';
  }).join(''));

  // ---- Skills (tap a chip to see where it was used) ----
  put('skillsC',
    '<div class="resume-card skill-detail" id="skillDetail"><strong>Tap a skill</strong>' +
    '<span>to see where I\u2019ve used it.</span></div>' +
    S.skills.groups.map(function (g, i) {
      return '<div class="resume-card skill-group reveal" style="--i:' + (i + 1) + '"><h3>' + esc(g.name) + '</h3>' +
        '<div class="chips">' + g.items.map(function (it) {
          return '<button type="button" class="chip" data-skill="' + esc(it.name) + '" data-used="' + esc(it.usedIn) + '">' + esc(it.name) + '</button>';
        }).join('') + '</div></div>';
    }).join('') +
    '<div class="resume-card reveal" style="--i:5"><h3 class="grp">Working style</h3>' + bullets(S.skills.soft) + '</div>');

  var skillsC = document.getElementById('skillsC');
  if (skillsC) {
    skillsC.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-skill]');
      if (!b) return;
      skillsC.querySelectorAll('button.chip.active').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      document.getElementById('skillDetail').innerHTML =
        '<strong>' + esc(b.dataset.skill) + '</strong><span>' + esc(b.dataset.used) + '</span>';
    });
  }

  // ---- Projects ----
  put('projectsC', S.projects.map(function (p, i) {
    var links = p.links.map(function (l, j) {
      return '<a class="btn' + (j === 0 ? ' primary' : '') + '" href="' + esc(l.url) + '" target="_blank" rel="noopener"' +
        (l.embed ? ' data-embed="' + esc(p.id) + '" data-title="' + esc(p.title) + '"' : '') + '>' + esc(l.label) + '</a>';
    }).join('');
    return '<article class="proj-card reveal" style="--i:' + i + '">' +
      '<img data-img-kind="projects" data-img-key="' + esc(p.id) + '" src="' + esc(window.siteImage ? siteImage('projects', p.id) : '') + '" alt="' + esc(p.title) + ' preview" loading="lazy">' +
      '<div class="proj-body"><h3>' + esc(p.title) + '</h3><p>' + esc(p.blurb) + '</p>' +
      (p.note ? '<p class="note">' + esc(p.note) + '</p>' : '') + chips(p.tags) +
      '<div class="proj-actions">' + links + '</div></div></article>';
  }).join(''));

  // ---- Messages: one-tap starters ----
  var mc = document.getElementById('messagesC');
  var inputRow = mc && mc.querySelector('.chat-input-container');
  if (mc && inputRow && S.quickReplies) {
    var bar = document.createElement('div');
    bar.className = 'quick-replies';
    S.quickReplies.forEach(function (text) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = text;
      b.addEventListener('click', function () {
        var input = document.getElementById('messageInput');
        input.value = text;
        input.focus();
      });
      bar.appendChild(b);
    });
    mc.insertBefore(bar, inputRow);
  }
})();
