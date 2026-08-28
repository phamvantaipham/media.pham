/* ============================================
   JEXA MEDIA — Core Application Logic
   ============================================ */

// ----- DOM Ready Helper -----
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// ----- Header / Navigation -----
class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.isMenuOpen = false;
    this.lastScrollY = 0;
    this.init();
  }

  init() {
    if (!this.header) return;

    // Scroll detection
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu on link click
    document.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
        window.searchOverlay?.close();
      }
    });

    // Initial check
    this.onScroll();
  }

  onScroll() {
    const scrollY = window.pageYOffset;

    // Add scrolled class
    if (scrollY > 50) {
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--scrolled');
    }

    this.lastScrollY = scrollY;
  }

  toggleMenu() {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.isMenuOpen = true;
    this.header.classList.add('menu-open');
    this.mobileNav?.classList.add('open');
    document.body.classList.add('menu-open');
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.header.classList.remove('menu-open');
    this.mobileNav?.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
}

// ----- Search Overlay -----
class SearchOverlay {
  constructor() {
    this.overlay = document.querySelector('.search-overlay');
    this.input = document.querySelector('.search-overlay__input');
    this.resultsContainer = document.querySelector('.search-overlay__results');
    this.isOpen = false;

    // Searchable content
    this.searchData = [
      // Projects
      { title: 'TVC Thương Hiệu Aurora', titleEn: 'Aurora Brand TVC', category: 'projects', desc: 'Brand film cho thương hiệu thời trang', descEn: 'Brand film for fashion brand' },
      { title: 'Chiến Dịch Social Media Vivo', titleEn: 'Vivo Social Media Campaign', category: 'projects', desc: 'Chiến dịch social media ra mắt sản phẩm', descEn: 'Product launch social media campaign' },
      { title: 'Short Video Series — FoodPanda', titleEn: 'Short Video Series — FoodPanda', category: 'projects', desc: 'Chuỗi video ngắn cho nền tảng TikTok', descEn: 'Short video series for TikTok platform' },
      { title: 'Rebranding NovaTech', titleEn: 'NovaTech Rebranding', category: 'projects', desc: 'Tái định vị thương hiệu công nghệ', descEn: 'Tech brand repositioning' },
      { title: 'Wedding Film — Minh & Anh', titleEn: 'Wedding Film — Minh & Anh', category: 'projects', desc: 'Phim cưới cinematic', descEn: 'Cinematic wedding film' },
      { title: 'Event Highlight — Tech Summit 2024', titleEn: 'Event Highlight — Tech Summit 2024', category: 'projects', desc: 'Video recap sự kiện công nghệ', descEn: 'Tech event recap video' },

      // Services
      { title: 'TVC & Brand Film', titleEn: 'TVC & Brand Film', category: 'services', desc: 'Sản xuất TVC quảng cáo và brand film', descEn: 'TVC advertising and brand film production' },
      { title: 'Short Video', titleEn: 'Short Video', category: 'services', desc: 'Sản xuất nội dung short-form', descEn: 'Short-form content production' },
      { title: 'Digital Ads', titleEn: 'Digital Ads', category: 'services', desc: 'Quảng cáo Facebook, Google, TikTok', descEn: 'Facebook, Google, TikTok advertising' },
      { title: 'Website', titleEn: 'Website', category: 'services', desc: 'Thiết kế và phát triển website', descEn: 'Website design and development' },
      { title: 'Social Seeding', titleEn: 'Social Seeding', category: 'services', desc: 'Giải pháp social seeding', descEn: 'Social seeding solutions' },
      { title: 'Event & Story', titleEn: 'Event & Story', category: 'services', desc: 'Sản xuất video event và story', descEn: 'Event and story video production' },

      // Blog
      { title: '5 Xu Hướng Video Marketing 2024', titleEn: '5 Video Marketing Trends 2024', category: 'blog', desc: 'Những xu hướng video marketing nổi bật', descEn: 'Top video marketing trends' },
      { title: 'Cách Xây Dựng Thương Hiệu Cá Nhân', titleEn: 'How to Build a Personal Brand', category: 'blog', desc: 'Chiến lược xây dựng thương hiệu cá nhân', descEn: 'Personal brand building strategies' },
      { title: 'TikTok Marketing: Hướng Dẫn Toàn Diện', titleEn: 'TikTok Marketing: Complete Guide', category: 'blog', desc: 'Mọi thứ cần biết về TikTok marketing', descEn: 'Everything about TikTok marketing' },

      // Resources
      { title: 'Social Media Guide 2024', titleEn: 'Social Media Guide 2024', category: 'resources', desc: 'Hướng dẫn toàn diện về social media', descEn: 'Comprehensive social media guide' },
      { title: 'Marketing Checklist', titleEn: 'Marketing Checklist', category: 'resources', desc: 'Checklist cho chiến dịch marketing', descEn: 'Marketing campaign checklist' },
      { title: 'Video Production Toolkit', titleEn: 'Video Production Toolkit', category: 'resources', desc: 'Bộ công cụ sản xuất video', descEn: 'Video production toolkit' },
    ];

    this.init();
  }

