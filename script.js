// Lucid Hearts frontend interactions
document.addEventListener('DOMContentLoaded', () => {
  // Fill year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.style.display = expanded ? 'none' : 'block';
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav if open
        if (window.innerWidth <= 900) {
          primaryNav.style.display = 'none';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Modal logic for games
  const modal = document.getElementById('gameModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const demoPlayBtn = document.querySelector('.demo-play');

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

  // Open modal on view buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      openGameModal(id);
    });
  });

  // Also allow keyboard "Enter" on card
  document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        openGameModal(card.dataset.gameId);
      }
    });
  });

  // Demo play buttons (front-end demo)
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      // For this static site we show a tiny inline demo alert.
      alert(`Launching demo for: ${games[id].title}\n\n(Static demo: imagine a short playable scene here.)`);
    });
  });

  // Modal helper
  function openGameModal(id){
    const game = games[id];
    if (!game) return;
    modalTitle.textContent = game.title;
    modalDesc.textContent = game.desc;
    modalFeatures.innerHTML = '';
    game.features.forEach(f => {
      const el = document.createElement('div');
      el.className = 'small muted';
      el.textContent = '• ' + f;
      modalFeatures.appendChild(el);
    });
    demoPlayBtn.onclick = () => {
      alert(`Demo: ${game.title} — (static demo).`);
    };
    modal.setAttribute('aria-hidden','false');
    // trap focus minimally
    document.body.style.overflow = 'hidden';
  }

  // Close modal actions
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  // Newsletter form (front-end)
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.email.value.trim();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Pretend subscription succeeded
    alert(`Thanks — ${email} subscribed to Lucid Hearts updates!`);
    newsletterForm.reset();
  });

  // Contact form (mail client fallback)
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Construct mailto (front-end fallback)
    const subject = encodeURIComponent(`Contact from site: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@lucidhearts.games?subject=${subject}&body=${body}`;
  });

  // Simple email regex
  function validateEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) }

  // Accessibility: collapse nav when resizing up
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) primaryNav.style.display = 'block';
    if (window.innerWidth <= 900) primaryNav.style.display = 'none';
  });

});
