// Lucid Hearts frontend interactions
document.addEventListener('DOMContentLoaded', () => {
  // Fill current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.style.display = expanded ? 'none' : 'block';
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 900) {
          primaryNav.style.display = 'none';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Games modal logic
  const modal = document.getElementById('gameModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const demoPlayBtn = modal.querySelector('.demo-play');

  const games = {
    1: {
      title: 'Moonlight Sonata',
      desc: 'A secret orchestra and a city of lost echoes. Choose who you trust, perform your heart, and discover endings shaped by your decisions.',
      features: ['Multiple romance routes', 'Original orchestral soundtrack', 'Choice-driven story with 6 endings'],
      demoUrl: '#demo1'
    },
    2: {
      title: 'Crimson Promises',
      desc: 'Unravel rooftop mysteries, navigate dangerous promises, and decide who you will let into your heart under neon skies.',
      features: ['Mysterious plot', 'Character-driven investigation', 'Animated CGs & music'],
      demoUrl: '#demo2'
    },
    3: {
      title: 'Stardust Letters',
      desc: 'Letters from the past cross paths with present feelings. Read, reply, and choose the life you want to live with your chosen partner.',
      features: ['Epistolary romance', 'Time-branching paths', 'Emotional endings'],
      demoUrl: '#demo3'
    }
  };

  // Handle game card clicks (use data-game-id on article elements)
  document.querySelectorAll('[data-game-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.gameId;
      openGameModal(id);
    });

    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openGameModal(card.dataset.gameId);
    });
  });

  function openGameModal(id) {
    const game = games[id];
    if (!game) return;

    modalTitle.textContent = game.title;
    modalDesc.textContent = game.desc;
    modalFeatures.innerHTML = '';
    game.features.forEach(f => {
      const item = document.createElement('div');
      item.className = 'small muted';
      item.textContent = '• ' + f;
      modalFeatures.appendChild(item);
    });

    demoPlayBtn.onclick = () => {
      alert(`Launching demo for: ${game.title}\n\n(Static demo placeholder)`);
    };

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close modal
  modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.email.value.trim();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    alert(`Thanks — ${email} subscribed to Lucid Hearts updates!`);
    newsletterForm.reset();
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@lucidhearts.games?subject=${subject}&body=${body}`;
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Accessibility: reset nav on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      primaryNav.style.display = 'block';
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      primaryNav.style.display = 'none';
    }
  });
});
