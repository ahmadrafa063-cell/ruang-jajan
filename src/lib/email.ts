// =====================================================
// RUANG JAJAN - EMAIL NOTIFICATION SYSTEM
// Gmail SMTP with Nodemailer
// =====================================================

import * as nodemailer from 'nodemailer';

// =====================================================
// EMAIL CONFIGURATION
// =====================================================

/* IMPORTANT - Gmail SMTP requires App Password, NOT regular password
   Setup: Google Account → Security → 2-Step Verification → App Passwords
   Generate password for "Mail" → use that 16-char password as SMTP_PASS
   
   SMTP settings for Gmail:
   - SMTP_HOST = smtp.gmail.com
   - SMTP_PORT = 587 (or 465 with secure: true)
   - SMTP_USER = your.email@gmail.com
   - SMTP_PASS = xxxx xxxx xxxx xxxx (16-char App Password, no spaces in env var)
*/

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS?.replace(/\s/g, '') || ''; // Remove spaces from App Password
const SMTP_FROM = process.env.SMTP_FROM || 'ahmadrafa063@gmail.com';

// Validate environment variables at startup
if (!SMTP_USER || !SMTP_PASS) {
  console.warn('[EMAIL] ⚠️  SMTP credentials not configured. Email sending will fail.');
}

// =====================================================
// CREATE TRANSPORTER (inside function for Vercel compatibility)
// =====================================================

function createTransporter() {
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, '') || '';

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: true,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

// =====================================================
// SEND EMAIL (single reusable function)
// =====================================================

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  // ENV CHECK - Log all values to debug Vercel env issues
  const smtpPassClean = process.env.SMTP_PASS?.replace(/\s/g, '') || '';
  console.log('[ENV CHECK]', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    passLength: smtpPassClean.length,
    from: process.env.SMTP_FROM,
  })

  console.log("[EMAIL] Attempting to send...")
  console.log("[EMAIL] SMTP_HOST:", process.env.SMTP_HOST)
  console.log("[EMAIL] SMTP_PORT:", process.env.SMTP_PORT)
  console.log("[EMAIL] SMTP_USER:", process.env.SMTP_USER ? 'SET' : 'MISSING')
  console.log("[EMAIL] SMTP_PASS:", smtpPassClean ? 'SET (length: ' + smtpPassClean.length + ')' : 'MISSING')
  console.log("[EMAIL] TO:", to)
  console.log("[EMAIL] SUBJECT:", subject)

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Ruang Jajan" <${SMTP_FROM}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[EMAIL] Success! Sent to:", to)
    console.log("[EMAIL] Message ID:", info.messageId)
    return true;
  } catch (error: any) {
    console.error("[EMAIL] Failed:", error.message)
    console.error("[EMAIL] Full error:", JSON.stringify(error))
    return false;
  }
}

// =====================================================
// TEST EMAIL (dev only)
// =====================================================

export async function testSendEmail(): Promise<void> {
  const testEmail = process.env.TEST_EMAIL || 'ahmadrafa063@gmail.com';
  const subject = '📧 TEST EMAIL - Ruang Jajan';
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Test Email</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg, #ff7a00 0%, #ff9a3d 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; font-size:28px; margin:0;">Ruang Jajan</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.9; margin:8px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin-bottom:20px;">Test Email</h2>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                This is a test email from Ruang Jajan.
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                <strong>SMTP Host:</strong> ${SMTP_HOST}<br>
                <strong>SMTP Port:</strong> ${SMTP_PORT}<br>
                <strong>SMTP User:</strong> ${SMTP_USER}<br>
                <strong>To:</strong> ${testEmail}
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="font-size:14px; color:#666; margin-bottom:12px;">© ${new Date().getFullYear()} Ruang Jajan. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
     `.trim();

  const success = await sendEmail(testEmail, subject, html);
  console.log(`📧 Test email result: ${success ? '✅ SUCCESS' : '❌ FAILED'}`);
}

// =====================================================
// EXPORTS
// =====================================================

// No exports needed - sendEmail() is the main function
// createTransporter() is internal only