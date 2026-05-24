import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// =====================================================
// SEND NOTIFICATION API
// Handles: add-to-cart, checkout-wa, checkout-shopeefood
// =====================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[SEND-NOTIFICATION] Received request');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;
    console.log('[SEND-NOTIFICATION] Request body:', body);
    const { type, name, address, phone, items, total, payment, message } = body;

    // Validate required fields
    if (!type) {
      console.log('[SEND-NOTIFICATION] Missing type field');
      return res.status(400).json({ success: false, error: 'Missing type field' });
    }

    const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, '');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: smtpPass,
      },
    });

    let subject = '';
    let html = '';

    if (type === 'add-to-cart') {
      subject = `🛒 Item Ditambahkan ke Keranjang`;
      html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Item Ditambahkan ke Keranjang</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:linear-gradient(135deg, #ff7a00 0%, #ff9a3d 100%); padding:50px 40px; text-align:center;">
              <h1 style="color:#ffffff; font-size:36px; margin:0; font-weight:800;">Ruang Jajan</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.95; margin:12px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px; text-align:center;">
              <div style="font-size:64px; margin-bottom:20px;">🛒</div>
              <h2 style="font-size:24px; color:#1a1a1a; margin:0 0 20px;">Item Ditambahkan ke Keranjang</h2>
              <p style="font-size:16px; color:#666; margin-bottom:30px;">${name ? `Pelanggan: <strong>${name}</strong>` : 'Guest'}</p>
              <div style="background-color:#f8f9fa; padding:20px; border-radius:12px; text-align:left;">
                <p style="margin:0 0 10px; font-size:14px; color:#333; font-weight:600;">Item:</p>
                <ul style="margin:0; padding-left:20px; font-size:14px; color:#666;">
                  ${items?.map((i: any) => `<li>${i.name} x${i.quantity} - Rp ${i.price?.toLocaleString()}</li>`).join('')}
                </ul>
              </div>
              ${total ? `<p style="margin-top:20px; font-size:18px; color:#1a1a1a; font-weight:700;">Total: Rp ${total.toLocaleString()}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="margin:0; font-size:14px; color:#666;">© ${new Date().getFullYear()} Ruang Jajan. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();
    } else if (type === 'checkout-wa' || type === 'checkout-shopeefood') {
      const platform = type === 'checkout-wa' ? 'WhatsApp' : 'ShopeeFood';
      subject = `🛍️ Pesanan Baru via ${platform} - ${name || 'Guest'}`;
      html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Pesanan Baru via ${platform}</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:linear-gradient(135deg, #ff7a00 0%, #ff9a3d 100%); padding:50px 40px; text-align:center;">
              <h1 style="color:#ffffff; font-size:36px; margin:0; font-weight:800;">Ruang Jajan</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.95; margin:12px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px;">
              <div style="font-size:64px; margin-bottom:20px;">🛍️</div>
              <h2 style="font-size:24px; color:#1a1a1a; margin:0 0 30px;">Pesanan Baru via ${platform}</h2>
              
              <div style="background-color:#f8f9fa; padding:20px; border-radius:12px; margin-bottom:20px; text-align:left;">
                <h3 style="font-size:16px; color:#1a1a1a; margin:0 0 15px; font-weight:700;">Detail Pelanggan</h3>
                <p style="margin:8px 0; font-size:14px; color:#666;"><b>Nama:</b> ${name || 'N/A'}</p>
                ${address ? `<p style="margin:8px 0; font-size:14px; color:#666;"><b>Alamat:</b> ${address}</p>` : ''}
                ${phone ? `<p style="margin:8px 0; font-size:14px; color:#666;"><b>No. HP:</b> ${phone}</p>` : ''}
              </div>

              <div style="background-color:#f8f9fa; padding:20px; border-radius:12px; margin-bottom:20px; text-align:left;">
                <h3 style="font-size:16px; color:#1a1a1a; margin:0 0 15px; font-weight:700;">Menu</h3>
                <ul style="margin:0; padding-left:20px; font-size:14px; color:#666;">
                  ${items?.map((i: any) => `<li>${i.name} x${i.quantity} - Rp ${i.price?.toLocaleString()}</li>`).join('')}
                </ul>
                ${total ? `<p style="margin-top:15px; font-size:18px; color:#1a1a1a; font-weight:700;">Total Harga: Rp ${total.toLocaleString()}</p>` : ''}
                ${payment ? `<p style="margin:8px 0; font-size:14px; color:#666;"><b>Pembayaran:</b> ${payment}</p>` : ''}
              </div>

              <div style="background:linear-gradient(135deg, #25D366 0%, #20ba59 100%); padding:20px; border-radius:12px; text-align:center;">
                <p style="margin:0; font-size:16px; color:#ffffff; font-weight:600;">Terima kasih sudah memesan di RuangJajan! 🍽️</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="margin:0; font-size:14px; color:#666;">© ${new Date().getFullYear()} Ruang Jajan. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();
    } else {
      return res.status(400).json({ success: false, error: 'Invalid type' });
    }

    try {
      await transporter.sendMail({
        from: `"Ruang Jajan" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject,
        html,
      });
      console.log('[EMAIL] Sent:', subject);
      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('[EMAIL ERROR]:', error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  } catch (error: any) {
    console.error('[SEND NOTIFICATION ERROR]:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
