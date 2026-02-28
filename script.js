document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cr = document.getElementById('cur');
  const rg = document.getElementById('cur-r');

  if (cr && rg) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cr.style.left = mx + 'px';
      cr.style.top  = my + 'px';
    });

    // Ring follows with smooth lag
    (function loop() {
      rx += (mx - rx) * .11;
      ry += (my - ry) * .11;
      rg.style.left = rx + 'px';
      rg.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();

    // Cursor scale on interactive elements
    document.querySelectorAll('a, button, .cell, .tcard, .act, .ev, .cti, .feat, .pill').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cr.style.transform = 'translate(-50%,-50%) scale(2.5)';
        cr.style.background = 'var(--teal-d)';
        rg.style.borderColor = 'var(--teal)';
        rg.style.transform = 'translate(-50%,-50%) scale(1.4)';
      });
      el.addEventListener('mouseleave', () => {
        cr.style.transform = 'translate(-50%,-50%) scale(1)';
        cr.style.background = 'var(--teal)';
        rg.style.borderColor = 'var(--teal-p)';
        rg.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }

  /* ── MOBILE NAV TOGGLE ── */
  const tog = document.getElementById('navTog');
  const mob = document.getElementById('mobD');

  if (tog && mob) {
    tog.addEventListener('click', () => {
      const open = mob.style.display === 'block';
      mob.style.display = open ? 'none' : 'block';
    });
  }

  /* ── STICKY NAVBAR ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 16,
          behavior: 'smooth'
        });
      }
      // Close mobile menu after click
      if (mob) mob.style.display = 'none';
    });
  });

  /* ── SCROLL REVEAL (.rv elements) ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');

        // Animate progress bars inside revealed elements
        entry.target.querySelectorAll('.cell-bar-fill').forEach(bar => {
          const w = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => bar.style.width = w, 200);
        });
      }
    });
  }, { threshold: .1 });

  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  /* ── STAGGERED ACTIVITY CARDS ── */
  const aio = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = +entry.target.dataset.d || 0;
        setTimeout(() => entry.target.classList.add('in'), delay);
      }
    });
  }, { threshold: .1 });

  document.querySelectorAll('.act').forEach(el => aio.observe(el));

  /* ── ANIMATED COUNTERS ── */
  const cio = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.t;
        let count = 0;
        const step = target / 45;

        (function go() {
          count = Math.min(count + step, target);
          el.textContent = Math.floor(count);
          if (count < target) requestAnimationFrame(go);
        })();

        cio.unobserve(el);
      }
    });
  }, { threshold: .5 });

  document.querySelectorAll('.cnt').forEach(el => cio.observe(el));

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.n-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  /* ── CONTACT FORM SUBMIT ── */
  document.getElementById('cForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.textContent = '✅ Candidature envoyée avec succès !';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.textContent = '', 400);
    }, 3500);
    e.target.reset();
  });

  /* ── HEADING HOVER GLOW ── */
  document.querySelectorAll('.shead').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.filter = 'drop-shadow(0 2px 12px rgba(42,128,128,0.25))';
    });
    el.addEventListener('mouseleave', () => {
      el.style.filter = '';
    });
  });

});