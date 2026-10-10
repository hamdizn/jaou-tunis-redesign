const header = document.querySelector('header');
const toggleMenuBtn = document.querySelector('.menu-btn');
const menuOverlay = document.querySelector('.menu-overlay');

if (toggleMenuBtn && menuOverlay) {
  toggleMenuBtn.addEventListener('click', () => {
    const isOpen = menuOverlay.classList.toggle('open');
    toggleMenuBtn.classList.toggle('active', isOpen);
    if (header) header.classList.toggle('header-menu-open', isOpen);
  });
}

const logoHomeLinks = document.querySelectorAll('.nav-brand, .icon-link[aria-label="Home"], .calendar-btn');
logoHomeLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menuOverlay) menuOverlay.classList.remove('open');
    if (toggleMenuBtn) toggleMenuBtn.classList.remove('active');
    if (header) header.classList.remove('header-menu-open');
  });
});

if (header) {
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// Hero Image (5s) <-> Video Cycle
const heroImg = document.getElementById('heroImage');
const heroVideo = document.getElementById('heroVideo');
if (heroImg && heroVideo) {
  // Initially photo is visible: logo is hidden when navbar is transparent
  document.body.classList.remove('hero-video-active');

  function startVideo() {
    heroVideo.classList.add('fade-in');
    heroImg.classList.add('fade-out');
    document.body.classList.add('hero-video-active');
    heroVideo.currentTime = 0;
    heroVideo.play().catch(() => {});
  }

  // Initial 5-second wait on photo before playing video
  setTimeout(startVideo, 5000);

  // When video ends: return to photo for 5s, then play video again
  heroVideo.addEventListener('ended', () => {
    heroVideo.classList.remove('fade-in');
    heroImg.classList.remove('fade-out');
    document.body.classList.remove('hero-video-active');
    setTimeout(startVideo, 5000);
  });

  // Listeners to ensure body class is always in sync with video playback
  heroVideo.addEventListener('play', () => {
    document.body.classList.add('hero-video-active');
  });
  heroVideo.addEventListener('pause', () => {
    if (heroVideo.ended || !heroVideo.classList.contains('fade-in')) {
      document.body.classList.remove('hero-video-active');
    }
  });
}

const menuListItems = document.querySelectorAll('.menu-list-item');
menuListItems.forEach(item => {
  const links = item.querySelectorAll('.list-sub-options a, a.list-category-head');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (menuOverlay) menuOverlay.classList.remove('open');
      if (toggleMenuBtn) toggleMenuBtn.classList.remove('active');
      if (header) header.classList.remove('header-menu-open');
    });
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOverlay.classList.contains('open')) {
    menuOverlay.classList.remove('open');
    toggleMenuBtn.classList.remove('active');
    if (header) header.classList.remove('header-menu-open');
  }
});

