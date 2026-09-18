/* =========================================================
   NAVERO — api.js
   Konfigurasi + lapisan data (Google Apps Script / Spreadsheet)
   ========================================================= */

/* ---------- 1. KONFIGURASI UTAMA ---------- */
window.NAVERO_CONFIG = {
  /**
   * Tempel URL Web App Google Apps Script di sini.
   * Contoh: https://script.google.com/macros/s/AKfycbxxxxxxx/exec
   * Biarkan kosong ("") untuk memakai data DEMO.
   */
  API_URL: "https://script.google.com/macros/s/AKfycbzvepsK5QC4Yt0Y1FnzWqo4lxTjhHegbvIy__XkTOSyKLNIXKWzqMK0wlMnecaR3BTMEQ/exec",

  /** Lama cache data produk di browser (ms). Default 5 menit. */
  CACHE_TTL: 5 * 60 * 1000,

  /** Kunci penyimpanan cache. */
  CACHE_KEY: "navero_products_v1",

  /** Kunci penyimpanan favorit. */
  FAV_KEY: "navero_favorites_v1",

  /** Kunci penyimpanan tema. */
  THEME_KEY: "navero_theme",

  /** Jumlah produk per halaman di katalog. */
  PER_PAGE: 12,
};

/* ---------- 2. KONFIGURASI PROFIL (mudah diedit) ---------- */
window.NAVERO_PROFILE = {
  nama: "NAVERO",
  tagline: "Kurasi Produk Terbaik untuk Kamu",
  deskripsi:
    "NAVERO adalah katalog produk affiliate yang mengkurasi produk-produk terbaik dari Shopee. " +
    "Kami membantu kamu menemukan produk berkualitas dengan harga terbaik, tanpa ribet.",

  sosial: {
    instagram: "https://instagram.com/navero.id",
    tiktok: "https://tiktok.com/@navero.id",
    whatsapp: "https://wa.me/6281234567890",
    email: "hello@navero.id",
  },

  kontak: [
    { label: "Instagram", value: "@navero.id", icon: "📸", url: "https://instagram.com/navero.id" },
    { label: "TikTok",    value: "@navero.id", icon: "🎵", url: "https://tiktok.com/@navero.id" },
    { label: "WhatsApp",  value: "+62 812-3456-7890", icon: "💬", url: "https://wa.me/6281234567890" },
    { label: "Email",     value: "hello@navero.id", icon: "✉️", url: "mailto:hello@navero.id" },
  ],
};

/* ---------- 3. KATEGORI ---------- */
window.NAVERO_CATEGORIES = [
  { name: "Semua",      icon: "🛍️" },
  { name: "Elektronik", icon: "📱" },
  { name: "Rumah Tangga", icon: "🏠" },
  { name: "Fashion",    icon: "👕" },
  { name: "Gaming",     icon: "🎮" },
  { name: "Kecantikan", icon: "💄" },
  { name: "Aksesoris",  icon: "⌚" },
  { name: "Makanan",    icon: "🍫" },
  { name: "Lainnya",    icon: "📦" },
];

/* ---------- 4. DATA DEMO (dipakai bila API_URL kosong) ---------- */
window.NAVERO_DEMO = [
  { id:"001", name:"Blender Mini Portable USB", category:"Rumah Tangga", price:"79000",  image:"https://picsum.photos/seed/blender/600/600", link:"https://shopee.co.id/", description:"Blender praktis untuk jus & smoothie, muat dibawa bepergian.", badge:"TERLARIS" },
  { id:"002", name:"TWS Earbuds Bluetooth 5.3",  category:"Elektronik",  price:"149000", image:"https://picsum.photos/seed/earbuds/600/600", link:"https://shopee.co.id/", description:"Suara jernih, bass mantap, baterai tahan hingga 24 jam.", badge:"PROMO" },
  { id:"003", name:"Lampu Meja LED Sentuh",      category:"Rumah Tangga", price:"65000",  image:"https://picsum.photos/seed/lampu/600/600",   link:"https://shopee.co.id/", description:"3 mode cahaya, hemat energi, desain minimalis modern.", badge:"BARU" },
  { id:"004", name:"Keyboard Mechanical 60%",    category:"Gaming",      price:"299000", image:"https://picsum.photos/seed/keyboard/600/600", link:"https://shopee.co.id/", description:"Switch biru, RGB backlight, anti-ghosting untuk gaming.", badge:"FAVORIT" },
  { id:"005", name:"Serum Vitamin C Glow",       category:"Kecantikan",  price:"89000",  image:"https://picsum.photos/seed/serum/600/600",   link:"https://shopee.co.id/", description:"Mencerahkan kulit & menyamarkan noda hitam dalam 2 minggu.", badge:"TERLARIS" },
  { id:"006", name:"Kaos Oversize Cotton Combed", category:"Fashion",    price:"55000",  image:"https://picsum.photos/seed/kaos/600/600",    link:"https://shopee.co.id/", description:"Bahan adem 24s, jahitan rapi, cocok untuk daily outfit.", badge:"BARU" },
  { id:"007", name:"Smartwatch T900 Ultra",      category:"Aksesoris",   price:"189000", image:"https://picsum.photos/seed/watch/600/600",   link:"https://shopee.co.id/", description:"Layar AMOLED, monitor detak jantung, tahan air IP67.", badge:"PROMO" },
  { id:"008", name:"Powerbank 20000mAh Fast Charge", category:"Elektronik", price:"175000", image:"https://picsum.photos/seed/powerbank/600/600", link:"https://shopee.co.id/", description:"Dual output 22.5W, bisa isi 3 device sekaligus.", badge:"TERLARIS" },
  { id:"009", name:"Rak Dinding Multifungsi",    category:"Rumah Tangga", price:"45000",  image:"https://picsum.photos/seed/rak/600/600",     link:"https://shopee.co.id/", description:"Tanpa bor, kuat menahan hingga 5kg, hemat ruang.", badge:"FAVORIT" },
  { id:"010", name:"Mouse Gaming RGB 7200 DPI",  category:"Gaming",      price:"125000", image:"https://picsum.photos/seed/mouse/600/600",   link:"https://shopee.co.id/", description:"Sensor presisi tinggi, 6 tombol programmable, ringan.", badge:"BARU" },
  { id:"011", name:"Kopi Latte Sachet Premium",  category:"Makanan",     price:"38000",  image:"https://picsum.photos/seed/kopi/600/600",    link:"https://shopee.co.id/", description:"Rasa creamy ala kafe, cukup seduh 1 menit.", badge:"PROMO" },
  { id:"012", name:"Tas Ransel Anti Air 25L",    category:"Aksesoris",   price:"139000", image:"https://picsum.photos/seed/tas/600/600",     link:"https://shopee.co.id/", description:"Bahan polyester premium, banyak kompartemen, USB port.", badge:"FAVORIT" },
];

