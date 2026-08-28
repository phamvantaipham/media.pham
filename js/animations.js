/* ============================================
   JEXA MEDIA — Animation Engine
   ============================================ */

// ----- Scroll Reveal -----
class ScrollReveal {
  constructor() {
    this.elements = [];
    this.observer = null;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve after reveal for performance
          if (!entry.target.dataset.revealRepeat) {
            this.observer.unobserve(entry.target);
          }
        } else if (entry.target.dataset.revealRepeat) {
          entry.target.classList.remove('revealed');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    this.observe();
  }

  observe() {
    document.querySelectorAll('.reveal, .text-reveal, .split-text, .image-reveal, .clip-reveal, .line-reveal').forEach(el => {
      this.observer.observe(el);
    });
  }

  // Re-observe new elements (for dynamically added content)
  refresh() {
    this.observe();
  }
}

// ----- Counter Animation -----
class CounterAnimation {
  constructor() {
    this.counters = [];
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-counter]').forEach(el => {
      observer.observe(el);
    });
  }

  animateCounter(el) {
    const target = parseInt(el.dataset.counter);
    const duration = parseInt(el.dataset.counterDuration) || 2000;
    const suffix = el.dataset.counterSuffix || '';
    const prefix = el.dataset.counterPrefix || '';
    const start = 0;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(start + (target - start) * easedProgress);

      el.textContent = prefix + this.formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + this.formatNumber(target) + suffix;
      }
    };

    requestAnimationFrame(update);
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  }
}

// ----- Text Split Animation -----
class TextSplitter {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.split-text').forEach(el => {
      if (!el.dataset.split) {
        this.splitWords(el);
        el.dataset.split = 'true';
      }
    });
  }

  splitWords(el) {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map(word =>
      `<span class="word"><span class="word-inner">${word}</span></span>`
    ).join(' ');
  }
}

// ----- Parallax -----
class ParallaxEngine {
  constructor() {
    this.elements = [];
    this.ticking = false;
    this.init();
  }

  init() {
    document.querySelectorAll('.parallax').forEach(el => {
      this.elements.push({
        el,
        speed: parseFloat(el.dataset.parallaxSpeed) || 0.1
      });
    });

    if (this.elements.length > 0) {
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    }
  }

  onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  update() {
    const scrollY = window.pageYOffset;

    this.elements.forEach(({ el, speed }) => {
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (centerY - viewCenter) * speed;

      el.style.transform = `translateY(${offset}px)`;
    });
  }
}

// ----- Magnetic Button -----
class MagneticButton {
  constructor() {
    this.init();
  }

  init() {
    // Only on desktop with pointer
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
        const btn = wrap.querySelector('.btn') || wrap.firstElementChild;
        if (!btn) return;

        wrap.addEventListener('mousemove', (e) => {
          const rect = wrap.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        wrap.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0, 0)';
          btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          setTimeout(() => {
            btn.style.transition = '';
          }, 400);
        });
      });
    }
  }
}

// ----- Custom Cursor -----
class CustomCursor {
  constructor() {
    this.cursor = null;
    this.init();
  }

  init() {
    // Only on desktop
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    this.cursor = document.querySelector('.custom-cursor');
    if (!this.cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor follow
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      this.cursor.style.left = cursorX + 'px';
      this.cursor.style.top = cursorY + 'px';

      requestAnimationFrame(animate);
    };
    animate();

    // Hover states
    document.querySelectorAll('a, button, .project-card, .blog-card, .service-card, .team-card').forEach(el => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove('active'));
    });
  }
}

// ----- Smooth Number Formatting -----
function formatStatNumber(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return Math.floor(value / 1000) + 'K';
  return value;
}

// ----- Initialize All Animations -----
function initAnimations() {
  window.scrollReveal = new ScrollReveal();
  window.counterAnimation = new CounterAnimation();
  window.textSplitter = new TextSplitter();
  window.parallaxEngine = new ParallaxEngine();
  window.magneticButton = new MagneticButton();
  window.customCursor = new CustomCursor();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAnimations);