// -------------------------------------------------------------
// FULL-SCREEN AMBIENT MOLECULAR BACKGROUND CANVAS ANIMATION
// -------------------------------------------------------------
const canvas = document.getElementById('moleculeCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -1000, y: -1000, isOver: false };
  let speedMultiplier = 1;

  function resizeCanvas() {
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    initParticles(displayW, displayH);
  }

  function initParticles(w, h) {
    particles = [];
    const count = Math.min(95, Math.max(50, Math.floor((w * h) / 11000)));
    // Brand palette colors: Jaou Teal (#14AFA7), Jaou Black (#000000), Deep Teal (#0D9488), Muted Slate (#475569), Ochre Gold (#B45309)
    const colors = ['#14AFA7', '#000000', '#0D9488', '#475569', '#B45309'];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2.8 + 1.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.55 + 0.35
      });
    }
  }

  function drawMolecules() {
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    ctx.clearRect(0, 0, displayW, displayH);

    // Draw connecting lines between particles across the whole background
    const maxDist = 125;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 0, 0, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw and update particles
    particles.forEach(p => {
      // Update position
      p.x += p.vx * speedMultiplier;
      p.y += p.vy * speedMultiplier;

      // Wrap around screen edges smoothly
      if (p.x < 0) p.x = displayW;
      if (p.x > displayW) p.x = 0;
      if (p.y < 0) p.y = displayH;
      if (p.y > displayH) p.y = 0;

      // Mouse interaction (repel/attract)
      if (mouse.isOver) {
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 140) {
          const force = (140 - mdist) / 140;
          p.x -= (mdx / mdist) * force * 2.2;
          p.y -= (mdy / mdist) * force * 2.2;
        }
      }

      // Render particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(drawMolecules);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawMolecules();

  // Mouse position listener across menu overlay
  menuOverlay.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isOver = true;
  });

  menuOverlay.addEventListener('mouseleave', () => {
    mouse.isOver = false;
  });

  // Update photo card dynamically on hover
  const photoTag = document.getElementById('menuPhotoTag');
  const photoTitle = document.getElementById('menuPhotoTitle');
  const photoDesc = document.getElementById('menuPhotoDesc');
  const defaultCard = {
    tag: 'BIENNALE ARCHIPEL',
    title: "AN EXPLORATION OF 'RESISTANCE AS THE DEEPEST FORM OF LOVE'",
    desc: '23 Octobre — 22 Novembre 2026 • Tunis'
  };

  // Accelerate molecules briefly and update featured photo card when hovering menu items
  document.querySelectorAll('.menu-list-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      speedMultiplier = 2.5;
      setTimeout(() => { speedMultiplier = 1; }, 500);

      if (photoTag && photoTitle && photoDesc) {
        const tag = item.getAttribute('data-tag');
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');
        if (tag) photoTag.textContent = tag;
        if (title) photoTitle.textContent = title;
        if (desc) photoDesc.textContent = desc;
      }
    });
  });

  const menuVertList = document.getElementById('menuVerticalList');
  if (menuVertList && photoTag && photoTitle && photoDesc) {
    menuVertList.addEventListener('mouseleave', () => {
      photoTag.textContent = defaultCard.tag;
      photoTitle.textContent = defaultCard.title;
      photoDesc.textContent = defaultCard.desc;
    });
  }
}

// Toggle photo flip card on click/tap
const spotlightPhotoFlip = document.getElementById('spotlightPhotoFlip');
if (spotlightPhotoFlip) {
  spotlightPhotoFlip.addEventListener('click', () => {
    const inner = spotlightPhotoFlip.querySelector('.spotlight-photo-flip-inner');
    if (inner) inner.classList.toggle('is-flipped');
  });
}

// Calendar Page Ambient Molecular Canvas
const calCanvas = document.getElementById('calendarMoleculeCanvas');
if (calCanvas) {
  const ctx = calCanvas.getContext('2d');
  let particles = [];
  let mouse = { x: -1000, y: -1000, isOver: false };
  let speedMultiplier = 1;

  function resizeCalCanvas() {
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    calCanvas.width = displayW * dpr;
    calCanvas.height = displayH * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    initCalParticles(displayW, displayH);
  }

  function initCalParticles(w, h) {
    particles = [];
    const count = Math.min(95, Math.max(50, Math.floor((w * h) / 11000)));
    const colors = ['#14AFA7', '#000000', '#0D9488', '#475569', '#B45309'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2.8 + 1.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.55 + 0.35
      });
    }
  }

  function drawCalMolecules() {
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    ctx.clearRect(0, 0, displayW, displayH);

    const maxDist = 125;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 0, 0, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.x += p.vx * speedMultiplier;
      p.y += p.vy * speedMultiplier;

      if (p.x < 0) p.x = displayW;
      if (p.x > displayW) p.x = 0;
      if (p.y < 0) p.y = displayH;
      if (p.y > displayH) p.y = 0;

      if (mouse.isOver) {
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 140) {
          const force = (140 - mdist) / 140;
          p.x -= (mdx / mdist) * force * 2.2;
          p.y -= (mdy / mdist) * force * 2.2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(drawCalMolecules);
  }

  window.addEventListener('resize', resizeCalCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isOver = true;
  });
  window.addEventListener('mouseleave', () => {
    mouse.isOver = false;
  });
  resizeCalCanvas();
  drawCalMolecules();
}