  init() {
    if (!this.overlay) return;

    // Toggle buttons
    document.querySelectorAll('.search-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });

    // Close button
    document.querySelector('.search-overlay__close')?.addEventListener('click', () => this.close());

    // Input handling
    if (this.input) {
      this.input.addEventListener('input', () => this.search(this.input.value));
    }

    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.overlay.classList.add('open');
    document.body.classList.add('search-open');
    setTimeout(() => this.input?.focus(), 300);
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('open');
    document.body.classList.remove('search-open');
    if (this.input) this.input.value = '';
    if (this.resultsContainer) this.resultsContainer.innerHTML = '';
  }

  search(query) {
    if (!query || query.length < 2) {
      if (this.resultsContainer) this.resultsContainer.innerHTML = '';
      return;
    }

    const lang = window.i18n?.getLang() || 'vi';
    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const results = this.searchData.filter(item => {
      const title = (lang === 'en' ? item.titleEn : item.title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const desc = (lang === 'en' ? item.descEn : item.desc).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return title.includes(normalizedQuery) || desc.includes(normalizedQuery);
    });

    this.renderResults(results, lang);
  }

  renderResults(results, lang) {
    if (!this.resultsContainer) return;

    if (results.length === 0) {
      const noResultText = window.i18n?.t('search.no_results') || 'No results found.';
      this.resultsContainer.innerHTML = `<p style="color: var(--color-gray-500); text-align: center; padding: 2rem 0;">${noResultText}</p>`;
      return;
    }

    // Group by category
    const grouped = {};
    results.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    const categoryLabels = {
      projects: window.i18n?.t('search.category.projects') || 'Projects',
      services: window.i18n?.t('search.category.services') || 'Services',
      blog: window.i18n?.t('search.category.blog') || 'Blog',
      resources: window.i18n?.t('search.category.resources') || 'Resources',
    };

    let html = '';
    for (const [category, items] of Object.entries(grouped)) {
      html += `<div class="search-results__category">`;
      html += `<div class="search-results__category-title">${categoryLabels[category] || category}</div>`;
      items.forEach(item => {
        const title = lang === 'en' ? item.titleEn : item.title;
        const desc = lang === 'en' ? item.descEn : item.desc;
        html += `
          <a href="#" class="search-results__item">
            <div class="search-results__item-title">${title}</div>
            <div class="search-results__item-desc">${desc}</div>
          </a>`;
      });
      html += `</div>`;
    }

    this.resultsContainer.innerHTML = html;
  }
}

// ----- Lazy Loading -----
class LazyLoader {
  constructor() {
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.src) {
            el.src = el.dataset.src;
            el.removeAttribute('data-src');
          }
          if (el.dataset.bgSrc) {
            el.style.backgroundImage = `url(${el.dataset.bgSrc})`;
            el.removeAttribute('data-bg-src');
          }
          el.classList.add('loaded');
          observer.unobserve(el);
        }
      });
    }, {
      rootMargin: '200px'
    });

    document.querySelectorAll('[data-src], [data-bg-src]').forEach(el => {
      observer.observe(el);
    });
  }
}

