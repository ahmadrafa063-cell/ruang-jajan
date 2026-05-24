// =====================================================
// RUANG JAJAN - PROFESSIONAL CHECKOUT EMAIL TEMPLATE
// =====================================================

export interface CheckoutEmailData {
     customerName: string;
     customerPhone: string;
     customerAddress: string;
     items: Array<{
          name: string;
          quantity: number;
          price: number;
     }>;
     total: number;
     paymentMethod: string;
}

export function generateCheckoutEmail(data: CheckoutEmailData): { subject: string; html: string } {
     const { customerName, customerPhone, customerAddress, items, total, paymentMethod } = data;

     // Generate HTML table for items
     const itemsHtml = items
          .map(
               (item) => `
      <tr>
        <td style="padding:12px 0; border-bottom:1px solid #eee;">
          <p style="margin:0; font-size:14px; color:#333; font-weight:500;">${item.name}</p>
          <p style="margin:4px 0 0; font-size:12px; color:#666;">Qty: ${item.quantity} × Rp ${item.price.toLocaleString()}</p>
        </td>
        <td style="padding:12px 0; border-bottom:1px solid #eee; text-align:right;">
          <p style="margin:0; font-size:14px; font-weight:600; color:#333;">Rp ${(item.quantity * item.price).toLocaleString()}</p>
        </td>
      </tr>`
          )
          .join('');

     const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pesanan Baru - ${customerName}</title>
</head>
<body style="margin:0; padding:0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #ff7a00 0%, #ff9a3d 100%); padding:50px 40px; text-align:center;">
              <div style="font-size:48px; margin-bottom:10px;">🍽️</div>
              <h1 style="color:#ffffff; font-size:36px; margin:0; font-weight:800; letter-spacing:-1px;">Ruang Jajan</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.95; margin:12px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>

          <!-- Customer Details Section -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin:0 0 20px; font-weight:700; display:flex; align-items:center; gap:10px;">
                <span style="font-size:24px;">👤</span> Detail Pelanggan
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa; border-radius:12px; overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #e0e0e0;">
                    <p style="margin:0; font-size:12px; color:#666; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">Nama</p>
                    <p style="margin:4px 0 0; font-size:16px; color:#333; font-weight:600;">${customerName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #e0e0e0;">
                    <p style="margin:0; font-size:12px; color:#666; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">Nomor WhatsApp</p>
                    <p style="margin:4px 0 0; font-size:16px; color:#333; font-weight:600;">${customerPhone}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0; font-size:12px; color:#666; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">Alamat Pengiriman</p>
                    <p style="margin:4px 0 0; font-size:14px; color:#333; line-height:1.5;">${customerAddress}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Details Section -->
          <tr>
            <td style="padding:0 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin:30px 0 20px; font-weight:700; display:flex; align-items:center; gap:10px;">
                <span style="font-size:24px;">📦</span> Detail Pesanan
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa; border-radius:12px; overflow:hidden;">
                <tr style="background-color:#e8e8e8;">
                  <td style="padding:14px 20px;">
                    <p style="margin:0; font-size:13px; color:#555; font-weight:600;">Item</p>
                  </td>
                  <td style="padding:14px 20px; text-align:right;">
                    <p style="margin:0; font-size:13px; color:#555; font-weight:600;">Total</p>
                  </td>
                </tr>
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Payment Method Section -->
          <tr>
            <td style="padding:0 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin:30px 0 20px; font-weight:700; display:flex; align-items:center; gap:10px;">
                <span style="font-size:24px;">💳</span> Metode Pembayaran
              </h2>
              <div style="background-color:#f8f9fa; border-radius:12px; padding:20px; text-align:center;">
                <p style="margin:0; font-size:14px; color:#666;">Pembayaran akan dilakukan melalui:</p>
                <div style="margin-top:12px; padding:12px 24px; background-color:#ffffff; border-radius:8px; border:2px solid #e0e0e0;">
                  <p style="margin:0; font-size:18px; font-weight:700; color:#333;">${paymentMethod}</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Total Section -->
          <tr>
            <td style="padding:30px;">
              <div style="background:linear-gradient(135deg, #ff7a00 0%, #ff9a3d 100%); border-radius:16px; padding:24px; text-align:center;">
                <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.9); font-weight:500;">Total Pembayaran</p>
                <p style="margin:8px 0 0; font-size:36px; font-weight:800; color:#ffffff;">Rp ${total.toLocaleString()}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <div style="margin-bottom:20px;">
                <div style="font-size:40px; margin-bottom:10px;">🙏</div>
                <p style="margin:0; font-size:16px; color:#333; font-weight:600;">Terima kasih sudah memesan di Ruang Jajan</p>
                <p style="margin:8px 0 0; font-size:14px; color:#666;">Pesanan Anda akan segera diproses oleh tim kami.</p>
              </div>
              <div style="padding-top:20px; border-top:1px solid #e0e0e0;">
                <p style="margin:0; font-size:12px; color:#999;">© ${new Date().getFullYear()} Ruang Jajan. All rights reserved.</p>
                <p style="margin:4px 0 0; font-size:12px; color:#999;">Premium Food & Beverage Experience</p>
              </div>
            </td>
          </tr>

        </table>
        <!-- End Main Container -->
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

     return {
          subject: `🛍️ Pesanan Baru - ${customerName}`,
          html,
     };
}
