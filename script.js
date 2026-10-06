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

const menuListItems = document.querySelectorAll('.menu-list-item');
menuListItems.forEach(item => {
  const subLinks = item.querySelectorAll('.list-sub-options a');
  subLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOverlay.classList.remove('open');
      toggleMenuBtn.classList.remove('active');
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
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
}, scrollObserverOptions);

document.querySelectorAll('.reveal-on-scroll, .reveal-zoom').forEach(el => {
  scrollObserver.observe(el);
});

// -------------------------------------------------------------
// DYNAMIC EVENT FILTERING LOGIC (calendar.html)
// -------------------------------------------------------------
const filterBtns = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

if (filterBtns.length > 0 && eventCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
