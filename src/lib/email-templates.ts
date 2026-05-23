// =====================================================
// RUANG JAJAN - EMAIL TEMPLATES
// Pure functions returning { subject, html }
// Inline-styled HTML for email client compatibility
// =====================================================

const BRAND_NAME = 'Ruang Jajan';
const BRAND_COLOR = '#ff7a00';
const BRAND_URL = 'https://ruang-jajan.vercel.app';

// =====================================================
// HTML ESCAPE UTILITY
// =====================================================

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// =====================================================
// EMAIL TEMPLATES
// =====================================================

export function welcomeEmail(name: string, email: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  return {
    subject: `Welcome to ${BRAND_NAME}!`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to ${BRAND_NAME}</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND_COLOR} 0%, #ff9a3d 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; font-size:28px; margin:0;">${BRAND_NAME}</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.9; margin:8px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin-bottom:20px;">Hi ${safeName},</h2>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                Welcome to ${BRAND_NAME}! We're excited to have you as part of our community.
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                At ${BRAND_NAME}, we bring you the finest premium food and beverage experience in Indonesia.
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:30px;">
                Start exploring our premium collection today!
              </p>
              <a href="${BRAND_URL}/products" style="display:inline-block; background-color:${BRAND_COLOR}; color:#ffffff; padding:14px 32px; text-decoration:none; border-radius:10px; font-weight:600; font-size:16px;">Start Shopping</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="font-size:14px; color:#666; margin-bottom:12px;">© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
              <p style="font-size:12px; color:#999; margin-top:20px;">Premium Food Experience in Indonesia</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
     `.trim(),
  };
}

export function passwordResetEmail(name: string, resetUrl: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  const safeResetUrl = escapeHtml(resetUrl);

  return {
    subject: `Password Reset - ${BRAND_NAME}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset - ${BRAND_NAME}</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND_COLOR} 0%, #ff9a3d 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; font-size:28px; margin:0;">${BRAND_NAME}</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.9; margin:8px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin-bottom:20px;">Hi ${safeName},</h2>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                We received a request to reset your password for your ${BRAND_NAME} account.
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:30px;">
                Click the button below to reset your password:
              </p>
              <a href="${safeResetUrl}" style="display:inline-block; background-color:${BRAND_COLOR}; color:#ffffff; padding:14px 32px; text-decoration:none; border-radius:10px; font-weight:600; font-size:16px;">Reset Password</a>
              <div style="background-color:#fff3cd; border-left:4px solid #ffc107; padding:16px; margin:30px 0; border-radius:0 8px 8px 0;">
                <p style="font-size:14px; color:#856404; margin:0;">
                  <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
                </p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="font-size:14px; color:#666; margin-bottom:12px;">© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
              <p style="font-size:12px; color:#999; margin-top:20px;">Premium Food Experience in Indonesia</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
     `.trim(),
  };
}

export function orderSuccessEmail(name: string, orderNumber: string, orderDate: Date, total: number, items: Array<{ name: string; quantity: number; price: number }>): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  const safeOrderNumber = escapeHtml(orderNumber);

  let itemsHtml = '';
  items.forEach(item => {
    const safeItemName = escapeHtml(item.name);
    itemsHtml += `
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e0e0e0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:15px; color:#333;">${safeItemName}</td>
                  <td style="font-size:14px; color:#666; text-align:right;">Qty: ${item.quantity} × ${formatCurrency(item.price)}</td>
                </tr>
              </table>
            </td>
          </tr>`;
  });

  return {
    subject: `Order Confirmation - ${BRAND_NAME}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Confirmation - ${BRAND_NAME}</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND_COLOR} 0%, #ff9a3d 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; font-size:28px; margin:0;">${BRAND_NAME}</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.9; margin:8px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin-bottom:20px;">Hi ${safeName},</h2>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                Thank you for your order! Your order has been successfully placed.
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                <strong>Order Number:</strong> ${safeOrderNumber}<br>
                <strong>Order Date:</strong> ${formatDate(orderDate)}
              </p>
              <div style="background-color:#f8f9fa; border-radius:12px; padding:24px; margin:30px 0;">
                <h3 style="font-size:18px; color:#1a1a1a; margin-bottom:20px;">Order Summary</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${itemsHtml}
                  <tr>
                    <td style="padding:16px 0; border-top:2px solid ${BRAND_COLOR}; font-weight:700; font-size:18px; color:#1a1a1a;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>Total</td>
                          <td style="text-align:right;">${formatCurrency(total)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                We'll notify you when your order ships.
              </p>
              <a href="${BRAND_URL}/orders/${safeOrderNumber}" style="display:inline-block; background-color:${BRAND_COLOR}; color:#ffffff; padding:14px 32px; text-decoration:none; border-radius:10px; font-weight:600; font-size:16px;">View Order Details</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="font-size:14px; color:#666; margin-bottom:12px;">© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
              <p style="font-size:12px; color:#999; margin-top:20px;">Premium Food Experience in Indonesia</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
     `.trim(),
  };
}

export function orderShippedEmail(name: string, orderNumber: string, trackingNumber: string, estimatedDelivery: Date): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  const safeOrderNumber = escapeHtml(orderNumber);
  const safeTrackingNumber = escapeHtml(trackingNumber);

  return {
    subject: `Order Shipped - ${BRAND_NAME}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Shipped - ${BRAND_NAME}</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND_COLOR} 0%, #ff9a3d 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; font-size:28px; margin:0;">${BRAND_NAME}</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.9; margin:8px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin-bottom:20px;">Hi ${safeName},</h2>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                Great news! Your order <strong>${safeOrderNumber}</strong> has been shipped and is on its way to you.
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                <strong>Tracking Number:</strong> ${safeTrackingNumber}
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:30px;">
                Estimated delivery: ${formatDate(estimatedDelivery)}
              </p>
              <a href="${BRAND_URL}/orders/${safeOrderNumber}" style="display:inline-block; background-color:${BRAND_COLOR}; color:#ffffff; padding:14px 32px; text-decoration:none; border-radius:10px; font-weight:600; font-size:16px;">Track Your Shipment</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="font-size:14px; color:#666; margin-bottom:12px;">© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
              <p style="font-size:12px; color:#999; margin-top:20px;">Premium Food Experience in Indonesia</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
     `.trim(),
  };
}

export function orderDeliveredEmail(name: string, orderNumber: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  const safeOrderNumber = escapeHtml(orderNumber);

  return {
    subject: `Order Delivered - ${BRAND_NAME}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Delivered - ${BRAND_NAME}</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND_COLOR} 0%, #ff9a3d 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; font-size:28px; margin:0;">${BRAND_NAME}</h1>
              <p style="color:#ffffff; font-size:16px; opacity:0.9; margin:8px 0 0;">Premium Food & Beverage Experience</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="font-size:20px; color:#1a1a1a; margin-bottom:20px;">Hi ${safeName},</h2>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                Your order <strong>${safeOrderNumber}</strong> has been delivered successfully!
              </p>
              <p style="font-size:16px; color:#4a4a4a; line-height:1.6; margin-bottom:20px;">
                We hope you enjoy your purchase. If you have any questions or need assistance, please don't hesitate to contact us.
              </p>
              <a href="${BRAND_URL}/products" style="display:inline-block; background-color:${BRAND_COLOR}; color:#ffffff; padding:14px 32px; text-decoration:none; border-radius:10px; font-weight:600; font-size:16px;">Leave a Review</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa; padding:40px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="font-size:14px; color:#666; margin-bottom:12px;">© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
              <p style="font-size:12px; color:#999; margin-top:20px;">Premium Food Experience in Indonesia</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
     `.trim(),
  };
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}