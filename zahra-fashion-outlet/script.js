/* ==========================================================================
   ZAHRA FASHION OUTLET — script.js
   ========================================================================== */

/* --------------------------------------------------------------------------
   KONFIGURASI — ubah di sini
   -------------------------------------------------------------------------- */
// Nomor WhatsApp toko (format: kode negara tanpa tanda +)
const WHATSAPP_NUMBER = '6281234567890';

// Ganti semua URL foto produk di bawah ini (mudah diganti semua di satu tempat)
const IMG = {
    tshirtPutih:  'https://images.unsplash.com/photo-1521572143419-43c8ea6297e7?auto=format&fit=crop&w=800&q=80',
    kemejaHitam:  'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
    hoodieBeige:  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    sweaterPink:  'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
    dressFloral:  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    celanaChino:  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    jaketDenim:   'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80',
    tshirtHitam:  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
};
const IMG_FALLBACK = 'assets/placeholder.svg';

/* --------------------------------------------------------------------------
   DATA PRODUK
   -------------------------------------------------------------------------- */
const products = [
    { id: 1,  name: 'Kaos Polos Cotton Combed',      category: 'T-Shirt', price: 89000,  rating: 4.8, badge: 'Best Seller', bestSeller: true,
      image: IMG.tshirtPutih, material: 'Cotton Combed 30s', weight: '200 gr', stock: 42,
      sizes: ['S', 'M', 'L', 'XL'], colors: [['Putih', '#ffffff'], ['Hitam', '#1c1c1c']],
      desc: 'Kaos polos nyaman dengan bahan cotton combed 30s, adem dan tidak melar. Cocok untuk dipakai sehari-hari.' },

    { id: 2,  name: 'Kemeja Formal Slim Fit',         category: 'Kemeja',  price: 179000, rating: 4.7, badge: 'Terlaris',   bestSeller: true,
      image: IMG.kemejaHitam, material: 'Katun Twist', weight: '250 gr', stock: 18,
      sizes: ['S', 'M', 'L', 'XL'], colors: [['Hitam', '#1c1c1c'], ['Putih', '#ffffff']],
      desc: 'Kemeja slim fit dengan potongan rapi, cocok untuk kerja, acara formal, maupun gaya kasual terlihat keren.' },

    { id: 3,  name: 'Hoodie Oversize Basic',          category: 'Hoodie',  price: 219000, rating: 4.9, badge: 'Best Seller', bestSeller: true,
      image: IMG.hoodieBeige, material: 'Fleece Cotton', weight: '400 gr', stock: 25,
      sizes: ['S', 'M', 'L', 'XL'], colors: [['Beige', '#d9c8b8'], ['Hitam', '#1c1c1c']],
      desc: 'Hoodie oversize dengan bahan fleece tebal namun tetap nyaman. Warm look untuk cuaca dingin dan santai.' },

    { id: 4,  name: 'Sweater Knit Crewneck',          category: 'Sweater', price: 165000, rating: 4.6, badge: 'Baru',        bestSeller: false,
      image: IMG.sweaterPink, material: 'Acrylic Knit', weight: '300 gr', stock: 30,
      sizes: ['S', 'M', 'L', 'XL'], colors: [['Dusty Pink', '#d8a7a1'], ['Krem', '#efe6da']],
      desc: 'Sweater knit crewneck dengan warna dusty pink yang lembut. Ringan, hangat, dan mudah dipadukan.' },

    { id: 5,  name: 'Dress Floral Midi',              category: 'Dress',   price: 245000, rating: 4.9, badge: 'Best Seller', bestSeller: true,
      image: IMG.dressFloral, material: 'Rayon Premium', weight: '280 gr', stock: 15,
      sizes: ['S', 'M', 'L', 'XL'], colors: [['Floral', '#c98a8a'], ['Putih', '#ffffff']],
      desc: 'Dress midi bermotif floral dengan potongan flowy, bikin tampil feminin dan elegan di berbagai acara.' },

    { id: 6,  name: 'Celana Chino Stretch',           category: 'Celana',  price: 149000, rating: 4.5, badge: null,          bestSeller: false,
      image: IMG.celanaChino, material: 'Katun Stretch', weight: '350 gr', stock: 35,
      sizes: ['S', 'M', 'L', 'XL'], colors: [['Krem', '#efe6da'], ['Hitam', '#1c1c1c']],
      desc: 'Celana chino stretch yang fleksibel dan tidak ketat. Pas untuk gaya smart casual ke kampus atau kantor.' },

    { id: 7,  name: 'Jaket Denim Classic',            category: 'Jaket',   price: 299000, rating: 4.8, badge: 'Terlaris',   bestSeller: false,
      image: IMG.jaketDenim, material: 'Denim Cotton', weight: '550 gr', stock: 12,
      sizes: ['S', 'M', 'L', 'XL'], colors: [['Denim', '#5a7391'], ['Hitam', '#1c1c1c']],
      desc: 'Jaket denim klasik dengan jahitan kokoh. Timeless piece yang selalu cocok dipakai kapan pun.' },

    { id: 8,  name: 'Kaos Polos Lengan Panjang',      category: 'T-Shirt', price: 109000, rating: 4.6, badge: null,          bestSeller: false,
      image: IMG.tshirtHitam, material: 'Cotton Combed 24s', weight: '230 gr', stock: 40,
      sizes: ['S', 'M', 'L', 'XL'], colors: [['Hitam', '#1c1c1c'], ['Putih', '#ffffff']],
      desc: 'Kaos lengan panjang bahan adem, cocok untuk layering atau dipakai sendiri santai di rumah.' }
];

