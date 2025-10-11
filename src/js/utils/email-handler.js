// Email Handler for Contact Forms
// ================================

// EmailJS Configuration
// IMPORTANT: You need to set up EmailJS and replace these values
// See EMAILJS_SETUP.md for detailed instructions
const EMAILJS_SERVICE_ID = 'service_4rg5d3a'; // Your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_mych6qk'; // Your actual template ID
const EMAILJS_PUBLIC_KEY = 'lab07QQNToM0JnxNA'; // Your actual public key

// Email addresses
const PRIMARY_EMAIL = 'itranga@gmail.com';
const CC_EMAIL = 'api@niyogen.com';

// Initialize EmailJS
(function() {
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
        // Initialize EmailJS with your public key
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

class EmailHandler {
    constructor() {
        this.modalForm = document.querySelector('[data-contact-form="modal"]');
        this.initForms();
    }

    initForms() {
        if (this.modalForm) {
            this.modalForm.addEventListener('submit', (e) => this.handleFormSubmit(e, 'modal'));
        }
    }

    async handleFormSubmit(event, formType) {
        event.preventDefault();
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;

        this.setLoadingState(submitButton, true);

        const formData = {
            fullName: form.querySelector('[name="fullName"]')?.value,
            email: form.querySelector('[name="emailAddress"]')?.value,
            message: form.querySelector('[name="message"]')?.value,
            subject: form.querySelector('[name="subject"]')?.value || 'Contact Form - NiyoGen Website',
            type: formType
        };

        if (!this.validateForm(formData)) {
            this.setLoadingState(submitButton, false, originalButtonText);
            return;
        }

        try {
            const response = await this.sendEmail(formData);
            if (response) {
                this.showMessage('success', 'Message sent successfully! We\'ll get back to you soon.');
                form.reset();
                // Close modal if it's the modal form
                if (formType === 'modal') {
                    const modalOverlay = form.closest('.contact-modal-overlay');
                    if (modalOverlay) {
                        modalOverlay.classList.add('modal-close');
                        modalOverlay.classList.remove('modal-open');
                        document.body.classList.remove('overflow-hidden');
                    }
                }
            }
        } catch (error) {
            console.error('Error sending email:', error);
            this.showMessage('error', 'Failed to send message. Please try again later.');
        } finally {
            this.setLoadingState(submitButton, false, originalButtonText);
        }
    }

    validateForm(formData) {
        if (!formData.fullName || !formData.email || !formData.message) {
            this.showMessage('error', 'Please fill in all required fields.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            this.showMessage('error', 'Please enter a valid email address.');
            return false;
        }
        return true;
    }

    async sendEmail(formData) {
        // Check if EmailJS is properly configured
        if (EMAILJS_PUBLIC_KEY === 'your_public_key_here' || 
            EMAILJS_SERVICE_ID === 'service_niyogen' || 
            EMAILJS_TEMPLATE_ID === 'template_contact') {
            // Fallback to mailto link
            this.sendEmailFallback(formData);
            return;
        }

        try {
            // Prepare email template parameters
            const templateParams = {
                to_email: PRIMARY_EMAIL,
                cc_email: CC_EMAIL,
                from_name: formData.fullName,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                form_type: formData.type,
                reply_to: formData.email
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            if (response.status !== 200) {
                throw new Error('Failed to send email');
            }

            return response;
        } catch (error) {
            console.warn('EmailJS failed, using fallback:', error);
            this.sendEmailFallback(formData);
        }
    }

    sendEmailFallback(formData) {
        // Create mailto link as fallback
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(`
Name: ${formData.fullName}
Email: ${formData.email}
Subject: ${formData.subject}
Form Type: ${formData.type}

Message:
${formData.message}

---
This message was sent from the NiyoGen website contact form.
        `);

        const mailtoLink = `mailto:${PRIMARY_EMAIL}?cc=${CC_EMAIL}&subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.open(mailtoLink, '_blank');
        
        // Show fallback message
        this.showMessage('info', 'Your default email client will open. Please send the pre-filled email to complete your message.');
    }

    setLoadingState(button, isLoading, originalText = 'Send message') {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>Sending...';
        } else {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }

    showMessage(type, message) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.email-message');
        existingMessages.forEach(msg => msg.remove());

        // Create message element
        const messageDiv = document.createElement('div');
        let bgColor = 'bg-red-500 text-white';
        if (type === 'success') {
            bgColor = 'bg-green-500 text-white';
        } else if (type === 'info') {
            bgColor = 'bg-blue-500 text-white';
        }
        
        messageDiv.className = `email-message fixed top-4 right-4 z-[10000] p-4 rounded-lg shadow-lg max-w-md ${bgColor}`;
        
        messageDiv.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(messageDiv);

        // Automatically remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EmailHandler();
});
