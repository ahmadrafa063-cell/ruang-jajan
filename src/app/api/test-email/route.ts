// ⚠️ DEVELOPMENT ONLY — Remove before final production deploy
import { sendEmail } from "@/lib/email";

export const maxDuration = 30;

export async function GET() {
  try {
    const to = process.env.SMTP_USER || 'ahmadrafa063@gmail.com';
    const subject = '✅ Test Email from Vercel';
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
                Email system is working!
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                Checkout → Email flow confirmed.
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

    const success = await sendEmail(to, subject, html);

    if (success) {
      return Response.json({
        success: true,
        message: 'Test email sent!',
        to,
      });
    } else {
      return Response.json({
        success: false,
        message: 'Email failed to send',
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[TEST EMAIL FAILED]:', error.message)
    console.error('[TEST EMAIL FULL ERROR]:', JSON.stringify(error))
    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}