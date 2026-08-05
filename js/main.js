// ════════════════════════════════════════
// js/main.js
// ════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll
  const navbar = document.querySelector('.navbar');
  const onScroll = () => navbar?.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ── Hamburguesa
  const toggle     = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  const overlay    = document.querySelector('.navbar__overlay');

  const cerrar = () => {
    toggle?.classList.remove('is-active');
    mobileMenu?.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  const abrir = () => {
    toggle?.classList.add('is-active');
    mobileMenu?.classList.add('is-open');
    overlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  };

  toggle?.addEventListener('click', () =>
    mobileMenu?.classList.contains('is-open') ? cerrar() : abrir()
  );
  overlay?.addEventListener('click', cerrar);
  document.querySelectorAll('.navbar__mobile-link')
    .forEach(l => l.addEventListener('click', cerrar));

  // ── Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Navbar active: marca el link de la página actual
  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === paginaActual) {
      link.classList.add('navbar__link--active');
    }
  });

});