/* --------------------------------------------------------------------------
   STATE
   -------------------------------------------------------------------------- */
const CART_KEY = 'zahra_cart_v1';
let cart = loadCart();
let activeCategory = 'Semua';
let searchTerm = '';
let sortMode = 'terbaru';

/* --------------------------------------------------------------------------
   UTIL
   -------------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function formatRupiah(n) {
    return 'Rp ' + n.toLocaleString('id-ID');
}

function loadCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        const data = raw ? JSON.parse(raw) : [];
        return Array.isArray(data) ? data : [];
    } catch (e) {
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
        /* localStorage tidak tersedia — abaikan */
    }
}

function starHTML(rating) {
    return '<i class="fas fa-star"></i> ' + rating.toFixed(1);
}

/* --------------------------------------------------------------------------
   RENDER PRODUK
   -------------------------------------------------------------------------- */
function getFilteredProducts() {
    let list = products.filter(p => activeCategory === 'Semua' || p.category === activeCategory);

    if (searchTerm) {
        const q = searchTerm.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    if (sortMode === 'harga-rendah') {
        list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortMode === 'harga-tinggi') {
        list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortMode === 'rating-tinggi') {
        list = [...list].sort((a, b) => b.rating - a.rating);
    } else {
        list = [...list].sort((a, b) => b.id - a.id); // terbaru
    }
    return list;
}

function detailHTML(p) {
    const sizeBtns = p.sizes.map((s, i) =>
        `<button type="button" class="choice-btn${i === 0 ? ' is-active' : ''}" data-action="size" data-value="${s}">${s}</button>`
    ).join('');

    const colorBtns = p.colors.map(([name, hex], i) =>
        `<button type="button" class="choice-btn swatch${i === 0 ? ' is-active' : ''}" data-action="color" data-value="${name}" style="--swatch:${hex}">${name}</button>`
    ).join('');

    const badge = p.badge
        ? `<span class="product-badge${p.badge === 'Baru' ? ' is-promo' : ''}">${p.badge}</span>`
        : '';

    return `
        <div class="detail-layout">
            <div class="detail-photo">
                <img src="${p.image}" alt="${p.name}" loading="lazy"
                     onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
                ${badge}
            </div>
            <div class="detail-main">
                <p class="product-cat">${p.category}</p>
                <h3 class="detail-name">${p.name}</h3>
                <div class="detail-row">
                    <span class="detail-price">${formatRupiah(p.price)}</span>
                    <span class="product-rating">${starHTML(p.rating)}</span>
                </div>
                <p class="detail-desc">${p.desc}</p>
                <div class="detail-specs">
                    <div><span>Ukuran</span><strong>${p.sizes.join(' / ')}</strong></div>
                    <div><span>Bahan</span><strong>${p.material}</strong></div>
                    <div><span>Berat</span><strong>${p.weight}</strong></div>
                    <div><span>Stok</span><strong>${p.stock} pcs</strong></div>
                </div>
                <div>
                    <span class="detail-label">Pilih Warna</span>
                    <div class="choice-row">${colorBtns}</div>
                </div>
                <div>
                    <span class="detail-label">Pilih Ukuran</span>
                    <div class="choice-row">${sizeBtns}</div>
                </div>
                <div class="detail-buy-row">
                    <div class="qty-box">
                        <button type="button" data-action="qty-dec" aria-label="Kurangi">−</button>
                        <span data-role="qty">1</span>
                        <button type="button" data-action="qty-inc" aria-label="Tambah">+</button>
                    </div>
                    <button type="button" class="btn btn-primary" data-action="detail-add">Tambah ke Keranjang</button>
                    <span class="detail-stock">Stok: <b>${p.stock}</b></span>
                </div>
            </div>
        </div>`;
}

function cardHTML(p) {
    const badge = p.badge
        ? `<span class="product-badge${p.badge === 'Baru' ? ' is-promo' : ''}">${p.badge}</span>`
        : '';

    return `
    <article class="product-card" data-id="${p.id}">
        <div class="product-media">
            <img src="${p.image}" alt="${p.name}" loading="lazy"
                 onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
            ${badge}
        </div>
        <div class="product-body">
            <p class="product-cat">${p.category}</p>
            <h3 class="product-name">${p.name}</h3>
            <div class="product-meta">
                <span class="product-price">${formatRupiah(p.price)}</span>
                <span class="product-rating">${starHTML(p.rating)}</span>
            </div>
            <div class="product-actions">
                <button type="button" class="btn btn-outline" data-action="show-detail">Detail</button>
                <button type="button" class="btn btn-primary" data-action="quick-add">+ Keranjang</button>
            </div>
        </div>
    </article>`;
}

function renderProducts() {
    const grid = $('#produkGrid');
    const list = getFilteredProducts();
    grid.innerHTML = list.map(cardHTML).join('');

    $('#produkEmpty').hidden = list.length > 0;
    $('#produkCount').textContent = list.length
        ? `Menampilkan ${list.length} produk`
        : '';
}

function renderBestSeller() {
    const list = products.filter(p => p.bestSeller);
    $('#bestSellerGrid').innerHTML = list.map(cardHTML).join('');
}

/* --------------------------------------------------------------------------
   DETAIL PRODUK — POPUP
   -------------------------------------------------------------------------- */
function openProductModal(product) {
    const body = $('#productModalBody');
    body.innerHTML = detailHTML(product);
    body.dataset.id = String(product.id);
    body.dataset.size = product.sizes[0];
    body.dataset.color = product.colors[0][0];
    body.dataset.qty = '1';

    const modal = $('#productModal');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = $('#productModal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    $('#productModalBody').innerHTML = '';
    document.body.style.overflow = '';
}

function isProductModalOpen() {
    return $('#productModal').classList.contains('is-open');
}

function getProduct(id) {
    return products.find(p => p.id === id);
}

/* --------------------------------------------------------------------------
   KERANJANG
   -------------------------------------------------------------------------- */
function cartKey(productId, size, color) {
    return `${productId}|${size}|${color}`;
}

function addToCart(product, size, color, qty) {
    const key = cartKey(product.id, size, color);
    const found = cart.find(item => item.key === key);

    if (found) {
        found.qty = Math.min(found.qty + qty, product.stock);
    } else {
        cart.push({
            key,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            color,
            qty: Math.min(qty, product.stock)
        });
    }
    saveCart();
    renderCart();
    openCart();
}

function changeQty(key, delta) {
    const item = cart.find(i => i.key === key);
    if (!item) return;
    const product = getProduct(item.id);
    const max = product ? product.stock : 99;
    item.qty = Math.min(item.qty + delta, max);
    if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
    saveCart();
    renderCart();
}

function removeItem(key) {
    cart = cart.filter(i => i.key !== key);
    saveCart();
    renderCart();
}

function cartTotals() {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    return { subtotal, total: subtotal };
}

function renderCart() {
    const wrap = $('#cartItems');
    const badge = $('#cartBadge');
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    badge.textContent = count;
    badge.style.display = count ? 'flex' : 'none';

    if (!cart.length) {
        wrap.innerHTML = '<p class="cart-empty">Keranjang masih kosong.</p>';
    } else {
        wrap.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}" loading="lazy"
                         onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
                </div>
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-opt">Ukuran: ${item.size} · Warna: ${item.color}</p>
                    <p class="cart-item-price">${formatRupiah(item.price * item.qty)}</p>
                    <div class="cart-item-controls">
                        <div class="qty-box">
                            <button type="button" data-action="cart-dec" data-key="${item.key}" aria-label="Kurangi">−</button>
                            <span>${item.qty}</span>
                            <button type="button" data-action="cart-inc" data-key="${item.key}" aria-label="Tambah">+</button>
                        </div>
                        <button type="button" class="cart-item-remove" data-action="cart-remove" data-key="${item.key}">Hapus</button>
                    </div>
                </div>
            </div>`).join('');
    }

    const { subtotal, total } = cartTotals();
    $('#cartSubtotal').textContent = formatRupiah(subtotal);
    $('#cartTotal').textContent = formatRupiah(total);
}

function openCart() {
    $('#cartSidebar').classList.add('is-open');
    $('#cartSidebar').setAttribute('aria-hidden', 'false');
    const ov = $('#cartOverlay');
    ov.hidden = false;
    requestAnimationFrame(() => ov.classList.add('is-visible'));
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    $('#cartSidebar').classList.remove('is-open');
    $('#cartSidebar').setAttribute('aria-hidden', 'true');
    const ov = $('#cartOverlay');
    ov.classList.remove('is-visible');
    setTimeout(() => { ov.hidden = true; }, 300);
    document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   CHECKOUT
   -------------------------------------------------------------------------- */
function renderCheckoutSummary() {
    const { subtotal, total } = cartTotals();
    $('#checkoutSummary').innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} (${item.size}/${item.color}) × ${item.qty}</span>
            <span>${formatRupiah(item.price * item.qty)}</span>
        </div>`).join('');
    $('#checkoutTotal').textContent = formatRupiah(total);
    return { subtotal, total };
}

function openCheckout() {
    if (!cart.length) return;
    closeCart();
    renderCheckoutSummary();
    $('#checkoutModal').classList.add('is-open');
    $('#checkoutModal').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#coNama').focus(), 80);
}

function closeCheckout() {
    $('#checkoutModal').classList.remove('is-open');
    $('#checkoutModal').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    $('#formError').hidden = true;
}

function validateCheckout(fields) {
    let ok = true;
    fields.forEach(({ el, test }) => {
        const valid = test(el.value.trim());
        el.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
    });
    return ok;
}

function buildWhatsAppMessage(data, { total }) {
    const lines = [
        '*PESANAN BARU - ZAHRA FASHION OUTLET*',
        '',
        `Nama pembeli: ${data.nama}`,
        `No. WhatsApp: ${data.wa}`,
        '',
        '*Produk:*'
    ];

    cart.forEach(item => {
        lines.push(
            `- ${item.name}`,
            `  Ukuran: ${item.size}`,
            `  Warna: ${item.color}`,
            `  Jumlah: ${item.qty}`,
            `  Subtotal: ${formatRupiah(item.price * item.qty)}`
        );
    });

    lines.push(
        '',
        `*Total: ${formatRupiah(total)}*`,
        '',
        '*Alamat pengiriman:*',
        `${data.alamat}`,
        `Kota: ${data.kota}`,
        `Kode Pos: ${data.kodepos}`,
        '',
        `Metode pembayaran: ${data.bayar}`,
        '',
        'Mohon konfirmasi pesanan saya. Terima kasih.'
    );

    return lines.join('\n');
}

function handleCheckoutSubmit(e) {
    e.preventDefault();

    const nama = $('#coNama');
    const wa = $('#coWa');
    const alamat = $('#coAlamat');
    const kota = $('#coKota');
    const pos = $('#coPos');
    const bayar = $('#coBayar');

    const isValid = validateCheckout([
        { el: nama,   test: v => v.length >= 2 },
        { el: wa,     test: v => v.replace(/\D/g, '').length >= 9 },
        { el: alamat, test: v => v.length >= 5 },
        { el: kota,   test: v => v.length >= 2 },
        { el: pos,    test: v => /^\d{4,6}$/.test(v) },
        { el: bayar,  test: v => v !== '' }
    ]);

    if (!isValid) {
        $('#formError').hidden = false;
        return;
    }
    $('#formError').hidden = true;

    const { total } = renderCheckoutSummary();
    const message = buildWhatsAppMessage({
        nama: nama.value.trim(),
        wa: wa.value.trim(),
        alamat: alamat.value.trim(),
        kota: kota.value.trim(),
        pos: pos.value.trim(),
        bayar: bayar.value
    }, { total });

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    cart = [];
    saveCart();
    renderCart();
    e.target.reset();
    closeCheckout();
}

/* --------------------------------------------------------------------------
   NAV / SEARCH / FILTER / SORT
   -------------------------------------------------------------------------- */
function initNav() {
    const menu = $('#navMenu');
    $('#hamburger').addEventListener('click', () => {
        menu.classList.toggle('is-open');
        const open = menu.classList.contains('is-open');
        $('#hamburger').setAttribute('aria-expanded', String(open));
        $('#hamburger i').className = open ? 'fas fa-times' : 'fas fa-bars';
    });

    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            $('#hamburger i').className = 'fas fa-bars';
            $('#hamburger').setAttribute('aria-expanded', 'false');
        });
    });
}