// -------------------------------------------------------------
// HIGH-PERFORMANCE NATIVE SCROLL REVEAL OBSERVER (UP & DOWN)
// -------------------------------------------------------------
const scrollObserverOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      entry.target.classList.remove('exit-left');
    } else {
      entry.target.classList.remove('is-visible');
      if (entry.boundingClientRect.top < 0) {
        entry.target.classList.add('exit-left');
      } else {
        entry.target.classList.remove('exit-left');
      }
    }
  });
}, scrollObserverOptions);

document.querySelectorAll(
  '.reveal-on-scroll, .reveal-zoom, .reveal-slide-left, .reveal-slide-right, .video-frame, .reveal-form-card, .reveal-artists-track'
).forEach(el => {
  scrollObserver.observe(el);
});

// Dynamic scroll-driven ocean depth effect for Becoming the Ocean section
const artistsSectionEl = document.querySelector('.artists-accordion-section');
if (artistsSectionEl) {
  let tickingScroll = false;
  const updateArtistsScrollProgress = () => {
    if (!tickingScroll) {
      window.requestAnimationFrame(() => {
        const rect = artistsSectionEl.getBoundingClientRect();
        const wh = window.innerHeight;
        if (rect.top < wh && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));
          artistsSectionEl.style.setProperty('--scroll-progress', progress.toFixed(3));
        }
        tickingScroll = false;
      });
      tickingScroll = true;
    }
  };
  window.addEventListener('scroll', updateArtistsScrollProgress, { passive: true });
  updateArtistsScrollProgress();
}

// -------------------------------------------------------------
// DYNAMIC AGENDA FILTERING & CALENDAR HIGHLIGHTING (calendar.html)
// -------------------------------------------------------------
const agendaPills = document.querySelectorAll('.agenda-pill');
const dayBlocks = document.querySelectorAll('.agenda-day-block');
const festivalDayCells = document.querySelectorAll('.day-cell.is-festival');
const tabOct = document.getElementById('tabOct');
const tabNov = document.getElementById('tabNov');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const monthNavTitle = document.getElementById('monthNavTitle');
const octoberDaysGrid = document.getElementById('octoberDaysGrid');
const novemberDaysGrid = document.getElementById('novemberDaysGrid');
const resetDateFilterWrap = document.getElementById('resetDateFilterWrap');
const resetDateFilterBtn = document.getElementById('resetDateFilterBtn');

let currentActiveMonth = 'october';
let activeCategory = 'all';
let selectedDateKey = null; // e.g. "oct-24" or "nov-7"

function switchMonth(targetMonth) {
  currentActiveMonth = targetMonth;
  if (targetMonth === 'october') {
    if (tabOct) tabOct.classList.add('active');
    if (tabNov) tabNov.classList.remove('active');
    if (monthNavTitle) monthNavTitle.textContent = 'October 2026';
    if (octoberDaysGrid) octoberDaysGrid.style.display = 'grid';
    if (novemberDaysGrid) novemberDaysGrid.style.display = 'none';
  } else {
    if (tabNov) tabNov.classList.add('active');
    if (tabOct) tabOct.classList.remove('active');
    if (monthNavTitle) monthNavTitle.textContent = 'November 2026';
    if (novemberDaysGrid) novemberDaysGrid.style.display = 'grid';
    if (octoberDaysGrid) octoberDaysGrid.style.display = 'none';
  }
}

if (tabOct && tabNov) {
  tabOct.addEventListener('click', () => switchMonth('october'));
  tabNov.addEventListener('click', () => switchMonth('november'));
}

if (prevMonthBtn && nextMonthBtn) {
  const toggle = () => switchMonth(currentActiveMonth === 'october' ? 'november' : 'october');
  prevMonthBtn.addEventListener('click', toggle);
  nextMonthBtn.addEventListener('click', toggle);
}

const hexCategoryColors = {
  exhibition: '#E54D8A',
  concert: '#14AFA7',
  performance: '#DC2626',
  encounter: '#EAB308'
};

