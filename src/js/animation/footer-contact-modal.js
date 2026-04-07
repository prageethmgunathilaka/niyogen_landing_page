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

    // Form elements
    this.form = document.getElementById('demo-request-form');
    this.successMessage = document.getElementById('demo-success-message');
    this.submitBtn = document.getElementById('demo-submit-btn');
    this.submitText = document.getElementById('demo-submit-text');
    this.submitSpinner = document.getElementById('demo-submit-spinner');
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

    // Handle form submission
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
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(this.successMessage, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)"});
          }
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

    const resetFormState = () => {
      if (this.form) {
        this.form.reset();
        this.form.classList.remove('hidden');
      }
      if (this.successMessage) {
        this.successMessage.classList.add('hidden');
      }
      this.resetSubmitButton();
    };

    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ onComplete: resetFormState });
      
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
      setTimeout(resetFormState, 300);
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

