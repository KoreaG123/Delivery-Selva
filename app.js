/* ============================================
   DELIVERY SELVA — app.js
   - Carrito con localStorage
   - Controles inline en cada card (− N +)
   - Borrar item individual ✕
   - Vaciar todo el pedido
   - WhatsApp checkout con geolocalización
   ============================================ */

// ─── CATÁLOGO ────────────────────────────────
// Datos de todos los productos para poder referenciarlos por id
const CATALOG = {
  '1':  { name: 'Guiso de Pollo',          price: 10, emoji: '🍛' },
  '2':  { name: 'Mechado de Res',           price: 12, emoji: '🥩' },
  '3':  { name: 'Arroz con Pollo',          price: 11, emoji: '🍚' },
  '4':  { name: 'Chicharrón de Chancho',    price: 13, emoji: '🥓' },
  '5':  { name: 'Pescado Frito',            price: 12, emoji: '🐟' },
  '6':  { name: 'Tallarines Rojos',         price: 10, emoji: '🍝' },
  '7':  { name: 'Cecina',                   price: 15, emoji: '🥩' },
  '8':  { name: 'Tacacho con Cecina',       price: 18, emoji: '🍌' },
  '9':  { name: 'Juane',                    price: 16, emoji: '🍃' },
  '10': { name: 'Patarashca',               price: 20, emoji: '🐟' },
  '11': { name: 'Ceviche',                  price: 18, emoji: '🍋' },
  '12': { name: 'Arroz con Mariscos',       price: 22, emoji: '🦐' },
  '13': { name: 'Jalea Mixta',              price: 25, emoji: '🐙' },
  '14': { name: 'Chicharrón de Pescado',    price: 16, emoji: '🐠' },
  '15': { name: 'Keke de Vainilla',         price:  6, emoji: '🍰' },
  '16': { name: 'Torta de Chocolate',       price:  8, emoji: '🎂' },
  '17': { name: 'Keke de Naranja',          price:  6, emoji: '🍊' },
  '18': { name: 'Gelatina',                 price:  4, emoji: '🍮' },
  '19': { name: 'Jugo de Papaya',           price:  5, emoji: '🥭' },
  '20': { name: 'Jugo Surtido',             price:  5, emoji: '🍹' },
  '21': { name: 'Jugo de Fresa con Leche',  price:  6, emoji: '🍓' },
  '22': { name: 'Chicha Morada',            price:  5, emoji: '🫐' },
};

// ─── ESTADO ──────────────────────────────────
let cart = loadCartFromStorage();
let userLocation = null;

// ─── INIT ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCartSidebar();
  updateCartBadge();
  restoreAllCardControls();
  initCategoryTabs();
  requestLocation();
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
});

// ─── LOCALSTORE ──────────────────────────────
function loadCartFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('ds_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCartToStorage() {
  localStorage.setItem('ds_cart', JSON.stringify(cart));
}

// ─── AGREGAR AL CARRITO ──────────────────────
function addToCart(id) {
  id = String(id);
  const product = CATALOG[id];
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCartToStorage();
  renderCartSidebar();
  updateCartBadge();
  updateCardControl(id);
  showToast(`${product.emoji} ${product.name} agregado`);
}

// ─── CAMBIAR CANTIDAD (desde card o sidebar) ──
function changeQty(id, delta) {
  id = String(id);
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    // Eliminar del carrito
    cart = cart.filter(i => i.id !== id);
  }

  saveCartToStorage();
  renderCartSidebar();
  updateCartBadge();
  updateCardControl(id);
}

// ─── ELIMINAR UN ITEM COMPLETO ────────────────
function removeItem(id) {
  id = String(id);
  cart = cart.filter(i => i.id !== id);
  saveCartToStorage();
  renderCartSidebar();
  updateCartBadge();
  updateCardControl(id);
  const product = CATALOG[id];
  if (product) showToast(`${product.emoji} ${product.name} eliminado`);
}

// ─── VACIAR TODO ──────────────────────────────
function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  saveCartToStorage();
  renderCartSidebar();
  updateCartBadge();
  // Restaurar todos los botones + en las cards
  Object.keys(CATALOG).forEach(id => updateCardControl(id));
  showToast('🗑️ Pedido vaciado');
}

// ─── CONTROL INLINE EN CARD ──────────────────
/**
 * Actualiza el div#ctrl-{id} de la card correspondiente.
 * Si qty > 0 muestra − N +, si qty === 0 muestra botón +.
 */
