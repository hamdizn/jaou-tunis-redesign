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

const logoHomeLinks = document.querySelectorAll('.nav-brand, .icon-link[aria-label="Home"]');
logoHomeLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menuOverlay) menuOverlay.classList.remove('open');
    if (toggleMenuBtn) toggleMenuBtn.classList.remove('active');
    if (header) header.classList.remove('header-menu-open');
  });
});

// Hero Image (5s) <-> Video Cycle
const heroImg = document.getElementById('heroImage');
const heroVideo = document.getElementById('heroVideo');
if (heroImg && heroVideo) {
  function startVideo() {
    heroVideo.classList.add('fade-in');
    heroImg.classList.add('fade-out');
    heroVideo.currentTime = 0;
    heroVideo.play().catch(() => {});
  }

  // Initial 5-second wait on photo before playing video
  setTimeout(startVideo, 5000);

  // When video ends: return to photo for 5s, then play video again
  heroVideo.addEventListener('ended', () => {
    heroVideo.classList.remove('fade-in');
    heroImg.classList.remove('fade-out');
    setTimeout(startVideo, 5000);
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

  // Accelerate molecules briefly when hovering menu items
  document.querySelectorAll('.menu-list-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      speedMultiplier = 2.5;
      setTimeout(() => { speedMultiplier = 1; }, 500);
    });
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

document.querySelectorAll('.reveal-on-scroll, .reveal-zoom, .reveal-slide-right, .video-frame, .reveal-form-card').forEach(el => {
  scrollObserver.observe(el);
});

// -------------------------------------------------------------
// DYNAMIC AGENDA FILTERING & CALENDAR HIGHLIGHTING (calendar.html)
// -------------------------------------------------------------
const agendaPills = document.querySelectorAll('.agenda-pill');
const dayBlocks = document.querySelectorAll('.agenda-day-block');
const festivalDayCells = document.querySelectorAll('.day-cell.is-festival');

const hexCategoryColors = {
  exhibition: '#E54D8A',
  concert: '#14AFA7',
  performance: '#DC2626',
  encounter: '#EAB308'
};

let activeCategory = 'all';
let selectedDateNum = null;

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
    const dateNum = block.getAttribute('id')?.replace('day-', '');
    const isDateMatch = selectedDateNum === null || dateNum === String(selectedDateNum);

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
      const dateNum = cell.getAttribute('data-date');
      if (selectedDateNum === Number(dateNum)) {
        selectedDateNum = null;
        festivalDayCells.forEach(c => c.classList.remove('selected-day'));
      } else {
        selectedDateNum = Number(dateNum);
        festivalDayCells.forEach(c => c.classList.remove('selected-day'));
        cell.classList.add('selected-day');
      }
      updateAgendaDisplay();
    });
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
