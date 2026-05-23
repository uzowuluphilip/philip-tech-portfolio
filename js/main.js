// Core page interaction logic for the portfolio site.

const typewriterLines = [
  'Full Stack Developer',
  '19. Building the web.',
  'React · Node.js · PHP'
];
const typewriterElement = document.getElementById('typewriter');
const HEADER_ACTIVE_CLASS = 'scrolled';
const header = document.querySelector('.site-header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
let currentLine = 0;
let currentLetter = 0;
let isDeleting = false;

function updateHeaderState() {
  if (window.scrollY > 24) {
    header.classList.add(HEADER_ACTIVE_CLASS);
  } else {
    header.classList.remove(HEADER_ACTIVE_CLASS);
  }
}

function toggleMenu() {
  const isActive = hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
}

function closeMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

function typewriterLoop() {
  const line = typewriterLines[currentLine];
  const delta = isDeleting ? 30 : 90;

  if (!isDeleting) {
    if (typewriterElement) typewriterElement.textContent = line.slice(0, currentLetter + 1);
    currentLetter++;
    if (currentLetter === line.length) {
      isDeleting = true;
      setTimeout(typewriterLoop, 1300);
      return;
    }
  } else {
    if (typewriterElement) typewriterElement.textContent = line.slice(0, currentLetter - 1);
    currentLetter--;
    if (currentLetter === 0) {
      isDeleting = false;
      currentLine = (currentLine + 1) % typewriterLines.length;
    }
  }

  setTimeout(typewriterLoop, delta);
}

function activateFeatherIcons() {
  if (window.feather) {
    window.feather.replace();
  }
}

/* Canvas-based floating particles for hero */
function initCanvasParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = canvas.clientWidth || window.innerWidth;
    canvas.height = canvas.clientHeight || window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(40, Math.max(30, Math.floor(window.innerWidth / 30)));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: - (Math.random() * 0.5 + 0.1),
        a: 0.25 + Math.random() * 0.15
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.x < -10) p.x = canvas.width + 10;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}

/* Map brand colors to skill cards and prepare level bars */
function prepareSkills() {
  document.querySelectorAll('.skill-card').forEach(card => {
    const brand = card.getAttribute('data-brand');
    if (brand) card.style.setProperty('--brand', brand);
    const fill = card.querySelector('.skill-level-fill');
    if (fill && brand) fill.style.background = brand;
  });
}

function initServiceCardToggles() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => { card.classList.toggle('expanded'); });
  });
}

function initEmailForm() {
  if (!window.emailjs) return;
  try { emailjs.init("h07vbcF_sdRjXDIaR"); } catch(e) { /* no-op for placeholder */ }
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    if (!window.emailjs) {
      status.textContent = 'Email service not loaded in this environment.';
      status.style.color = '#ef4444';
      btn.textContent = 'Send Message';
      btn.disabled = false;
      return;
    }

    emailjs.sendForm('philip_portfolio_service', 'template_rr76npn', this)
      .then(() => {
        status.textContent = 'Message sent! I will get back to you soon.';
        status.style.color = '#22c55e';
        btn.textContent = 'Send Message';
        btn.disabled = false;
        form.reset();
      }).catch(() => {
        status.textContent = 'Something went wrong. Try WhatsApp instead.';
        status.style.color = '#ef4444';
        btn.textContent = 'Send Message';
        btn.disabled = false;
      });
  });
}

function setupProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalLabel = document.getElementById('modal-label');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalDetail = document.getElementById('modal-detail');
  const modalLink = document.getElementById('modal-link');

  if (!modal || !modalOverlay || !modalClose) return;

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') && !e.target.closest('a').classList.contains('modal-live-btn')) {
        return;
      }
      modalImg.src = card.dataset.img || '';
      modalImg.alt = card.dataset.title || '';
      modalLabel.textContent = card.dataset.label || '';
      modalTitle.textContent = card.dataset.title || '';
      modalDesc.textContent = card.dataset.desc || '';
      modalTags.textContent = card.dataset.tags || '';
      modalDetail.textContent = card.dataset.detail || '';
      modalLink.href = card.dataset.link || '#';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  modalOverlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function initGSAPAnimations() {
  if (!(window.gsap && window.ScrollTrigger)) return;
  gsap.registerPlugin(ScrollTrigger);

  // Section headings
  document.querySelectorAll('section').forEach(section => {
    const heading = section.querySelector('h2, h1, .section-label');
    if (heading) {
      gsap.from(heading, { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 80%' } });
    }

    const cards = section.querySelectorAll('.skill-card, .service-card, .project-card, .stat-card');
    if (cards.length) {
      gsap.from(cards, { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 80%' } });
    }
  });

  const profile = document.querySelector('.profile-photo');
  if (profile) gsap.from(profile, { x: 60, opacity: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: profile, start: 'top 80%' } });

  // Skill bars animate width
  document.querySelectorAll('.skill-level-fill').forEach(el => {
    const lvl = el.dataset.level || '75';
    gsap.fromTo(el, { width: '0%' }, { width: lvl + '%', duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%' } });
  });
}

function initInteractions() {
  updateHeaderState();
  typewriterLoop();
  activateFeatherIcons();
  initCanvasParticles();
  prepareSkills();
  initServiceCardToggles();
  initEmailForm();
  setupProjectModal();
  initGSAPAnimations();

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  if (navLinks) navLinks.querySelectorAll('a').forEach(link => { link.addEventListener('click', closeMenu); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractions);
} else {
  initInteractions();
}
