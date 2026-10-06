'use client';

import { useEffect, useRef } from 'react';

export default function MoleculeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -1000, y: -1000, isOver: false };
    let animationFrameId;

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
      // Brand palette: Jaou Teal (#14AFA7), Jaou Black (#000000), Deep Teal (#0D9488), Muted Slate (#475569), Ochre Gold (#B45309)
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

      // Draw connecting lines between particles
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

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

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

      animationFrameId = requestAnimationFrame(drawMolecules);
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isOver = true;
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    drawMolecules();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="moleculeCanvas" className="menu-bg-canvas" />;
}