function updateAgendaDisplay() {
  const targetHex = hexCategoryColors[activeCategory] || null;

  // 1. Update calendar cell highlights
  festivalDayCells.forEach(cell => {
    const strips = Array.from(cell.querySelectorAll('.color-strip'));

    let isMatch = false;
    if (activeCategory !== 'all' && targetHex) {
      isMatch = strips.some(s => {
        const styleAttr = s.getAttribute('style') || '';
        return styleAttr.toUpperCase().includes(targetHex.toUpperCase());
      });
    }

    const colorBars = cell.querySelector('.day-color-bars');

    if (activeCategory === 'all') {
      cell.classList.remove('category-highlighted-day');
      cell.style.backgroundColor = '';
      cell.style.opacity = '1';
      if (colorBars) colorBars.style.opacity = '1';
    } else if (isMatch) {
      cell.classList.add('category-highlighted-day');
      cell.style.backgroundColor = targetHex;
      cell.style.opacity = '1';
      if (colorBars) colorBars.style.opacity = '0';
    } else {
      cell.classList.remove('category-highlighted-day');
      cell.style.backgroundColor = '';
      cell.style.opacity = '0.35';
      if (colorBars) colorBars.style.opacity = '1';
    }
  });

  // 2. Filter event rows & day blocks
  dayBlocks.forEach(block => {
    const blockId = block.getAttribute('id') || '';
    const dateKey = blockId.replace('day-', ''); // e.g. "oct-23" or "nov-14"
    const isDateMatch = selectedDateKey === null || dateKey === selectedDateKey;

    let visibleCount = 0;
    const rows = block.querySelectorAll('.agenda-event-row');
    rows.forEach(row => {
      const cat = row.getAttribute('data-category');
      const isCatMatch = activeCategory === 'all' || cat === activeCategory;

      if (isCatMatch && isDateMatch) {
        row.style.display = 'flex';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (visibleCount > 0 && isDateMatch) {
      block.style.display = 'flex';
    } else {
      block.style.display = 'none';
    }
  });

  if (resetDateFilterWrap) {
    resetDateFilterWrap.style.display = selectedDateKey ? 'block' : 'none';
  }
}

if (agendaPills.length > 0) {
  agendaPills.forEach(pill => {
    pill.addEventListener('click', () => {
      agendaPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');
      activeCategory = filterVal;
      updateAgendaDisplay();
    });
  });
}

if (festivalDayCells.length > 0) {
  festivalDayCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const month = cell.getAttribute('data-month') === 'october' ? 'oct' : 'nov';
      const dateNum = cell.getAttribute('data-date');
      const key = `${month}-${dateNum}`;

      if (selectedDateKey === key) {
        selectedDateKey = null;
        festivalDayCells.forEach(c => c.classList.remove('selected-day'));
      } else {
        selectedDateKey = key;
        festivalDayCells.forEach(c => c.classList.remove('selected-day'));
        cell.classList.add('selected-day');
      }
      updateAgendaDisplay();
    });
  });
}

if (resetDateFilterBtn) {
  resetDateFilterBtn.addEventListener('click', () => {
    selectedDateKey = null;
    festivalDayCells.forEach(c => c.classList.remove('selected-day'));
    updateAgendaDisplay();
  });
}

// -------------------------------------------------------------
// INTERACTIVE FORMS & MODAL ANIMATION HANDLERS
// -------------------------------------------------------------
const openRegisterBtn = document.getElementById('openRegisterModal');
const closeRegisterBtn = document.getElementById('closeRegisterModal');
const registerModal = document.getElementById('registerModal');
const registerModalForm = document.getElementById('registerModalForm');
const registerToast = document.getElementById('registerToast');

if (openRegisterBtn && registerModal) {
  openRegisterBtn.addEventListener('click', () => {
    registerModal.classList.add('open');
  });
}

if (closeRegisterBtn && registerModal) {
  closeRegisterBtn.addEventListener('click', () => {
    registerModal.classList.remove('open');
  });
}

