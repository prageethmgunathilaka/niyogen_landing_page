import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { fullName, emailAddress, phone, company, role, message } = req.body;

    if (!fullName || !emailAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // SMTP Configuration
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER || 'api@niyogen.com';
    const smtpPass = process.env.SMTP_PASS || 'sicnznjbiswbasqx'; 
    const fromEmail = process.env.SMTP_FROM_EMAIL || 'api@niyogen.com';
    const toEmail = 'api@niyogen.com';

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `[NiyoGen Demo Request] New Lead: ${fullName}${company ? ` from ${company}` : ''}`;

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family:Inter,Arial,sans-serif;background:#0d1117;color:#e6edf3;margin:0;padding:0;">
        <div style="max-width:600px;margin:40px auto;background:#161b22;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
          <div style="background:linear-gradient(135deg,#0066ff,#0044bb);padding:32px;text-align:center;">
            <h1 style="margin:0;font-size:24px;font-weight:700;color:#fff;">🚀 New Demo Request</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Someone wants to see NiyoGen in action</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(230,237,243,0.5);font-size:12px;text-transform:uppercase;letter-spacing:.1em;width:130px;">Full Name</td><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-weight:600;color:#e6edf3;">${fullName}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(230,237,243,0.5);font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Email</td><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);"><a href="mailto:${emailAddress}" style="color:#4d9eff;text-decoration:none;">${emailAddress}</a></td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(230,237,243,0.5);font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Phone</td><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#e6edf3;">${phone || "—"}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(230,237,243,0.5);font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Company</td><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#e6edf3;">${company || "—"}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(230,237,243,0.5);font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Role</td><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#e6edf3;">${role || "—"}</td></tr>
              <tr><td style="padding:12px 0;color:rgba(230,237,243,0.5);font-size:12px;text-transform:uppercase;letter-spacing:.1em;vertical-align:top;padding-top:16px;">Message</td><td style="padding:12px 0;color:#e6edf3;line-height:1.6;padding-top:16px;">${message || "—"}</td></tr>
            </table>
          </div>
          <div style="background:rgba(255,255,255,0.03);padding:20px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;color:rgba(230,237,243,0.4);font-size:12px;">NiyoGen · AI Agents Built for the Real World · <a href="https://www.niyogen.com" style="color:#4d9eff;text-decoration:none;">niyogen.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // send mail with defined transport object
    await transporter.sendMail({
      from: `"NiyoGen Demo" <${fromEmail}>`,
      to: toEmail,
      subject: subject,
      text: `New Demo Request from ${fullName}`,
      html: htmlBody,
    });

    return res.status(200).json({ 
      success: true, 
      message: "Demo request successfully sent." 
    });

  } catch (error) {
    console.error("Error sending demo request:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to process demo request.",
      error: error.message 
    });
  }
}
