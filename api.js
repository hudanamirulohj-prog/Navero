/* =========================================================
   NAVERO — api.js
   Konfigurasi + lapisan data (Google Sheets CSV Published)
   ========================================================= */

/* ---------- 1. KONFIGURASI UTAMA ---------- */
window.NAVERO_CONFIG = {
  /**
   * Tempel URL CSV hasil "Publish to web" dari Google Sheets.
   * Format: https://docs.google.com/spreadsheets/d/e/2PACX-xxxxx/pub?gid=0&single=true&output=csv
   *
   * Biarkan kosong ("") untuk memakai data DEMO.
   */
  CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTvGRVnf-9ysm4oyOpQryj3JCHl2BqySe9G_VHoMoe7r3gKS5XwAHZA0ZclzsvZuVtZaJWV19RowuF_/pub?output=csv",

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
  tagline: "Arah Tepat Menuju Kesuksesan",
  deskripsi:
    "NAVERO adalah katalog produk affiliate pilihan yang mengkurasi produk terbaik dari Shopee. " +
    "Dengan visi \"Arah Tepat Menuju Kesuksesan\", kami membantu kamu menemukan produk berkualitas " +
    "dengan harga terbaik untuk mendukung gaya hidup dan bisnis kamu.",

  sosial: {
    instagram: "https://instagram.com/navero_official_01",
    tiktok: "https://tiktok.com/@navero68",
    whatsapp: "https://wa.me/083829944887",
    email: "navero@gmail.com",
  },

  kontak: [
    { label: "Instagram", value: "navero_official_01", icon: "📸", url: "https://instagram.com/navero_official_01" },
    { label: "TikTok",    value: "@navero68", icon: "🎵", url: "https://tiktok.com/@navero68" },
    { label: "WhatsApp",  value: "+62 838-2994-4887", icon: "💬", url: "https://wa.me/083829944887" },
    { label: "Email",     value: "navero@gmail.com", icon: "✉️", url: "mailto: navero@gmail.com" },
  ],
};

/* ---------- 3. KATEGORI ---------- */
window.NAVERO_CATEGORIES = [
  { name: "Semua",        icon: "🛍️" },
  { name: "Elektronik",   icon: "📱" },
  { name: "Rumah Tangga", icon: "🏠" },
  { name: "Fashion",      icon: "👕" },
  { name: "Gaming",       icon: "🎮" },
  { name: "Kecantikan",   icon: "💄" },
  { name: "Aksesoris",    icon: "⌚" },
  { name: "Makanan",      icon: "🍫" },
  { name: "Lainnya",      icon: "📦" },
];

/* ---------- 4. DATA DEMO (dipakai bila CSV_URL kosong) ---------- */
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

/* ---------- 6. CSV PARSER (RFC 4180 compliant) ---------- */
/**
 * Parser CSV yang menangani:
 * - Field dengan tanda kutip (""...)
 * - Koma di dalam tanda kutip
 * - Newline di dalam tanda kutip (multiline)
 * - Escape quote ("" menjadi ")
 */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  // Hapus BOM di awal file
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);

  while (i < text.length) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"') {
        if (next === '"') {       // escaped quote → satu quote
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;          // akhir quote
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }

    // di luar quotes
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ',') {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (ch === '\r') { i++; continue; }   // abaikan CR
    if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }

    field += ch;
    i++;
  }

  // Push field/row terakhir jika ada sisa
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/**
 * Konversi array-of-array (hasil parseCSV) menjadi array objek
 * berdasarkan baris pertama sebagai header.
 */
