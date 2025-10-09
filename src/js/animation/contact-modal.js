/* =========================
Contact Modal animation js 
=========================== */

class ContactModalAnimation {
  constructor() {
    this.modalTrigger = null;
    this.modalOverlay = null;
    this.modalCloseBtn = null;
    this.modalCloseBtnSecondary = null;
    this.modalContent = null;
    this.isModalOpen = false;

    this.animationConfig = {
      open: {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      close: {
        opacity: 0,
        y: -50,
        duration: 0.2,
        ease: 'power2.in',
      },
    };
  }

  init() {
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.modalTrigger = document.querySelector('.contact-modal-trigger');
    this.modalOverlay = document.querySelector('.contact-modal-overlay');
    this.modalCloseBtn = document.querySelector('.contact-modal-close-btn');
    this.modalCloseBtnSecondary = document.querySelector('.contact-modal-close-btn-secondary');
    this.modalContent = document.querySelector('.contact-modal-content');
  }

  bindEvents() {
    this.modalTrigger?.addEventListener('click', () => this.openModal());
    this.modalCloseBtn?.addEventListener('click', () => this.closeModal());
    this.modalCloseBtnSecondary?.addEventListener('click', () => this.closeModal());
    this.modalOverlay?.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    });
  }

  async closeModal() {
    if (!this.isModalOpen || !this.modalOverlay) return;

    try {
      // Animate modal content closing
      if (this.modalContent) {
        await gsap.to(this.modalContent, this.animationConfig.close);
      }

      // Hide modal overlay
      this.modalOverlay.classList.remove('modal-open');
      this.modalOverlay.classList.add('modal-close');

      // Re-enable scrolling
      document.body.style.overflow = '';
      this.isModalOpen = false;
    } catch (error) {
      console.error('Error closing contact modal:', error);
    }
  }

  openModal() {
    if (this.isModalOpen || !this.modalOverlay) return;

    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';

    this.modalOverlay.classList.remove('modal-close');
    this.modalOverlay.classList.add('modal-open');

    if (this.modalContent) {
      // Set initial state for opening animation
      gsap.set(this.modalContent, {
        opacity: 0,
        y: -50,
      });

      gsap.to(this.modalContent, this.animationConfig.open);
    }
  }
}

const contactModalAnimation = new ContactModalAnimation();

if (typeof window !== 'undefined') {
  // Wait for DOM to be ready before initializing
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      contactModalAnimation.init();
    });
  } else {
    contactModalAnimation.init();
  }
}

