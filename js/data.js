/* ==========================================================================
   PORTFOLIO CONTENT  — edit here and BOTH the phone and the laptop update.

   Tip for recruiters' eyes: wherever you can, add a real number to a bullet
   (users, pages, rows of data, load time, team size...). I haven't invented
   any, so look for the  // TODO: metric  hints.
   ========================================================================== */
window.SITE = {
  experience: [
    {
      role: 'Web Master',
      org: 'McMaster AIAA Student Branch',
      dates: 'Jun 2026 – Present',
      current: true,
      tags: ['HTML', 'CSS', 'JavaScript', 'Frontend Architecture', 'Requirements Gathering'],
      bullets: [
        // TODO: metric (e.g. members/sponsors served, pages shipped)
        'Designed, built and deployed the branch\u2019s public website in HTML, CSS and vanilla JavaScript for students, industry sponsors and AIAA partners.',
        'Worked directly with branch leadership to turn stakeholder requirements into a clear, user-friendly information architecture.',
        'Chose a database-free static architecture to keep maintenance near zero, with modular code structured so a backend or CMS can be added later.',
        'Built the codebase and content model to be easy for non-technical executives to edit and hand off each term.'
      ]
    },
    {
      role: 'Sales Associate',
      org: 'Tommy Hilfiger',
      dates: 'Jun – Aug 2025',
      tags: ['Customer Success', 'Communication', 'Product Knowledge'],
      bullets: [
        'Guided customers through product selection, staying current on promotions and inventory to give accurate, confident recommendations.',
        'Contributed to store sales targets through proactive, customer-first engagement.'
      ]
    },
    {
      role: 'Co-op Student',
      org: 'Rel8ed Robot Training Academy',
      dates: 'Feb – Jun 2024',
      tags: ['Data Research', 'Data Cleaning', 'Modeling', 'Web Scraping'],
      bullets: [
        'Learned the end-to-end data workflow: sourcing and researching data, cleaning and preprocessing it, and modeling it to support project goals.',
        'Independently completed research and data-analysis projects, presenting findings and insights.',
        'Contributed to a team web-scraping project, collecting the datasets used for downstream analysis.'
      ]
    },
    {
      role: 'Volunteer',
      org: 'Tuma Foundation',
      dates: 'Apr 2022 – Present',
      current: true,
      tags: ['Event Operations', 'Visual Design', 'Community Outreach'],
      bullets: [
        'Collaborated with volunteer teams to plan, organize and run community events.',
        'Designed social media posts and posters that marketed events and grew community turnout and participation.'
      ]
    }
  ],

  education: [
    {
      school: 'McMaster University',
      degree: 'B.A.Sc. Computer Science',
      dates: 'Sep 2024 – Present',
      coursework: [
        'Data Structures & Algorithms', 'Algorithms & Software Design', 'Concurrent Systems',
        'Computer Architecture', 'Databases', 'Web Development', 'Python Programming'
      ]
    },
    {
      school: 'Sir Winston Churchill Secondary School',
      degree: 'High School Diploma',
      dates: 'Sep 2020 – Jun 2024',
      highlights: [
        'Founding Member & Secretary, Data Analytics Club',
        'Founding Member & Secretary, Math Club',
        'Peer Tutor (Math)',
        'DSBN IDEAS Student Alliance',
        'Yearbook Committee'
      ]
    }
  ],

  skills: {
    groups: [
      {
        name: 'Web',
        items: [
          { name: 'HTML', usedIn: 'McMaster AIAA site \u00b7 MISA platform \u00b7 Drawing app \u00b7 this portfolio' },
          { name: 'CSS', usedIn: 'McMaster AIAA site \u00b7 MISA platform \u00b7 Drawing app \u00b7 this portfolio (including the phone and laptop UIs)' },
          { name: 'JavaScript', usedIn: 'McMaster AIAA site \u00b7 Drawing app (Canvas) \u00b7 this portfolio\u2019s windowing system, music player and apps' }
        ]
      },
      {
        name: 'Backend & Data',
        items: [
          { name: 'PHP', usedIn: 'MISA platform: sessions, admin dashboard, event CRUD, cart and feedback endpoints' },
          { name: 'SQL', usedIn: 'MISA platform: queries through PDO prepared statements \u00b7 Databases coursework' },
          { name: 'Python', usedIn: 'Python Programming coursework \u00b7 data work' }
        ]
      },
      {
        name: 'Systems & Paradigms',
        items: [
          { name: 'Java', usedIn: 'Movie Recommendation System \u00b7 object-oriented design coursework' },
          { name: 'C', usedIn: 'Systems and computer architecture coursework' },
          { name: 'Haskell', usedIn: 'Functional programming coursework' }
        ]
      },
      {
        name: 'CS Foundations',
        items: [
          { name: 'Data Structures & Algorithms', usedIn: 'Core coursework at McMaster' },
          { name: 'Concurrent Systems', usedIn: 'Core coursework at McMaster' },
          { name: 'Databases', usedIn: 'Core coursework at McMaster, applied in the MISA platform' },
          { name: 'Software Design', usedIn: 'Core coursework at McMaster' }
        ]
      }
    ],
    soft: [
      'Reliable, organized and responsible',
      'Works well independently and in a team',
      'Quick learner, comfortable with new tools and domains',
      'Customer-focused communicator',
      'Fluent in Arabic'
    ]
  },

  projects: [
    {
      id: 'aiaa',
      title: 'McMaster AIAA Website',
      blurb: 'Public website for the McMaster AIAA student branch. A database-free static architecture keeps maintenance minimal, and the code is structured so a backend can be added later.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Static Architecture'],
      links: [{ label: 'Live site', url: 'https://mcmasteraiaa.ca' }]
    },
    {
      id: 'misa',
      title: 'MISA Web Platform',
      blurb: 'Full-stack site with account signup, a session-based admin dashboard for creating, editing and deleting events, a merch cart and a feedback system. Database access goes through PDO prepared statements.',
      note: 'The PHP backend needs a PHP/SQL server, so this one is source-only here.',
      tags: ['PHP', 'SQL', 'PDO', 'Sessions', 'JavaScript'],
      links: [{ label: 'View source', url: 'https://github.com/talaidris/portfolio/tree/main/works/MISA' }]
    },
    {
      id: 'movies',
      title: 'Movie Recommendation System',
      blurb: 'Java recommendation engine that matches movies to a user\u2019s stated preferences.',
      tags: ['Java', 'OOP', 'Algorithms'],
      links: [{ label: 'View source', url: 'https://github.com/talaidris/Movie-Recommendation-System' }]
    },
    {
      id: 'draw',
      title: 'Canvas Drawing App',
      blurb: 'Browser drawing tool built on the HTML5 Canvas API: brush and eraser, shape stamps (circle, square, star), three brush sizes, undo and clear.',
      note: 'Best on desktop (mouse input).',
      tags: ['JavaScript', 'Canvas API', 'CSS'],
      links: [{ label: 'Launch', url: 'works/draw/index.html', embed: true }]
    }
  ],

  quickReplies: [
    'Let\u2019s talk about an internship',
    'Could I get your resume?',
    'Love the portfolio!'
  ]
};
