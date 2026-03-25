/* ============================================
   DELIVERY SELVA — app.js
   Carrito con localStorage + WhatsApp checkout
   + Geolocalización GPS
   ============================================ */

// ─── ESTADO GLOBAL ──────────────────────────
let cart = JSON.parse(localStorage.getItem('deliverySelvaCart') || '[]');
let userLocation = null; // { lat, lng } si el usuario acepta

// ─── INIT ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartCount();
  initCategoryTabs();
  requestLocation();
});

// ─── GEOLOCALIZACIÓN ─────────────────────────
/**
 * Solicita la ubicación del usuario de forma silenciosa.
 * Si acepta, guarda lat/lng para incluirlo en el pedido.
 */
function requestLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLocation = {
        lat: pos.coords.latitude.toFixed(6),
        lng: pos.coords.longitude.toFixed(6),
      };
      console.log('📍 Ubicación obtenida:', userLocation);
    },
    (err) => {
      console.warn('📍 Ubicación no disponible:', err.message);
    },
    { timeout: 10000, maximumAge: 60000 }
  );
}

// ─── CARRITO: AGREGAR ────────────────────────
/**
 * Lee los atributos data-* del card padre del botón pulsado
 * y agrega el producto al carrito (o aumenta cantidad).
 */
function addToCart(btn) {
  const card  = btn.closest('.product-card');
  const id    = card.dataset.id;
  const name  = card.dataset.name;
  const price = parseFloat(card.dataset.price);
  const emoji = card.dataset.emoji;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, emoji, qty: 1 });
  }

  saveCart();
  renderCart();
  updateCartCount();
  showToast(`${emoji} ${name} agregado`);

  // Micro-animación en el botón
  btn.classList.add('added');
  setTimeout(() => btn.classList.remove('added'), 400);
}

// ─── CARRITO: CAMBIAR CANTIDAD ───────────────
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  renderCart();
  updateCartCount();
}

// ─── CARRITO: ELIMINAR ITEM ──────────────────
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}

// ─── CARRITO: PERSISTENCIA ───────────────────
function saveCart() {
  localStorage.setItem('deliverySelvaCart', JSON.stringify(cart));
}

// ─── CARRITO: RENDER ─────────────────────────
function renderCart() {
  const itemsEl  = document.getElementById('cartItems');
  const emptyEl  = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  const totalEl  = document.getElementById('cartTotal');

  if (cart.length === 0) {
    emptyEl.style.display  = 'flex';
    footerEl.style.display = 'none';
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    return;
  }

  // Ocultar estado vacío, mostrar footer
  emptyEl.style.display  = 'none';
  footerEl.style.display = 'block';

  // Calcular total
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  totalEl.textContent = `S/ ${total.toFixed(2)}`;

  // Renderizar items
  itemsEl.innerHTML = '';

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">S/ ${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1)" aria-label="Quitar uno">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1)" aria-label="Agregar uno">+</button>
      </div>
    `;
    itemsEl.appendChild(el);
  });

  // Mostrar información de ubicación debajo del botón checkout
  let locEl = document.getElementById('locationInfo');
  if (!locEl) {
    locEl = document.createElement('div');
    locEl.id = 'locationInfo';
    locEl.className = 'location-info';
    footerEl.appendChild(locEl);
  }

  if (userLocation) {
    locEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> Tu ubicación será enviada con el pedido`;
  } else {
    locEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> Activa tu GPS para enviar tu ubicación`;
  }
}

// ─── CARRITO: CONTADOR ───────────────────────
function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const el    = document.getElementById('cartCount');

  el.textContent = count;
  el.classList.toggle('hidden', count === 0);
}

// ─── ABRIR / CERRAR CARRITO ──────────────────
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cartBtn').addEventListener('click', openCart);

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCart();
});

// ─── CHECKOUT POR WHATSAPP ───────────────────
/**
 * Construye el mensaje de WhatsApp con:
 *  - Lista de productos con cantidades y subtotales
 *  - Total del pedido
 *  - Link de Google Maps si hay ubicación disponible
 */
function checkout() {
  if (cart.length === 0) {
    showToast('⚠️ Tu carrito está vacío');
    return;
  }

  const phoneNumber = '51920857471'; // Número con código de país Perú
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Líneas de cada producto
  const items = cart
    .map(i => `${i.emoji} ${i.name} x${i.qty} = S/ ${(i.price * i.qty).toFixed(2)}`)
    .join('\n');

  // Link de ubicación
  let locationText = '📍 Ubicación: No compartida';
  if (userLocation) {
    const mapsUrl = `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
    locationText  = `📍 Mi ubicación: ${mapsUrl}`;
  }

  // Mensaje completo
  const message = [
    '🌿 *PEDIDO - DELIVERY SELVA* 🌿',
    '━━━━━━━━━━━━━━━━━━━━━',
    items,
    '━━━━━━━━━━━━━━━━━━━━━',
    `💰 *TOTAL: S/ ${total.toFixed(2)}*`,
    '',
    locationText,
    '',
    '⏰ Por favor confirmar mi pedido. ¡Gracias! 😊',
  ].join('\n');

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Si el usuario aún no dio ubicación, pedirla antes de abrir WhatsApp
  if (!userLocation && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userLocation = {
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
        };
        // Reintentar ahora que tenemos la ubicación
        checkout();
      },
      () => {
        // El usuario rechazó o falló — abrir WhatsApp sin ubicación
        window.open(url, '_blank');
      },
      { timeout: 5000 }
    );
    return;
  }

  window.open(url, '_blank');
}

// ─── TABS DE CATEGORÍAS ──────────────────────
/**
 * Maneja el desplazamiento suave entre secciones
 * y marca el tab activo al hacer scroll.
 */
function initCategoryTabs() {
  const buttons  = document.querySelectorAll('.cat-btn');
  const sections = document.querySelectorAll('.product-section');

  // Click en tab → scroll a la sección
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.cat);
      if (!target) return;

      const offset = 64 + 52; // header + cat-bar heights
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      setActiveTab(btn);
    });
  });

  // IntersectionObserver → actualiza tab activo al hacer scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeBtn = document.querySelector(`.cat-btn[data-cat="${entry.target.id}"]`);
          if (activeBtn) setActiveTab(activeBtn);
        }
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px', // activa cuando la sección está a la mitad de la pantalla
      threshold: 0,
    }
  );

  sections.forEach(section => observer.observe(section));
}

function setActiveTab(activeBtn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');

  // Desplazar el tab activo al centro de la barra horizontal
  activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// ─── TOAST NOTIFICATIONS ─────────────────────
let toastTimeout;

function showToast(msg) {
  let toast = document.getElementById('toastEl');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastEl';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ─── SCROLL: HEADER SHADOW ───────────────────
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 2px 30px rgba(0,0,0,.4)';
  } else {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,.25)';
  }
}, { passive: true });
