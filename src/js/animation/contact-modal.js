/* =========================
Contact Modal animation & form handling js 
=========================== */

class ContactModalAnimation {
  constructor() {
    this.modalTrigger = null;
    this.modalOverlay = null;
    this.modalCloseBtn = null;
    this.modalCloseBtnSecondary = null;
    this.modalContent = null;
    this.isModalOpen = false;

    // Form Elements
    this.form = null;
    this.successMessage = null;
    this.submitBtn = null;
    this.submitText = null;
    this.submitSpinner = null;

    this.animationConfig = {
      open: { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
      close: { opacity: 0, y: -50, duration: 0.2, ease: 'power2.in' },
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

    this.form = document.getElementById('demo-request-form');
    this.successMessage = document.getElementById('demo-success-message');
    this.submitBtn = document.getElementById('demo-submit-btn');
    this.submitText = document.getElementById('demo-submit-text');
    this.submitSpinner = document.getElementById('demo-submit-spinner');
  }

  bindEvents() {
    this.modalTrigger?.addEventListener('click', () => this.openModal());
    this.modalCloseBtn?.addEventListener('click', () => this.closeModal());
    this.modalCloseBtnSecondary?.addEventListener('click', () => this.closeModal());
    this.modalOverlay?.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) this.closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) this.closeModal();
    });

    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.form || !this.submitBtn) return;

    // Collect Data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // UI Loading State
    this.submitBtn.disabled = true;
    this.submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
    if (this.submitText) this.submitText.textContent = 'Sending...';
    if (this.submitSpinner) this.submitSpinner.classList.remove('hidden');

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        // Show Success Message
        this.form.classList.add('hidden');
        if (this.successMessage) {
          this.successMessage.classList.remove('hidden');
          gsap.fromTo(this.successMessage, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)"});
        }
      } else {
        alert(result.message || 'Something went wrong. Please try again.');
        this.resetSubmitButton();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again later.');
      this.resetSubmitButton();
    }
  }

  resetSubmitButton() {
    if (!this.submitBtn) return;
    this.submitBtn.disabled = false;
    this.submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
    if (this.submitText) this.submitText.textContent = 'Request Demo';
    if (this.submitSpinner) this.submitSpinner.classList.add('hidden');
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

      // Reset form on close after a slight delay
      setTimeout(() => {
        if (this.form) {
          this.form.reset();
          this.form.classList.remove('hidden');
        }
        if (this.successMessage) {
          this.successMessage.classList.add('hidden');
        }
        this.resetSubmitButton();
      }, 300);

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
      gsap.set(this.modalContent, { opacity: 0, y: -50 });
      gsap.to(this.modalContent, this.animationConfig.open);
    }
  }
}

const contactModalAnimation = new ContactModalAnimation();

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => contactModalAnimation.init());
  } else {
    contactModalAnimation.init();
  }
}