// ----- Back To Top -----
class BackToTop {
  constructor() {
    this.btn = document.querySelector('.back-to-top');
    this.init();
  }

  init() {
    if (!this.btn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        this.btn.classList.add('visible');
      } else {
        this.btn.classList.remove('visible');
      }
    }, { passive: true });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ----- Page Loader -----
class PageLoader {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.progress = document.querySelector('.loader__progress');
    this.init();
  }

  init() {
    if (!this.loader) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      if (this.progress) {
        this.progress.style.width = progress + '%';
      }
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => this.hide(), 300);
      }
    }, 200);

    // Fallback: hide after 3s max
    setTimeout(() => this.hide(), 3000);
  }

  hide() {
    if (this.loader) {
      this.loader.classList.add('loaded');
    }
  }
}

// ----- Smooth Scroll for Anchor Links -----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ----- Active Nav Link -----
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ----- Form Handling -----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e74c3c';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (valid) {
      // Simulate form submission
      const submitBtn = form.querySelector('.btn--primary');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = window.i18n?.t('loading') || 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert(window.i18n?.getLang() === 'en'
          ? 'Thank you! We will contact you shortly.'
          : 'Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    }
  });
}

// ----- Filter System -----
function initFilters() {
  document.querySelectorAll('.filter-tabs').forEach(tabsContainer => {
    const tabs = tabsContainer.querySelectorAll('.filter-tab');
    const targetGrid = document.querySelector(tabsContainer.dataset.target);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        if (targetGrid) {
          const items = targetGrid.children;
          Array.from(items).forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
              item.style.display = '';
              item.style.animation = 'fadeInUp 0.5s ease-out forwards';
            } else {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

// ----- Phone Modal -----
class PhoneModal {
  constructor() {
    this.phoneBtns = document.querySelectorAll('.floating-btn--phone');
    if (this.phoneBtns.length === 0) return;
    this.init();
  }

  init() {
    const modalHTML = `
      <div class="phone-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s ease;">
        <div class="phone-modal__content" style="background: var(--color-background); padding: 40px; border-radius: 16px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.9); transition: transform 0.3s ease; position: relative;">
          <button class="phone-modal__close" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: var(--color-text-light);">&times;</button>
          <div style="font-size: 18px; margin-bottom: 10px; color: var(--color-text-light);">Hotline (Trung Hiếu Media)</div>
          <div style="font-size: 48px; font-weight: 700; color: var(--color-primary); margin-bottom: 20px; letter-spacing: 2px; white-space: nowrap;">085 996 4008</div>
          <a href="tel:0859964008" class="btn btn--primary" style="display: inline-flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
            Gọi Ngay
          </a>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.querySelector('.phone-modal');
    this.modalContent = document.querySelector('.phone-modal__content');
    this.closeBtn = document.querySelector('.phone-modal__close');

    this.phoneBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    this.closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  open() {
    this.modal.style.display = 'flex';
    this.modal.offsetHeight; // trigger reflow
    this.modal.style.opacity = '1';
    this.modalContent.style.transform = 'scale(1)';
  }

  close() {
    this.modal.style.opacity = '0';
    this.modalContent.style.transform = 'scale(0.9)';
    setTimeout(() => {
      this.modal.style.display = 'none';
    }, 300);
  }
}

// ----- Initialize Everything -----
ready(() => {
  window.headerInstance = new Header();
  window.searchOverlay = new SearchOverlay();
  window.lazyLoader = new LazyLoader();
  window.backToTop = new BackToTop();
  window.pageLoader = new PageLoader();
  window.phoneModal = new PhoneModal();

  initSmoothScroll();
  setActiveNavLink();
  initContactForm();
  initFilters();

  // Initialize i18n
  window.i18n?.init();
});