function csvToObjects(rows) {
  if (!rows || rows.length < 2) return [];

  const headers = rows[0].map(h => String(h).trim());

  // Peta alias header (fleksibel, case-insensitive)
  const aliases = {
  'id': 'ID',
  'nama produk': 'Nama Produk', 'nama': 'Nama Produk', 'produk': 'Nama Produk', 'name': 'Nama Produk',
  'kategori': 'Kategori', 'category': 'Kategori',
  'harga': 'Harga', 'price': 'Harga',
  'gambar': 'Gambar', 'image': 'Gambar', 'foto': 'Gambar',
  'video': 'Video', 'video url': 'Video', 'videourl': 'Video', 'youtube': 'Video',
  'link affiliate': 'Link Affiliate', 'link': 'Link Affiliate', 'linkaffiliate': 'Link Affiliate',
  'deskripsi': 'Deskripsi', 'description': 'Deskripsi',
  'badge': 'Badge', 'label': 'Badge',
};

  const idx = {};
  headers.forEach((h, i) => {
    const key = h.toLowerCase().replace(/\s+/g, ' ').trim();
    const canonical = aliases[key] || h;
    idx[canonical] = i;
  });

  const get = (row, key) => {
    const i = idx[key];
    if (i === undefined || i < 0) return "";
    const v = row[i];
    return v === undefined || v === null ? "" : String(v).trim();
  };

  const out = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = get(row, 'Nama Produk');
    if (!name) continue; // lewati baris kosong

    out.push({
      id:          get(row, 'ID') || String(r).padStart(3, "0"),
      name:        name,
      category:    get(row, 'Kategori') || 'Lainnya',
      price:       _cleanPrice(get(row, 'Harga')),
      image:       get(row, 'Gambar'),
      link:        get(row, 'Link Affiliate'),
      description: get(row, 'Deskripsi'),
      badge:       get(row, 'Badge').toUpperCase(),
    });
  }

  return out;
}

/* ---------- 7. UTILITAS ---------- */
function _cleanPrice(v) {
  if (!v) return "0";
  const digits = String(v).replace(/[^\d]/g, "");
  return digits || "0";
}

function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ---------- 8. FETCH PRODUK DARI CSV ---------- */
async function getProducts({ force = false } = {}) {
  const { CSV_URL, CACHE_TTL } = window.NAVERO_CONFIG;

  // 1) Cek cache
  const cached = _readCache();
  if (!force && cached && Date.now() - cached.t < CACHE_TTL) {
    return cached.d;
  }

  // 2) Mode demo bila CSV belum diisi
  if (!CSV_URL) {
    await _sleep(700);
    return window.NAVERO_DEMO.map(_demoNormalize);
  }

  // 3) Fetch CSV dari Google Sheets
  try {
    // Tambahkan cache-buster agar browser tidak pakai versi lama
    const url = CSV_URL + (CSV_URL.includes("?") ? "&" : "?") + "_=" + Date.now();

    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("HTTP " + res.status);

    const csvText = await res.text();

    // Validasi: kalau Google mengembalikan HTML (misal belum di-publish),
    // biasanya diawali dengan "<!DOCTYPE" atau "<html"
    if (/^\s*<(?:!doctype|html)/i.test(csvText)) {
      throw new Error(
        "URL tidak mengembalikan CSV. Pastikan sudah File → Share → Publish to web " +
        "dan pilih format CSV."
      );
    }

    const rows = parseCSV(csvText);
    const products = csvToObjects(rows);

    if (!products.length) {
      throw new Error("CSV kosong atau header tidak dikenali.");
    }

    _writeCache(products);
    return products;

  } catch (err) {
    console.warn("[NAVERO] Gagal memuat CSV:", err.message);

    // Fallback berurutan: cache lama → demo
    if (cached) return cached.d;
    return window.NAVERO_DEMO.map(_demoNormalize);
  }
}

function _demoNormalize(raw) {
  return { ...raw };
}

/* ---------- 9. FORMAT RUPIAH ---------- */
function formatRupiah(value) {
  const n = parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
  return "Rp" + n.toLocaleString("id-ID");
}

/* ---------- 10. FAVORIT ---------- */
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
  return idx === -1;
}

/* ---------- Expose ke global ---------- */
window.NAVERO = {
  getProducts,
  clearProductCache,
  formatRupiah,
  getFavorites,
  isFavorite,
  toggleFavorite,
  parseCSV,       // untuk debugging
  csvToObjects,   // untuk debugging
};