function initFilterSortSearch() {
    $('#kategoriFilter').addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        $$('.filter-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeCategory = btn.dataset.category;
        renderProducts();
    });

    $('#sortSelect').addEventListener('change', e => {
        sortMode = e.target.value;
        renderProducts();
    });

    $('#searchInput').addEventListener('input', e => {
        searchTerm = e.target.value.trim();
        renderProducts();
    });
}

/* --------------------------------------------------------------------------
   EVENT DELEGATION (popup detail + kartu produk + keranjang)
   -------------------------------------------------------------------------- */
function handleCardAction(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const modalBody = btn.closest('#productModalBody');
    const card = btn.closest('.product-card');
    const cartItemBtn = btn.closest('.cart-item');

    // Aksi di popup detail produk
    if (modalBody) {
        const product = getProduct(Number(modalBody.dataset.id));
        if (!product) return;
        const qty = Number(modalBody.dataset.qty) || 1;

        if (action === 'size' || action === 'color') {
            const selector = action === 'size' ? '[data-action="size"]' : '[data-action="color"]';
            $$(selector, modalBody).forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            if (action === 'size') modalBody.dataset.size = btn.dataset.value;
            else modalBody.dataset.color = btn.dataset.value;
            return;
        }
        if (action === 'qty-inc' || action === 'qty-dec') {
            const next = action === 'qty-inc'
                ? Math.min(qty + 1, product.stock)
                : Math.max(qty - 1, 1);
            modalBody.dataset.qty = String(next);
            $('[data-role="qty"]', modalBody).textContent = next;
            return;
        }
        if (action === 'detail-add') {
            const size = modalBody.dataset.size;
            const color = modalBody.dataset.color;
            closeProductModal();
            addToCart(product, size, color, qty);
            return;
        }
        return;
    }

    // Aksi di kartu produk
    if (card) {
        const product = getProduct(Number(card.dataset.id));
        if (!product) return;

        if (action === 'show-detail') {
            openProductModal(product);
            return;
        }
        if (action === 'quick-add') {
            addToCart(product, product.sizes[0], product.colors[0][0], 1);
            return;
        }
    }

    // Aksi di item keranjang
    if (cartItemBtn && ['cart-inc', 'cart-dec', 'cart-remove'].includes(action)) {
        const key = btn.dataset.key;
        if (action === 'cart-inc') changeQty(key, 1);
        else if (action === 'cart-dec') changeQty(key, -1);
        else removeItem(key);
    }
}