function updateCardControl(id) {
  id = String(id);
  const container = document.getElementById(`ctrl-${id}`);
  if (!container) return;

  const item = cart.find(i => i.id === id);
  const qty  = item ? item.qty : 0;

  if (qty === 0) {
    container.innerHTML = `<button class="add-btn" onclick="addToCart('${id}')"><i class="fas fa-plus"></i></button>`;
  } else {
    container.innerHTML = `
      <div class="qty-ctrl">
        <button class="qc-btn" onclick="changeQty('${id}', -1)">−</button>
        <span class="qc-num">${qty}</span>
        <button class="qc-btn" onclick="changeQty('${id}', 1)">+</button>
      </div>`;
  }
}

// Al cargar página, restaura controles de items que ya estaban en localStorage
function restoreAllCardControls() {
  cart.forEach(item => updateCardControl(item.id));
}

// ─── RENDER SIDEBAR ───────────────────────────
function renderCartSidebar() {
  const itemsEl  = document.getElementById('cartItems');
  const emptyEl  = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  const totalEl  = document.getElementById('cartTotal');

  if (cart.length === 0) {
    // Mostrar estado vacío
    itemsEl.innerHTML = '';
    emptyEl.style.display = 'flex';
    itemsEl.appendChild(emptyEl);
    footerEl.style.display = 'none';
    return;
  }

  // Calcular total
  const total = cart.reduce((sum, i) => {
    const p = CATALOG[i.id];
    return sum + (p ? p.price * i.qty : 0);
  }, 0);

  totalEl.textContent = `S/ ${total.toFixed(2)}`;
  emptyEl.style.display  = 'none';
  footerEl.style.display = 'flex';

  // Render items
  itemsEl.innerHTML = '';

  cart.forEach(item => {
    const p = CATALOG[item.id];
    if (!p) return;

    const subtotal = (p.price * item.qty).toFixed(2);
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-emoji">${p.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">S/ ${subtotal}</div>
      </div>
      <div class="cart-item-controls">
        <button class="s-qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
        <span class="s-qty-num">${item.qty}</span>
        <button class="s-qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        <button class="delete-item-btn" onclick="removeItem('${item.id}')" title="Eliminar">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
    itemsEl.appendChild(el);
  });
}

// ─── BADGE DEL CARRITO ────────────────────────
function updateCartBadge() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById('cartCount');
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

// ─── ABRIR / CERRAR SIDEBAR ──────────────────
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

// ─── GEOLOCALIZACIÓN ─────────────────────────
function requestLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    pos => {
      userLocation = {
        lat: pos.coords.latitude.toFixed(6),
        lng: pos.coords.longitude.toFixed(6),
      };
    },
    err => console.warn('GPS no disponible:', err.message),
    { timeout: 10000, maximumAge: 60000 }
  );
}

// ─── CHECKOUT POR WHATSAPP ───────────────────
function checkout() {
  if (cart.length === 0) {
    showToast('⚠️ Tu carrito está vacío');
    return;
  }

  const buildAndOpen = () => {
    const phone = '51920857471';
    const total = cart.reduce((sum, i) => {
      const p = CATALOG[i.id];
      return sum + (p ? p.price * i.qty : 0);
    }, 0);

    const lines = cart.map(i => {
      const p = CATALOG[i.id];
      return p ? `${p.emoji} ${p.name} x${i.qty} = S/ ${(p.price * i.qty).toFixed(2)}` : '';
    }).filter(Boolean).join('\n');

    let locText = '📍 Ubicación: No compartida';
    if (userLocation) {
      locText = `📍 Ubicación: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
    }

    const msg = [
      '🌿 *PEDIDO - DELIVERY SELVA* 🌿',
      '━━━━━━━━━━━━━━━━━━━━━',
      lines,
      '━━━━━━━━━━━━━━━━━━━━━',
      `💰 *TOTAL: S/ ${total.toFixed(2)}*`,
      '',
      locText,
      '',
      '⏰ Por favor confirmar mi pedido. ¡Gracias! 😊',
    ].join('\n');

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Si no tenemos GPS, intentar una vez más antes de abrir
  if (!userLocation && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        userLocation = { lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) };
        buildAndOpen();
      },
      () => buildAndOpen(),
      { timeout: 4000 }
    );
  } else {
    buildAndOpen();
  }
}

// ─── TABS DE CATEGORÍAS ──────────────────────
function initCategoryTabs() {
  const buttons  = document.querySelectorAll('.cat-btn');
  const sections = document.querySelectorAll('.product-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.cat);
      if (!target) return;
      const offset = 64 + 52;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveTab(btn);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const btn = document.querySelector(`.cat-btn[data-cat="${entry.target.id}"]`);
        if (btn) setActiveTab(btn);
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

function setActiveTab(activeBtn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');
  activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// ─── TOAST ───────────────────────────────────
let toastTimer;
function showToast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ─── SCROLL HEADER SHADOW ────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('header').style.boxShadow = window.scrollY > 10
    ? '0 2px 30px rgba(0,0,0,.4)'
    : '0 2px 20px rgba(0,0,0,.25)';
}, { passive: true });
