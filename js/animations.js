// GSAP scroll-triggered entrance animations for the portfolio.

gsap.registerPlugin(ScrollTrigger);

const revealSettings = {
  duration: 1,
  ease: 'power3.out',
  opacity: 0,
  y: 32,
  stagger: 0.15,
  scrollTrigger: {
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
};

function animateSite() {
  gsap.from('.hero-content h1', {
    duration: 1.4,
    y: 50,
    opacity: 0,
    ease: 'power4.out'
  });

  gsap.from('.hero-copy p', {
    duration: 1.2,
    y: 40,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
  });

  gsap.from('.hero-cta .btn', {
    duration: 1,
    y: 24,
    opacity: 0,
    stagger: 0.15,
    delay: 0.6,
    ease: 'power3.out'
  });

  gsap.from('.about-copy, .about-stats .stat-card', {
    ...revealSettings,
    stagger: 0.18,
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 80%'
    }
  });

  gsap.from('.profile-photo', {
    duration: 1,
    x: 60,
    opacity: 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 80%'
    }
  });

  gsap.from('.skill-card', {
    ...revealSettings,
    stagger: 0.14,
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 85%'
    }
  });

  gsap.from('.service-card', {
    ...revealSettings,
    stagger: 0.14,
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 85%'
    }
  });

  gsap.from('.project-card', {
    ...revealSettings,
    stagger: 0.18,
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 85%'
    }
  });

  gsap.from('.contact-block', {
    duration: 1,
    y: 45,
    opacity: 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 85%'
    }
  });
}

if (window.gsap && window.ScrollTrigger) {
  animateSite();
} else {
  window.addEventListener('load', animateSite);
}
