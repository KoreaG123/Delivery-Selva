/* ═══════════════════════════════════════════
   DELIVERY SELVA — app.js
   Lógica completa: catálogo, carrito,
   ubicación, WhatsApp, parallax
═══════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════
   CATÁLOGO DE PRODUCTOS
══════════════════════════════════════════ */
const CATALOG = [
  /* ── Menú del día ── */
  {
    id: 'guiso-pollo',
    cat: 'menu-hoy',
    name: 'Guiso de pollo',
    desc: 'Tierno guiso casero con papas y verduras de temporada',
    price: 10,
    img: 'img/guiso-de-pollo.jpg',
    emoji: '🍗',
    badge: 'popular'
  },
  {
    id: 'mechado-res',
    cat: 'menu-hoy',
    name: 'Mechado de res',
    desc: 'Carne de res deshebrada en salsa criolla',
    price: 12,
    img: 'img/mechado-de-res.jpg',
    emoji: '🥩'
  },
  {
    id: 'arroz-pollo',
    cat: 'menu-hoy',
    name: 'Arroz con pollo',
    desc: 'Arroz verde aromático con pollo jugoso',
    price: 11,
    img: 'img/arroz-con-pollo.jpg',
    emoji: '🍚',
    badge: 'rec'
  },
  {
    id: 'chicharron-chancho',
    cat: 'menu-hoy',
    name: 'Chicharrón de chancho',
    desc: 'Crujiente chicharrón con mote y salsa criolla',
    price: 12,
    img: 'img/chicharron-de-chancho.jpg',
    emoji: '🐷',
    badge: 'popular'
  },
  {
    id: 'pescado-frito',
    cat: 'menu-hoy',
    name: 'Pescado frito',
    desc: 'Pescado fresco frito con arroz y ensalada',
    price: 11,
    img: 'img/pescado-frito.jpg',
    emoji: '🐟'
  },
  {
    id: 'tallarines-rojos',
    cat: 'menu-hoy',
    name: 'Tallarines rojos',
    desc: 'Pasta en salsa de tomate con carne y queso',
    price: 9,
    img: 'img/tallarines-rojos.jpg',
    emoji: '🍝'
  },

  /* ── Platos de la Selva ── */
  {
    id: 'cecina',
    cat: 'selva',
    name: 'Cecina',
    desc: 'Carne de cerdo ahumada y condimentada, orgullo amazónico',
    price: 13,
    img: 'img/cecina.jpg',
    emoji: '🥓',
    badge: 'rec'
  },
  {
    id: 'tacacho-cecina',
    cat: 'selva',
    name: 'Tacacho con cecina',
    desc: 'Bolas de plátano verde asado con cecina ahumada',
    price: 14,
    img: 'img/tacacho-con-cecina.jpg',
    emoji: '🌿',
    badge: 'popular'
  },
  {
    id: 'juane',
    cat: 'selva',
    name: 'Juane',
    desc: 'Arroz con pollo envuelto en hoja de bijao. Clásico selvático',
    price: 12,
    img: 'img/juane.jpg',
    emoji: '🌱',
    badge: 'popular'
  },
  {
    id: 'patarashca',
    cat: 'selva',
    name: 'Patarashca',
    desc: 'Pescado de río cocinado en hoja de bijao con especias',
    price: 14,
    img: 'img/patarashca.jpg',
    emoji: '🐠'
  },

  /* ── Platos Marinos ── */
  {
    id: 'ceviche',
    cat: 'marinos',
    name: 'Ceviche',
    desc: 'Pescado fresco marinado en limón con cebolla y ají',
    price: 16,
    img: 'img/ceviche.jpg',
    emoji: '🍋',
    badge: 'popular'
  },
  {
    id: 'arroz-mariscos',
    cat: 'marinos',
    name: 'Arroz con mariscos',
    desc: 'Arroz cremoso con mix de mariscos y especias',
    price: 18,
    img: 'img/arroz-con-mariscos.jpg',
    emoji: '🦐',
    badge: 'rec'
  },
  {
    id: 'jalea-mixta',
    cat: 'marinos',
    name: 'Jalea mixta',
    desc: 'Mariscos y pescado apanados con yuca frita y salsa',
    price: 17,
    img: 'img/jalea-mixta.jpg',
    emoji: '🦑'
  },
  {
    id: 'chicharron-pescado',
    cat: 'marinos',
    name: 'Chicharrón de pescado',
    desc: 'Trozos de pescado fritos y crujientes con limón',
    price: 15,
    img: 'img/chicharron-de-pescado.jpg',
    emoji: '🐡'
  },

  /* ── Postres ── */
  {
    id: 'keke-vainilla',
    cat: 'postres',
    name: 'Keke de vainilla',
    desc: 'Bizcocho esponjoso con aroma natural de vainilla',
    price: 6,
    img: 'img/keke-de-vainilla.jpg',
    emoji: '🍰'
  },
  {
    id: 'torta-chocolate',
    cat: 'postres',
    name: 'Torta de chocolate',
    desc: 'Húmeda torta de chocolate con cobertura cremosa',
    price: 7,
    img: 'img/torta-de-chocolate.jpg',
    emoji: '🎂',
    badge: 'popular'
  },
  {
    id: 'keke-naranja',
    cat: 'postres',
    name: 'Keke de naranja',
    desc: 'Bizcocho cítrico y esponjoso con jugo de naranja natural',
    price: 6,
    img: 'img/keke-de-naranja.jpg',
    emoji: '🍊'
  },
  {
    id: 'gelatina',
    cat: 'postres',
    name: 'Gelatina',
    desc: 'Fresca gelatina de frutas, el postre favorito de todos',
    price: 4,
    img: 'img/gelatina.jpg',
    emoji: '🫙'
  },

  /* ── Bebidas ── */
  {
    id: 'jugo-papaya',
    cat: 'bebidas',
    name: 'Jugo de papaya',
    desc: 'Natural y dulce, papaya seleccionada del día',
    price: 5,
    img: 'img/jugo-de-papaya.jpg',
    emoji: '🍹'
  },
  {
    id: 'jugo-surtido',
    cat: 'bebidas',
    name: 'Jugo surtido',
    desc: 'Mix de frutas tropicales, refrescante y nutritivo',
    price: 5,
    img: 'img/jugo-surtido.jpg',
    emoji: '🥤',
    badge: 'rec'
  },
  {
    id: 'jugo-fresa-leche',
    cat: 'bebidas',
    name: 'Jugo de fresa con leche',
    desc: 'Batido cremoso de fresa con leche fresca',
    price: 6,
    img: 'img/jugo-de-fresa-con-leche.jpg',
    emoji: '🍓',
    badge: 'popular'
  },
  {
    id: 'chicha-morada',
    cat: 'bebidas',
    name: 'Chicha morada',
    desc: 'Bebida tradicional de maíz morado con canela y clavo',
    price: 4,
    img: 'img/chicha-morada.jpg',
    emoji: '🫐'
  }
];

