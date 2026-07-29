// ════════════════════════════════════════
// js/detalle.js
// Sincroniza el modal de zoom con el slide
// activo del carrusel principal al abrirse
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // Para cada modal de zoom en la página
  document.querySelectorAll('.modal-zoom').forEach(modal => {
    modal.addEventListener('show.bs.modal', () => {

      // ID del modal → ID del carrusel principal
      // ej: "modal-box-sorpresa" → "carousel-box-sorpresa"
      const modalId   = modal.getAttribute('id');
      const carouselId = modalId.replace('modal-', 'carousel-');
      const modalCarouselId = modalId + '-c';

      const carouselEl      = document.getElementById(carouselId);
      const modalCarouselEl = document.getElementById(modalCarouselId);

      if (!carouselEl || !modalCarouselEl) return;

      // Obtener el índice del slide activo en el carrusel principal
      const activeItem = carouselEl.querySelector('.carousel-item.active');
      const items      = Array.from(carouselEl.querySelectorAll('.carousel-item'));
      const activeIndex = items.indexOf(activeItem);

      // Mover el carrusel del modal al mismo índice
      const modalCarousel = bootstrap.Carousel.getOrCreateInstance(modalCarouselEl);
      modalCarousel.to(activeIndex);
    });
  });

  // ── Resaltar miniatura activa al cambiar slide
  document.querySelectorAll('.producto-detalle__carousel').forEach(carouselWrap => {
    const carouselEl = carouselWrap.querySelector('.carousel');
    if (!carouselEl) return;

    carouselEl.addEventListener('slid.bs.carousel', (e) => {
      const carouselId = carouselEl.getAttribute('id');
      const thumbs = document.querySelectorAll(
        `.producto-detalle__thumb[data-bs-target="#${carouselId}"]`
      );
      thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('is-active', i === e.to);
      });
    });
  });

});
