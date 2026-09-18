/* =========================================================
   NAVERO — script.js
   Logika UI: tema, navigasi, render produk, filter, favorit
   ========================================================= */

(function () {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const {
    getProducts, formatRupiah, getFavorites, isFavorite, toggleFavorite,
  } = window.NAVERO;

  const CATEGORIES = window.NAVERO_CATEGORIES;
  const CONFIG = window.NAVERO_CONFIG;
  const PROFILE = window.NAVERO_PROFILE;

  /* ---------- STATE ---------- */
  const state = {
    products: [],
    filtered: [],
    category: "Semua",
    query: "",
    sort: "default",
    badgeFilter: "",
    favOnly: false,
    page: 1,
  };

  /* =========================================================
     1. TEMA (DARK / LIGHT)
     ========================================================= */
  function initTheme() {
    const stored = localStorage.getItem(CONFIG.THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);

    const btn = $("#themeToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(CONFIG.THEME_KEY, next);
        toast(next === "dark" ? "🌙 Mode gelap aktif" : "☀️ Mode terang aktif");
      });
    }
  }

  /* =========================================================
     2. HEADER & NAVIGASI
     ========================================================= */
  function initHeader() {
    const header = $("#header");
    const nav = $("#nav");
    const navToggle = $("#navToggle");

    // Scroll shadow
    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
      const toTop = $("#toTop");
      if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile nav
    if (navToggle && nav) {
      navToggle.addEventListener("click", () => nav.classList.toggle("is-open"));
      nav.addEventListener("click", (e) => {
        if (e.target.classList.contains("nav__link")) nav.classList.remove("is-open");
      });
      document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
          nav.classList.remove("is-open");
        }
      });
    }

    // Tahun footer
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Back to top
    const toTop = $("#toTop");
    if (toTop) {
      toTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
    }
  }

  /* =========================================================
     3. SEARCH
     ========================================================= */
  function initSearch() {
    // Header search → redirect ke products.html
    const headerForm = $("#headerSearchForm");
    const headerInput = $("#headerSearch");
    if (headerForm && headerInput) {
      headerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = headerInput.value.trim();
        window.location.href = q
          ? `products.html?q=${encodeURIComponent(q)}`
          : "products.html";
      });
    }

    // Search di halaman katalog (real-time)
    const input = $("#searchInput");
    if (!input) return;

    const clearBtn = $("#searchClear");
    const wrap = input.closest(".search");

    let debounce;
    input.addEventListener("input", () => {
      clearTimeout(debounce);
      const val = input.value;
      if (wrap) wrap.classList.toggle("has-value", val.length > 0);
      debounce = setTimeout(() => {
        state.query = val.trim().toLowerCase();
        state.page = 1;
        applyFilters();
      }, 220);
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        state.query = "";
        state.page = 1;
        wrap.classList.remove("has-value");
        applyFilters();
        input.focus();
      });
    }
  }

  /* =========================================================
     4. RENDER KARTU PRODUK
     ========================================================= */
  function badgeClass(badge) {
    const map = {
      TERLARIS: "badge--terlaris",
      BARU: "badge--baru",
      PROMO: "badge--promo",
      FAVORIT: "badge--favorit",
    };
    return map[badge] || "badge--default";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cardHTML(p) {
    const fav = isFavorite(p.id);
    const img = p.image || `https://picsum.photos/seed/${encodeURIComponent(p.id)}/600/600`;
    const badge = p.badge
      ? `<span class="badge ${badgeClass(p.badge)}">${escapeHtml(p.badge)}</span>`
      : "";

    return `
      <article class="card" data-id="${escapeHtml(p.id)}">
        <div class="card__media">
          <a class="card__media-link" href="${escapeHtml(p.link)}" target="_blank" rel="nofollow sponsored noopener" aria-label="${escapeHtml(p.name)}">
            <img src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}" loading="lazy"
                 onerror="this.onerror=null;this.src='https://picsum.photos/seed/${encodeURIComponent(p.id)}/600/600'">
          </a>
          ${badge}
          <button class="fav-btn ${fav ? "is-active" : ""}" data-fav="${escapeHtml(p.id)}" aria-label="Simpan ke favorit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z"/>
            </svg>
          </button>
        </div>
        <div class="card__body">
          <span class="card__cat">${escapeHtml(p.category)}</span>
          <h3 class="card__title">${escapeHtml(p.name)}</h3>
          <div class="card__price">${formatRupiah(p.price)}</div>
          <p class="card__desc">${escapeHtml(p.description)}</p>
          <a class="btn btn--primary card__cta" href="${escapeHtml(p.link)}" target="_blank" rel="nofollow sponsored noopener">
            Lihat Produk
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </article>`;
  }

  function skeletonHTML(count = 8) {
    return Array.from({ length: count }).map(() => `
      <div class="skeleton">
        <div class="sk-box sk-img"></div>
        <div class="sk-body">
          <div class="sk-box sk-line sk-line--sm"></div>
          <div class="sk-box sk-line sk-line--lg"></div>
          <div class="sk-box sk-line sk-line--md"></div>
          <div class="sk-box sk-btn"></div>
        </div>
      </div>`).join("");
  }

  function renderInto(container, list, { skeleton = false, count = 8 } = {}) {
    if (!container) return;
    if (skeleton) {
      container.innerHTML = skeletonHTML(count);
      return;
    }
    if (!list.length) {
      container.innerHTML = "";
      return;
    }
    container.innerHTML = list.map(cardHTML).join("");
  }

  /* =========================================================
     5. FAVORIT (EVENT DELEGATION)
     ========================================================= */
  function initFavorites() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-fav]");
      if (!btn) return;
      e.preventDefault();
      const id = btn.getAttribute("data-fav");
      const added = toggleFavorite(id);

      btn.classList.toggle("is-active", added);
      btn.classList.remove("is-bump");
      void btn.offsetWidth;
      btn.classList.add("is-bump");

      toast(added ? "❤️ Ditambahkan ke favorit" : "💔 Dihapus dari favorit");

      if (state.favOnly) {
        applyFilters();
      } else {
        // Sinkronkan semua tombol dengan id yang sama
        $$(`[data-fav="${CSS.escape(id)}"]`).forEach(b =>
          b.classList.toggle("is-active", added)
        );
      }
    });
  }

  /* =========================================================
     6. TOAST
     ========================================================= */
  let toastTimer;
  function toast(message) {
    const wrap = $("#toastWrap");
    if (!wrap) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    wrap.appendChild(el);

    setTimeout(() => {
      el.classList.add("is-out");
      setTimeout(() => el.remove(), 320);
    }, 2200);
  }

  /* =========================================================
     7. SCROLL REVEAL
     ========================================================= */
  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    els.forEach(el => io.observe(el));
  }

  /* =========================================================
     8. FOOTER & PROFIL LINK
     ========================================================= */
  function initProfileLinks() {
    const s = PROFILE.sosial || {};
    const set = (id, href, text) => {
      const el = $(id);
      if (!el) return;
      if (href) el.setAttribute("href", href);
      if (text) el.textContent = text;
    };
    set("#footInstagram", s.instagram);
    set("#footTiktok", s.tiktok);
    set("#footWhatsapp", s.whatsapp);
    set("#footEmail", s.email ? `mailto:${s.email}` : "#");

    // Halaman profil
    const profNama = $("#profNama");
    if (profNama) profNama.textContent = PROFILE.nama;
    const profTag = $("#profTagline");
    if (profTag) profTag.textContent = PROFILE.tagline;
    const profDesc = $("#profDeskripsi");
    if (profDesc) profDesc.textContent = PROFILE.deskripsi;
    const profWa = $("#profWhatsapp");
    if (profWa && s.whatsapp) profWa.setAttribute("href", s.whatsapp);

    const contactGrid = $("#contactGrid");
    if (contactGrid && Array.isArray(PROFILE.kontak)) {
      contactGrid.innerHTML = PROFILE.kontak.map(c => `
        <a class="contact-item" href="${escapeHtml(c.url || "#")}" target="_blank" rel="noopener">
          <span class="contact-item__icon">${c.icon || "🔗"}</span>
          <span>
            <span class="contact-item__label">${escapeHtml(c.label)}</span><br>
            <span class="contact-item__value">${escapeHtml(c.value)}</span>
          </span>
        </a>`).join("");
    }
  }

  /* =========================================================
     9. FILTER & SORTIR (HALAMAN KATALOG)
     ========================================================= */
  function buildCategoryChips() {
    const wrap = $("#categoryFilter");
    if (!wrap) return;

    wrap.innerHTML = CATEGORIES.map(c => `
      <button class="chip ${c.name === "Semua" ? "is-active" : ""}"
              data-cat="${escapeHtml(c.name)}" role="tab">
        ${escapeHtml(c.name)}
      </button>`).join("");

    wrap.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", wrap).forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      state.category = chip.dataset.cat;
      state.page = 1;
      applyFilters();
    });
  }

  function applyFilters() {
    let list = state.products.slice();

    // Favorit saja
    if (state.favOnly) {
      const favs = getFavorites();
      list = list.filter(p => favs.includes(String(p.id)));
    }

    // Kategori
    if (state.category && state.category !== "Semua") {
      const cat = state.category.toLowerCase();
      list = list.filter(p => (p.category || "").toLowerCase() === cat);
    }

    // Badge
    if (state.badgeFilter) {
      list = list.filter(p => (p.badge || "").toUpperCase() === state.badgeFilter);
    }

    // Pencarian
    if (state.query) {
      const q = state.query;
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      );
    }

    // Sortir
    switch (state.sort) {
      case "price-asc":
        list.sort((a, b) => (+a.price || 0) - (+b.price || 0)); break;
      case "price-desc":
        list.sort((a, b) => (+b.price || 0) - (+a.price || 0)); break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name, "id")); break;
      case "newest":
        list.reverse(); break;
      default: break;
    }

    state.filtered = list;
    renderCatalogPage();
  }

  function renderCatalogPage() {
    const grid = $("#productGrid");
    if (!grid) return;

    const total = state.filtered.length;
    const shown = Math.min(state.page * CONFIG.PER_PAGE, total);
    const visible = state.filtered.slice(0, shown);

    const empty = $("#emptyState");
    const loadWrap = $("#loadMoreWrap");
    const resultCount = $("#resultCount");
    const resetBtn = $("#resetFilter");

    if (resultCount) {
      resultCount.innerHTML = total
        ? `Menampilkan <strong>${visible.length}</strong> dari <strong>${total}</strong> produk`
        : "";
    }

    if (total === 0) {
      grid.innerHTML = "";
      if (empty) empty.hidden = false;
      if (loadWrap) loadWrap.hidden = true;
    } else {
      if (empty) empty.hidden = true;
      grid.innerHTML = visible.map(cardHTML).join("");
      if (loadWrap) loadWrap.hidden = shown >= total;
    }

    // Tombol reset
    const isFiltered =
      state.category !== "Semua" || state.query || state.badgeFilter || state.favOnly;
    if (resetBtn) resetBtn.hidden = !isFiltered;
  }

  function initCatalogControls() {
    const sortSelect = $("#sortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        state.page = 1;
        applyFilters();
      });
    }

    const loadMore = $("#loadMore");
    if (loadMore) {
      loadMore.addEventListener("click", () => {
        state.page++;
        renderCatalogPage();
      });
    }

    const reset = () => {
      state.query = "";
      state.category = "Semua";
      state.sort = "default";
      state.badgeFilter = "";
      state.favOnly = false;
      state.page = 1;

      const input = $("#searchInput");
      if (input) {
        input.value = "";
        input.closest(".search")?.classList.remove("has-value");
      }
      const sel = $("#sortSelect");
      if (sel) sel.value = "default";

      $$("#categoryFilter .chip").forEach(c =>
        c.classList.toggle("is-active", c.dataset.cat === "Semua")
      );

      // Bersihkan URL
      if (window.history.replaceState) {
        window.history.replaceState({}, "", "products.html");
      }

      applyFilters();
    };

    $("#resetFilter")?.addEventListener("click", reset);
    $("#emptyReset")?.addEventListener("click", reset);
  }

  function readURLParams() {
    const params = new URLSearchParams(window.location.search);

    const q = params.get("q");
    if (q) {
      state.query = q.toLowerCase();
      const input = $("#searchInput");
      if (input) {
        input.value = q;
        input.closest(".search")?.classList.add("has-value");
      }
    }

    const cat = params.get("cat");
    if (cat) state.category = cat;

    const badge = params.get("badge");
    if (badge) state.badgeFilter = badge.toUpperCase();

    const filter = params.get("filter");
    if (filter === "favorit") state.favOnly = true;
  }

  /* =========================================================
     10. HALAMAN HOME
     ========================================================= */
  function renderCategoriesHome() {
    const grid = $("#kategoriGrid");
    if (!grid) return;

    const counts = {};
    state.products.forEach(p => {
      const c = p.category || "Lainnya";
      counts[c] = (counts[c] || 0) + 1;
    });

    const list = CATEGORIES.filter(c => c.name !== "Semua");

    grid.innerHTML = list.map(c => `
      <a class="cat-card reveal" href="products.html?cat=${encodeURIComponent(c.name)}">
        <span class="cat-card__icon">${c.icon}</span>
        <span class="cat-card__name">${escapeHtml(c.name)}</span>
        <span class="cat-card__count">${counts[c.name] || 0} produk</span>
      </a>`).join("");
  }

  function renderHome() {
    const all = state.products;

    // Terlaris
    let terlaris = all.filter(p => p.badge === "TERLARIS");
    if (terlaris.length < 4) {
      terlaris = terlaris.concat(
        all.filter(p => p.badge !== "TERLARIS")
      );
    }
    renderInto($("#terlarisGrid"), terlaris.slice(0, 8));

    // Rekomendasi (acak stabil)
    const shuffled = all
      .map(p => ({ p, k: hashString(p.id) }))
      .sort((a, b) => a.k - b.k)
      .map(x => x.p);
    renderInto($("#rekomendasiGrid"), shuffled.slice(0, 4));

    // Terbaru
    const terbaru = all.slice().reverse();
    renderInto($("#terbaruGrid"), terbaru.slice(0, 4));

    // Statistik
    const statProduk = $("#statProduk");
    if (statProduk) statProduk.textContent = all.length + "+";
    const statKategori = $("#statKategori");
    if (statKategori) {
      const uniq = new Set(all.map(p => p.category));
      statKategori.textContent = uniq.size;
    }
  }

  function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  /* =========================================================
     11. INIT
     ========================================================= */
  async function init() {
    initTheme();
    initHeader();
    initSearch();
    initFavorites();
    initProfileLinks();
    initCatalogControls();

    const isHome = !!$("#terlarisGrid");
    const isCatalog = !!$("#productGrid");

    // Skeleton awal
    if (isHome) {
      renderInto($("#terlarisGrid"), [], { skeleton: true, count: 4 });
      renderInto($("#rekomendasiGrid"), [], { skeleton: true, count: 4 });
      renderInto($("#terbaruGrid"), [], { skeleton: true, count: 4 });
    }
    if (isCatalog) {
      renderInto($("#productGrid"), [], { skeleton: true, count: 8 });
      const rc = $("#resultCount");
      if (rc) rc.textContent = "Memuat produk...";
    }

    // Ambil data
    state.products = await getProducts();

    if (isCatalog) {
      buildCategoryChips();
      readURLParams();

      // Sinkronkan chip kategori dengan URL
      if (state.category && state.category !== "Semua") {
        $$("#categoryFilter .chip").forEach(c =>
          c.classList.toggle("is-active", c.dataset.cat === state.category)
        );
      }

      applyFilters();
    }

    if (isHome) {
      renderCategoriesHome();
      renderHome();
    }

    initReveal();
  }

  // Jalankan
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose untuk debugging
  window.NAVERO_APP = { state, toast, applyFilters };
})();