if (registerModal) {
  registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
      registerModal.classList.remove('open');
    }
  });
}

if (registerModalForm && registerToast) {
  registerModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    registerToast.style.display = 'flex';
    setTimeout(() => {
      registerToast.style.display = 'none';
      registerModal.classList.remove('open');
      registerModalForm.reset();
    }, 2800);
  });
}

const newsletterForm = document.getElementById('newsletterForm');
const newsletterToast = document.getElementById('newsletterToast');

if (newsletterForm && newsletterToast) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterToast.style.display = 'flex';
    setTimeout(() => {
      newsletterToast.style.display = 'none';
      newsletterForm.reset();
    }, 4500);
  });
}

// -------------------------------------------------------------
// CINEMATIC CALENDAR PAGE TRANSITION (Art Wipe Curtain)
// -------------------------------------------------------------
const calendarWipe = document.getElementById('calendarPageWipe');
const isCalendarHtmlPage = window.location.pathname.endsWith('calendar.html') || window.location.pathname.endsWith('/calendar');

// Check if navigating in via previous wipe trigger
if (calendarWipe && sessionStorage.getItem('jaou_calendar_wipe') === '1') {
  sessionStorage.removeItem('jaou_calendar_wipe');
  calendarWipe.classList.add('leaving');
  setTimeout(() => {
    calendarWipe.classList.remove('leaving');
  }, 650);
}

// Click listener for Calendar links and buttons
document.addEventListener('click', (e) => {
  const calTrigger = e.target.closest('a[href="calendar.html"], a[href="/calendar"], .calendar-btn');
  if (calTrigger && calendarWipe) {
    e.preventDefault();
    
    // Close menu if open
    if (typeof menuOverlay !== 'undefined' && menuOverlay) menuOverlay.classList.remove('open');
    if (typeof toggleMenuBtn !== 'undefined' && toggleMenuBtn) toggleMenuBtn.classList.remove('active');
    if (typeof header !== 'undefined' && header) header.classList.remove('header-menu-open');

    if (isCalendarHtmlPage) {
      // Re-trigger unveil on calendar page and smooth scroll to top
      calendarWipe.classList.remove('leaving');
      calendarWipe.classList.add('entering');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        calendarWipe.classList.remove('entering');
        calendarWipe.classList.add('leaving');
        setTimeout(() => {
          calendarWipe.classList.remove('leaving');
        }, 650);
      }, 460);
    } else {
      calendarWipe.classList.remove('leaving');
      calendarWipe.classList.add('entering');
      sessionStorage.setItem('jaou_calendar_wipe', '1');
      setTimeout(() => {
        window.location.href = calTrigger.getAttribute('href') || 'calendar.html';
      }, 460);
    }
  }
});

// -------------------------------------------------------------
// ARTISTS ACCORDION HOVER / CLICK INTERACTION
// -------------------------------------------------------------
const artistCards = document.querySelectorAll('.artist-accordion-card');
if (artistCards.length > 0) {
  artistCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      artistCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
    card.addEventListener('click', () => {
      artistCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// -------------------------------------------------------------
// INTERACTIVE GRAPHIC LENS REVEAL (Capture 2 Style)
// -------------------------------------------------------------
function initGraphicLensReveal() {
  const containers = document.querySelectorAll('.graphic-lens-container');
  containers.forEach(container => {
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--lens-x', `${x}px`);
      container.style.setProperty('--lens-y', `${y}px`);
      container.style.setProperty('--lens-opacity', '1');
    };

    const onLeave = () => {
      container.style.setProperty('--lens-opacity', '0');
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseenter', onMove);
    container.addEventListener('mouseleave', onLeave);

    container.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const rect = container.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        container.style.setProperty('--lens-x', `${x}px`);
        container.style.setProperty('--lens-y', `${y}px`);
        container.style.setProperty('--lens-opacity', '1');
      }
    }, { passive: true });

    container.addEventListener('touchend', () => {
      container.style.setProperty('--lens-opacity', '0');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGraphicLensReveal);
} else {
  initGraphicLensReveal();
}