/* ---------- 5. CACHE ---------- */
function _readCache() {
  try {
    const raw = localStorage.getItem(window.NAVERO_CONFIG.CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.d)) return null;
    return parsed;
  } catch { return null; }
}

function _writeCache(data) {
  try {
    localStorage.setItem(
      window.NAVERO_CONFIG.CACHE_KEY,
      JSON.stringify({ t: Date.now(), d: data })
    );
  } catch { /* storage penuh — abaikan */ }
}

function clearProductCache() {
  try { localStorage.removeItem(window.NAVERO_CONFIG.CACHE_KEY); } catch {}
}

/* ---------- 6. NORMALISASI ---------- */
function _normalizeItem(raw, index) {
  const g = (...keys) => {
    for (const k of keys) {
      if (raw[k] !== undefined && raw[k] !== null && String(raw[k]).trim() !== "") {
        return String(raw[k]).trim();
      }
    }
    return "";
  };

  return {
    id:          g("id", "ID") || String(index + 1).padStart(3, "0"),
    name:        g("name", "Nama Produk", "nama") || "Produk Tanpa Nama",
    category:    g("category", "Kategori", "kategori") || "Lainnya",
    price:       _cleanPrice(g("price", "Harga", "harga")),
    image:       g("image", "Gambar", "gambar") || "",
    link:        g("link", "Link Affiliate", "linkAffiliate", "Link") || "#",
    description: g("description", "Deskripsi", "deskripsi") || "",
    badge:       (g("badge", "Badge", "label") || "").toUpperCase(),
  };
}

function _cleanPrice(v) {
  if (!v) return "0";
  const digits = String(v).replace(/[^\d]/g, "");
  return digits || "0";
}

/* ---------- 7. FETCH PRODUK ---------- */
async function getProducts({ force = false } = {}) {
  const { API_URL, CACHE_TTL } = window.NAVERO_CONFIG;

  // 1) Cek cache
  const cached = _readCache();
  if (!force && cached && Date.now() - cached.t < CACHE_TTL) {
    return cached.d;
  }

  // 2) Mode demo (API belum diisi)
  if (!API_URL) {
    await _sleep(700); // simulasi loading
    return window.NAVERO_DEMO.map(_normalizeItem);
  }

  // 3) Fetch dari Apps Script
  try {
    const url = API_URL + (API_URL.includes("?") ? "&" : "?") + "t=" + Date.now();
    const res = await fetch(url, { method: "GET", redirect: "follow", cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);

    const json = await res.json();

    // Dukung format: [ ... ] atau { data: [ ... ] }
    const arr = Array.isArray(json) ? json : (Array.isArray(json.data) ? json.data : []);
    if (!arr.length) throw new Error("Data kosong");

    const normalized = arr
      .map(_normalizeItem)
      .filter(p => p.name && p.name !== "Produk Tanpa Nama");

    _writeCache(normalized);
    return normalized;

  } catch (err) {
    console.warn("[NAVERO] Gagal memuat data dari API:", err.message);
    if (cached) return cached.d;               // fallback ke cache lama
    return window.NAVERO_DEMO.map(_normalizeItem); // fallback ke demo
  }
}

function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ---------- 8. UTILITAS HARGA ---------- */
function formatRupiah(value) {
  const n = parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
  return "Rp" + n.toLocaleString("id-ID");
}

/* ---------- 9. FAVORIT ---------- */
function getFavorites() {
  try {
    const raw = localStorage.getItem(window.NAVERO_CONFIG.FAV_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

function saveFavorites(list) {
  try {
    localStorage.setItem(window.NAVERO_CONFIG.FAV_KEY, JSON.stringify(list));
  } catch {}
}

function isFavorite(id) {
  return getFavorites().includes(String(id));
}

function toggleFavorite(id) {
  const sid = String(id);
  const list = getFavorites();
  const idx = list.indexOf(sid);
  if (idx > -1) list.splice(idx, 1);
  else list.push(sid);
  saveFavorites(list);
  return idx === -1; // true jika baru ditambahkan
}

/* Expose ke global */
window.NAVERO = {
  getProducts,
  clearProductCache,
  formatRupiah,
  getFavorites,
  isFavorite,
  toggleFavorite,
};