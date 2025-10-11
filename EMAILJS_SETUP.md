# EmailJS Setup Guide

This guide will help you set up EmailJS to enable contact form email functionality on your NiyoGen website.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from client-side JavaScript without exposing your email credentials. It's perfect for contact forms on static websites.

## Setup Steps

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

**Template ID**: `template_contact`

**Subject**: `{{subject}}`

**Content**:
```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Form Type: {{form_type}}

Message:
{{message}}

---
This message was sent from the NiyoGen website contact form.
Reply directly to this email to respond to the sender.
```

4. Save the template and note down the **Template ID**

### 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abc123def456`)
3. Copy this key

### 5. Update Configuration

Open `src/js/utils/email-handler.js` and update these values:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here'; // Replace with your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_contact'; // Replace with your actual template ID  
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Replace with your actual public key
```

### 6. Test the Setup

1. Build your project: `yarn run build`
2. Open the built website
3. Try submitting the contact form
4. Check your email for the form submission

## Fallback Behavior

If EmailJS is not configured or fails, the form will:
1. Open your default email client
2. Pre-fill a mailto link with the form data
3. Send to `itranga@gmail.com`

## Troubleshooting

### Common Issues

1. **"EmailJS is not defined"**
   - Make sure the EmailJS CDN script is loaded
   - Check browser console for script loading errors

2. **"Failed to send email"**
   - Verify your Service ID, Template ID, and Public Key
   - Check EmailJS dashboard for error logs
   - Ensure your email service is properly configured

3. **Form not submitting**
   - Check browser console for JavaScript errors
   - Verify form has `data-contact-form="modal"` attribute
   - Ensure email-handler.js is imported in main.js

### Testing Locally

1. Run `yarn run build`
2. Serve the `dist` folder with a local server
3. Test the contact form functionality
4. Check both EmailJS and fallback behavior

## Security Notes

- EmailJS public key is safe to expose in client-side code
- Never put sensitive credentials in client-side JavaScript
- EmailJS handles authentication securely on their servers
- Consider rate limiting for production use

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
