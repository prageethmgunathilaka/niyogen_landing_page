/* =========================
 Footer Contact Modal Animation
=========================== */

class FooterContactModal {
  constructor() {
    this.overlay = null;
    this.content = null;
    this.triggers = [];
    this.closeBtns = [];
    this.isModalOpen = false;
  }

  init() {
    this.cacheElements();
    if (this.overlay && this.content && this.triggers.length > 0) {
      this.bindEvents();
      this.setInitialState();
    }
  }

  cacheElements() {
    this.overlay = document.querySelector('.footer-contact-modal');
    this.content = document.querySelector('.footer-contact-content');
    this.triggers = document.querySelectorAll('.footer-contact-trigger');
    this.closeBtns = document.querySelectorAll('.footer-contact-close');
  }

  setInitialState() {
    if (typeof gsap !== 'undefined') {
      gsap.set(this.overlay, { display: 'none', opacity: 0 });
      gsap.set(this.content, { scale: 0.8, opacity: 0 });
    } else {
      this.overlay.style.display = 'none';
      this.overlay.style.opacity = '0';
    }
  }

  bindEvents() {
    // Open modal
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    // Close modal buttons
    this.closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.closeModal());
    });

    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.closeModal();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    });
  }

  openModal() {
    if (this.isModalOpen || !this.overlay) return;

    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';

    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();
      
      tl.set(this.overlay, { display: 'grid' })
        .to(this.overlay, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
        .to(this.content, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        }, '-=0.2');
    } else {
      // Fallback without GSAP
      this.overlay.style.display = 'grid';
      this.overlay.style.opacity = '1';
      this.content.style.transform = 'scale(1)';
      this.content.style.opacity = '1';
    }
  }

  closeModal() {
    if (!this.isModalOpen || !this.overlay) return;

    this.isModalOpen = false;
    document.body.style.overflow = '';

    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();
      
      tl.to(this.content, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to(this.overlay, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in'
        }, '-=0.1')
        .set(this.overlay, { display: 'none' });
    } else {
      // Fallback without GSAP
      this.overlay.style.display = 'none';
      this.overlay.style.opacity = '0';
      this.content.style.transform = 'scale(0.8)';
      this.content.style.opacity = '0';
    }
  }
}

// Initialize
const footerContactModal = new FooterContactModal();

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      footerContactModal.init();
    });
  } else {
    footerContactModal.init();
  }
}