/* --------------------------------------------------------------------------
   INIT
   -------------------------------------------------------------------------- */
function init() {
    $('#year').textContent = new Date().getFullYear();
    $('#kontakWa').textContent = '+' + WHATSAPP_NUMBER.replace(/^(\d{2})(\d{3})(\d{4})(\d+)$/, '$1 $2-$3-$4');
    $('#kontakWaLink').href = `https://wa.me/${WHATSAPP_NUMBER}`;

    renderProducts();
    renderBestSeller();
    renderCart();

    initNav();
    initFilterSortSearch();

    document.addEventListener('click', handleCardAction);

    $('#cartBtn').addEventListener('click', openCart);
    $('#cartClose').addEventListener('click', closeCart);
    $('#cartOverlay').addEventListener('click', closeCart);
    $('#checkoutBtn').addEventListener('click', openCheckout);
    $('#checkoutForm').addEventListener('submit', handleCheckoutSubmit);

    $$('[data-close-modal]').forEach(el => el.addEventListener('click', closeCheckout));
    $$('[data-close-product]').forEach(el => el.addEventListener('click', closeProductModal));

    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        if (isProductModalOpen()) closeProductModal();
        else if ($('#checkoutModal').classList.contains('is-open')) closeCheckout();
        else if ($('#cartSidebar').classList.contains('is-open')) closeCart();
    });
}

document.addEventListener('DOMContentLoaded', init);