/* ══════════════════════════════════════════
   ESTADO DEL CARRITO
══════════════════════════════════════════ */
let cart    = [];
let locData = null; // { lat, lng, link }

/* ══════════════════════════════════════════
   DOM REFS
══════════════════════════════════════════ */
const $  = id => document.getElementById(id);
const $q = s  => document.querySelector(s);

const header       = $q('.header');
const cartBtn      = $('cartBtn');
const cartClose    = $('cartClose');
const cartBackdrop = $('cartBackdrop');
const cartDrawer   = $('cartDrawer');
const cartCount    = $('cartCount');
const cartBody     = $('cartBody');
const cartFooter   = $('cartFooter');
const cartTotal    = $('cartTotalDisplay');
const fabCart      = $('fabCart');
const fabCount     = $('fabCount');
const fabTotal     = $('fabTotal');
const clearCartBtn = $('clearCartBtn');
const sendOrderBtn = $('sendOrderBtn');
const catsTrack    = $('catsTrack');
const toast        = $('toast');
const heroVideoWrap= $('heroVideoWrap');

/* ══════════════════════════════════════════
   RENDER PRODUCTS
══════════════════════════════════════════ */
function renderProducts() {
  const grids = {
    'menu-hoy': $('grid-menu-hoy'),
    'selva'   : $('grid-selva'),
    'marinos' : $('grid-marinos'),
    'postres' : $('grid-postres'),
    'bebidas' : $('grid-bebidas')
  };

  CATALOG.forEach(p => {
    const grid = grids[p.cat];
    if (!grid) return;

    const badgeHTML = p.badge
      ? `<span class="badge badge-${p.badge === 'popular' ? 'popular' : p.badge === 'rec' ? 'rec' : 'new'}">
           ${p.badge === 'popular' ? '🔥 Popular' : p.badge === 'rec' ? '⭐ Recomendado' : '✨ Nuevo'}
         </span>`
      : '';

    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-id', p.id);
    card.innerHTML = `
      <div class="card-img-wrap">
        <img
          src="${p.img}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none';this.parentNode.querySelector('.img-placeholder').style.display='flex'"
        />
        <div class="img-placeholder" style="display:none">${p.emoji}</div>
        ${badgeHTML}
      </div>
      <div class="card-body">
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-footer">
          <span class="card-price">S/ ${p.price.toFixed(2)}</span>
          <button class="add-btn" data-id="${p.id}" aria-label="Agregar ${p.name} al carrito">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Delegate add-to-cart clicks on the whole menu
  document.getElementById('menu').addEventListener('click', e => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    addToCart(btn.dataset.id, btn);
  });
}

/* ══════════════════════════════════════════
   CART LOGIC
══════════════════════════════════════════ */
function addToCart(id, btnEl) {
  const product = CATALOG.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  // Visual feedback on button
  if (btnEl) {
    btnEl.classList.add('added');
    btnEl.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      btnEl.classList.remove('added');
      btnEl.innerHTML = '<i class="fas fa-plus"></i>';
    }, 1000);
  }

  updateCartUI();
  showToast(`✅ ${product.name} agregado`, 'green');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function clearCart() {
  cart    = [];
  locData = null;

  // Reset GPS chip
  const chip   = $('locBtn');
  const icon   = $('locIcon');
  const txt    = $('locBtnText');
  const status = $('locStatus');
  if (chip)   { chip.classList.remove('loading','success'); }
  if (icon)   { icon.className = 'fas fa-satellite-dish'; }
  if (txt)    { txt.textContent = 'Agregar ubicación GPS exacta'; }
  if (status) { status.className = 'loc-status'; status.innerHTML = ''; }

  // Reset dirección
  if ($('clientAddress')) $('clientAddress').value = '';
  if ($('clientRef'))     $('clientRef').value     = '';

  updateCartUI();
  showToast('🗑️ Carrito vaciado');
}

function getTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getTotalItems() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const total = getTotal();
  const count = getTotalItems();

  // Header badge
  cartCount.textContent = count;
  cartCount.classList.add('bump');
  setTimeout(() => cartCount.classList.remove('bump'), 300);

  // FAB
  if (count > 0) {
    fabCart.style.display = 'flex';
    fabCount.textContent  = count;
    fabTotal.textContent  = `S/ ${total.toFixed(2)}`;
  } else {
    fabCart.style.display = 'none';
  }

  // Cart total
  cartTotal.textContent = `S/ ${total.toFixed(2)}`;

  // Show/hide footer
  cartFooter.style.display = cart.length ? 'block' : 'none';

  // Render items
  renderCartItems();
}

function renderCartItems() {
  const zone = $('cartItemsZone');
  if (!zone) return;

  if (cart.length === 0) {
    // Mostrar vacío en la zona de items
    zone.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛍️</div>
        <strong>Tu carrito está vacío</strong>
        <p>Agrega productos del menú para comenzar tu pedido.</p>
      </div>`;
    return;
  }

  zone.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img
        class="ci-img"
        src="${item.img}"
        alt="${item.name}"
        onerror="this.style.display='none'"
      />
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">S/ ${item.price.toFixed(2)} c/u</div>
        <div class="ci-subtotal">S/ ${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="ci-controls">
        <div class="qty-row">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
        <button class="remove-btn" data-action="remove" data-id="${item.id}">
          <i class="fas fa-trash-can"></i> Quitar
        </button>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   CART OPEN / CLOSE
══════════════════════════════════════════ */
function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════
   GEOLOCATION — lanza el GPS nativo del celular
   al instante. Mensajes claros y cortos.
══════════════════════════════════════════ */
function getLocation() {
  const chip   = $('locBtn');
  const icon   = $('locIcon');
  const txt    = $('locBtnText');
  const status = $('locStatus');

  if (!chip || !status) return;

  // Sin soporte
  if (!navigator.geolocation) {
    setLocStatus(status, 'warn', '⚠️ Tu navegador no soporta GPS. Escribe tu dirección arriba.');
    return;
  }

  // Estado: cargando — el navegador mostrará su propio popup de permiso
  chip.classList.add('loading');
  if (icon) icon.className = 'fas fa-spinner fa-spin';
  if (txt)  txt.textContent = 'Activando GPS…';
  status.className = 'loc-status'; status.textContent = '';

  // getCurrentPosition dispara el popup nativo del navegador/celular
  navigator.geolocation.getCurrentPosition(

    // ✅ ÉXITO
    function(pos) {
      const lat  = pos.coords.latitude;
      const lng  = pos.coords.longitude;
      const link = 'https://www.google.com/maps?q=' + lat + ',' + lng;
      locData    = { lat, lng, link };

      chip.classList.remove('loading');
      chip.classList.add('success');
      if (icon) icon.className = 'fas fa-circle-check';
      if (txt)  txt.textContent = 'GPS activo ✓';

      setLocStatus(status, 'ok',
        '📍 Ubicación obtenida — <a href="' + link + '" target="_blank">Ver en Maps</a>');
    },

    // ❌ ERROR
    function(err) {
      chip.classList.remove('loading', 'success');
      if (icon) icon.className = 'fas fa-satellite-dish';
      if (txt)  txt.textContent = 'Agregar ubicación GPS exacta';

      if (err.code === 1) {
        // Permiso denegado — mensaje claro con pasos
        setLocStatus(status, 'warn',
          '📵 Permiso bloqueado. Ve a Ajustes de tu celular → Apps → Navegador → Permisos → Activar Ubicación. O escribe tu dirección arriba.');
      } else if (err.code === 2) {
        setLocStatus(status, 'warn',
          '📡 GPS no disponible. Activa el GPS de tu celular e intenta de nuevo.');
      } else {
        setLocStatus(status, 'warn',
          '⏱ Tardó demasiado. Intenta de nuevo o escribe tu dirección arriba.');
      }
    },

    // Opciones: alta precisión, espera hasta 12s
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

function setLocStatus(el, type, html) {
  el.innerHTML  = html;
  el.className  = 'loc-status ' + type + ' visible';
}

/* ══════════════════════════════════════════
   SEND ORDER — WHATSAPP
══════════════════════════════════════════ */
function sendOrder() {
  const name    = $('clientName').value.trim();
  const phone   = $('clientPhone').value.trim();
  const address = $('clientAddress') ? $('clientAddress').value.trim() : '';
  const ref     = $('clientRef')     ? $('clientRef').value.trim()     : '';

  // Validar nombre
  if (!name) {
    $('clientName').focus();
    $('clientName').style.borderColor = 'var(--amber-dk)';
    setTimeout(() => { $('clientName').style.borderColor = ''; }, 2200);
    showToast('⚠️ Ingresa tu nombre para continuar');
    return;
  }

  // Validar que haya alguna forma de ubicación
  const hasGps     = !!locData;
  const hasAddress = address.length > 3;
  if (!hasGps && !hasAddress) {
    $('clientAddress').focus();
    $('clientAddress').style.borderColor = 'var(--amber-dk)';
    setTimeout(() => { $('clientAddress').style.borderColor = ''; }, 2200);
    showToast('📍 Indica tu dirección o activa el GPS');
    return;
  }

  if (cart.length === 0) {
    showToast('🛍️ El carrito está vacío');
    return;
  }

  const lines = cart.map(i =>
    `• ${i.qty}x ${i.name} — S/ ${(i.price * i.qty).toFixed(2)}`
  ).join('\n');

  const total = getTotal();

  let msg = `🌿 *PEDIDO — DELIVERY SELVA* 🌿\n\n`;
  msg += `👤 *Cliente:* ${name}\n`;
  if (phone)   msg += `📞 *Teléfono:* ${phone}\n`;
  msg += `\n🛒 *Productos:*\n${lines}\n\n`;
  msg += `💰 *Total: S/ ${total.toFixed(2)}*\n`;

  // Ubicación: GPS primero, luego dirección escrita
  msg += `\n📍 *Dirección de entrega:*\n`;
  if (hasAddress)  msg += `${address}\n`;
  if (ref)         msg += `Referencia: ${ref}\n`;
  if (hasGps)      msg += `GPS: ${locData.link}\n`;

  msg += `\n¡Gracias por tu pedido! 🙏`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/51920857471?text=${encoded}`, '_blank');
}

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
let toastTimeout;
function showToast(msg, type) {
  toast.textContent = msg;
  toast.className   = `toast${type ? ' ' + type : ''} show`;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

/* ══════════════════════════════════════════
   CATEGORY NAV PILLS — scroll spy
══════════════════════════════════════════ */
function initCatNav() {
  const pills = document.querySelectorAll('.cat-pill');
  const sections = {
    'menu-hoy': $('section-menu-hoy'),
    'selva'   : $('section-selva'),
    'marinos' : $('section-marinos'),
    'postres' : $('section-postres'),
    'bebidas' : $('section-bebidas')
  };

  // Click → scroll to section
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const id  = pill.dataset.cat;
      const sec = sections[id];
      if (!sec) return;
      const top = sec.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Scroll spy
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id   = entry.target.id.replace('section-', '');
        const pill = document.querySelector(`.cat-pill[data-cat="${id}"]`);
        if (pill) {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          // scroll pill into view inside horizontal track
          pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    });
  }, { rootMargin: '-120px 0px -50% 0px' });

  Object.values(sections).forEach(sec => {
    if (sec) observer.observe(sec);
  });
}

/* ══════════════════════════════════════════
   PARALLAX VIDEO
   - .hero-video-wrap mide 140% del hero
     (top:-20%, bottom:-20%) como margen.
   - Al hacer scroll lo movemos hacia arriba
     0.35x la velocidad => efecto parallax.
   - rAF garantiza 60fps sin jank.
══════════════════════════════════════════ */
function initParallax() {
  const wrap = document.getElementById('heroVideoWrap');
  const hero = document.querySelector('.hero');
  if (!wrap || !hero) return;

  // Respetar preferencia de movimiento reducido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking   = false;
  let lastShift = -1;

  function applyParallax() {
    const scrollY = window.scrollY;
    const heroH   = hero.offsetHeight;

    // Solo mientras el hero sea visible
    if (scrollY > heroH) { ticking = false; return; }

    // factor 0.35 => 35% de la velocidad de scroll
    // tope: 20% del heroH (= el margen extra del CSS)
    const shift = Math.min(scrollY * 0.35, heroH * 0.20);

    if (Math.abs(shift - lastShift) > 0.5) {
      wrap.style.transform = 'translate3d(0,' + shift + 'px,0)';
      lastShift = shift;
    }
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive: true });

  // Aplicar al cargar (por si hay scroll previo)
  applyParallax();
}

/* ══════════════════════════════════════════
   HEADER SCROLL SHADOW
══════════════════════════════════════════ */
function initHeaderScroll() {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ══════════════════════════════════════════
   CART EVENTS
══════════════════════════════════════════ */
function initCartEvents() {
  cartBtn.addEventListener('click', openCart);
  fabCart.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);

  // Usar document para capturar botones que están dentro del scroll
  document.addEventListener('click', e => {
    // Vaciar carrito
    if (e.target.closest('#clearCartBtn')) { clearCart(); return; }
    // Enviar pedido
    if (e.target.closest('#sendOrderBtn')) { sendOrder(); return; }
    // GPS chip
    if (e.target.closest('#locBtn')) { getLocation(); return; }

    // Qty & remove
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'inc')    changeQty(id, +1);
    if (btn.dataset.action === 'dec')    changeQty(id, -1);
    if (btn.dataset.action === 'remove') removeFromCart(id);
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  initCatNav();
  initParallax();
  initHeaderScroll();
  initCartEvents();
});
