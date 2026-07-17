// ════════════════════════════════════════
// js/pedidos.js
// Lógica del formulario de pedidos:
// - Muestra el acordeón correcto según la categoría
// - Habilita el botón cuando el formulario está completo
// - Arma el mensaje y abre WhatsApp
// ════════════════════════════════════════

(function () {

  const WA_NUMERO = '5492613039166';

  // ── Referencias
  const categoria   = document.getElementById('categoria');
  const opcionesWrap = document.getElementById('opcionesWrap');
  const btnEnviar   = document.getElementById('btnEnviar');
  const nombre      = document.getElementById('nombre');
  const telefono    = document.getElementById('telefono');
  const fecha       = document.getElementById('fecha');
  const hora        = document.getElementById('hora');
  const direccion   = document.getElementById('direccion');
  const detalle     = document.getElementById('detalle');

  // Todos los acordeones de producto
  const acordeones = {
    'desayunos':       document.getElementById('acc-desayunos'),
    'picadas':         document.getElementById('acc-picadas'),
    'regalos':  document.getElementById('acc-regalos'),
    'caja-up':         null, // no tiene opciones de producto
  };

  // ── Al cambiar la categoría
  categoria.addEventListener('change', () => {
    const val = categoria.value;

    // Limpiar radio buttons seleccionados
    document.querySelectorAll('input[name="producto"]')
      .forEach(r => r.checked = false);

    // Ocultar todos los acordeones
    Object.values(acordeones).forEach(acc => {
      if (acc) acc.style.display = 'none';
    });

    if (val === 'caja-up') {
      // Caja Up no necesita elegir producto
      opcionesWrap.style.display = 'none';
    } else {
      opcionesWrap.style.display = 'block';
      if (acordeones[val]) {
        acordeones[val].style.display = 'block';
      }
    }

    verificarFormulario();
  });

  // ── Verificar si el formulario está completo para habilitar el botón
  function verificarFormulario() {
    const cat = categoria.value;
    const productoSeleccionado = document.querySelector('input[name="producto"]:checked');
    const camposBasicos = nombre.value.trim() && fecha.value && hora.value && direccion.value.trim();

    let listo = false;

    if (cat === 'caja-up') {
      listo = !!camposBasicos;
    } else {
      listo = !!(camposBasicos && cat && productoSeleccionado);
    }

    btnEnviar.disabled = !listo;
    btnEnviar.classList.toggle('activo', listo);
  }

  // ── Escuchar cambios en todos los campos
  [nombre, fecha, hora, direccion].forEach(el => {
    el.addEventListener('input', verificarFormulario);
  });

  document.querySelectorAll('input[name="producto"]').forEach(r => {
    r.addEventListener('change', verificarFormulario);
  });

  // ── Al hacer click en "Enviar pedido"
  btnEnviar.addEventListener('click', () => {
    const cat = categoria.value;
    const productoEl = document.querySelector('input[name="producto"]:checked');
    const producto = productoEl ? productoEl.value : 'Caja Up';

    // Formatear fecha legible
    const fechaObj = new Date(fecha.value + 'T00:00:00');
    const fechaStr = fechaObj.toLocaleDateString('es-AR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Armar mensaje
    let msg = `¡Hola Dulces & Recuerdos! 🎉 Quiero hacer un pedido:\n\n`;
    msg += `👤 *Nombre:* ${nombre.value.trim()}\n`;
    if (telefono.value.trim()) msg += `📱 *Teléfono:* ${telefono.value.trim()}\n`;
    msg += `📦 *Producto:* ${producto}\n`;
    msg += `📅 *Fecha de entrega:* ${fechaStr}\n`;
    msg += `🕐 *Hora:* ${hora.value} hs\n`;
    msg += `📍 *Dirección:* ${direccion.value.trim()}\n`;
    if (detalle.value.trim()) {
      msg += `\n✏️ *Detalle especial:*\n${detalle.value.trim()}\n`;
    }
    msg += `\n¡Gracias! 😊`;

    // Abrir WhatsApp
    const url = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    // Redirigir al inicio después de 3 segundos
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 3000);
  });

})();
