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

**Subject**: `New Contact Form Submission - NiyoGen`

**To**: `itranga@gmail.com`
**CC**: `api@niyogen.com`

**Content (HTML)**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .email-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        .content {
            padding: 30px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
        }
        .info-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3B82F6;
        }
        .info-label {
            font-weight: 600;
            color: #374151;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .info-value {
            color: #1f2937;
            font-size: 14px;
        }
        .message-section {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .message-label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 10px;
            font-size: 14px;
        }
        .message-content {
            color: #1f2937;
            white-space: pre-wrap;
            line-height: 1.6;
        }
        .footer {
            background: #f8fafc;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            margin: 0;
            color: #6b7280;
            font-size: 12px;
        }
        .reply-button {
            display: inline-block;
            background: #3B82F6;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 15px;
            font-size: 14px;
        }
        .reply-button:hover {
            background: #2563eb;
        }
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🚀 New Contact Form Submission</h1>
            <p>NiyoGen AI Agent Platform</p>
        </div>
        
        <div class="content">
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Name</div>
                    <div class="info-value">{{from_name}}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Email</div>
                    <div class="info-value">{{from_email}}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Form Type</div>
                    <div class="info-value">{{form_type}}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Subject</div>
                    <div class="info-value">{{subject}}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">CC</div>
                    <div class="info-value">{{cc_email}}</div>
                </div>
            </div>
            
            <div class="message-section">
                <div class="message-label">Message</div>
                <div class="message-content">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent from the NiyoGen website contact form.</p>
            <a href="mailto:{{from_email}}?subject=Re: {{subject}}" class="reply-button">Reply to {{from_name}}</a>
        </div>
    </div>
</body>
</html>
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
