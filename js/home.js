/* ============================================
   JEXA MEDIA — Homepage Interactions
   ============================================ */

// ----- Hero Video Sequence -----
class HeroVideoSequence {
  constructor() {
    this.frames = document.querySelectorAll('.hero__video-frame');
    this.currentIndex = 0;
    this.init();
  }

  init() {
    if (this.frames.length === 0) return;

    // Start video sequence immediately
    this.playSequence();
  }

  playSequence() {
    const frameDuration = 4000; // 4 seconds per frame
    const transitionDuration = 1200; // 1.2 seconds crossfade

    const showFrame = (index) => {
      // Hide all
      this.frames.forEach(f => f.classList.remove('active'));
      
      // Show current
      this.frames[index].classList.add('active');

      // Go to next after duration
      setTimeout(() => {
        let nextIndex = index + 1;
        // Loop back to start if at the end
        if (nextIndex >= this.frames.length) {
          nextIndex = 0;
        }
        showFrame(nextIndex);
      }, frameDuration);
    };

    // Initialize first frame
    showFrame(0);
  }
}

// ----- Marquee -----
class InfiniteMarquee {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.marquee__track').forEach(track => {
      // Clone items for infinite scroll
      const items = track.innerHTML;
      track.innerHTML = items + items;
    });
  }
}

// ----- Project Hover Effects -----
class ProjectHover {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.project-card').forEach(card => {
      const overlay = card.querySelector('.project-card__overlay');

      card.addEventListener('mouseenter', () => {
        if (overlay) {
          overlay.style.opacity = '1';
          overlay.style.transform = 'translateY(0)';
        }
      });

      card.addEventListener('mouseleave', () => {
        if (overlay) {
          overlay.style.opacity = '0';
          overlay.style.transform = 'translateY(20px)';
        }
      });
    });
  }
}

// ----- Hero Scroll Effect -----
class HeroScrollEffect {
  constructor() {
    this.hero = document.querySelector('.hero');
    this.content = document.querySelector('.hero__content');
    this.ticking = false;
    this.init();
  }

  init() {
    if (!this.hero || !this.content) return;

    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.update();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  }

  update() {
    const scrollY = window.pageYOffset;
    const heroHeight = this.hero.offsetHeight;

    if (scrollY < heroHeight) {
      const progress = scrollY / heroHeight;
      this.content.style.opacity = 1 - progress * 1.5;
      this.content.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  }
}

// ----- Horizontal Scroll Section -----
class HorizontalScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.horizontal-scroll').forEach(section => {
      const track = section.querySelector('.horizontal-scroll__track');
      if (!track) return;

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', () => {
              const rect = section.getBoundingClientRect();
              const scrollProgress = -rect.top / (rect.height - window.innerHeight);
              const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
              const trackWidth = track.scrollWidth - section.offsetWidth;
              track.style.transform = `translateX(-${clampedProgress * trackWidth}px)`;
            }, { passive: true });
          }
        });
      });

      observer.observe(section);
    });
  }
}

// ----- Typewriter Effect -----
class TypewriterEffect {
  constructor(element, texts, speed = 80, pause = 2000) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.pause = pause;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;

    if (this.element) {
      this.type();
    }
  }

  type() {
    const currentText = this.texts[this.currentTextIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      typeSpeed = this.pause;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ----- Initialize Homepage -----
function initHomepage() {
  // Only run on homepage
  if (!document.querySelector('.hero')) return;

  window.heroSequence = new HeroVideoSequence();
  window.marquee = new InfiniteMarquee();
  window.projectHover = new ProjectHover();
  window.heroScroll = new HeroScrollEffect();
}

document.addEventListener('DOMContentLoaded', initHomepage);
