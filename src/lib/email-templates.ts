// =====================================================
// RUANG JAJAN - EMAIL TEMPLATES SYSTEM
// Production-ready, scalable, modular email templates
// =====================================================

// =====================================================
// TYPES & INTERFACES
// =====================================================

export interface UserInfo {
     name: string;
     email: string;
     phone?: string;
}

export interface OrderItem {
     name: string;
     quantity: number;
     price: number;
     subtotal: number;
     sku?: string;
}

export interface OrderData {
     orderId: string;
     orderNumber: string;
     orderDate: Date;
     status: string;
     subtotal: number;
     shippingCost: number;
     discount: number;
     tax: number;
     total: number;
     paymentMethod: string;
     paymentStatus: string;
     shippingAddress: string;
     items: OrderItem[];
     estimatedArrival?: Date;
     trackingNumber?: string;
     trackingUrl?: string;
     cancelReason?: string;
}

export interface PaymentData {
     orderId: string;
     amount: number;
     paymentMethod: string;
     paymentStatus: string;
     transactionId?: string;
}

export interface ContactData {
     name: string;
     email: string;
     phone?: string;
     message: string;
     subject?: string;
}

export interface OTPData {
     otpCode: string;
     expiresAt: Date;
     purpose: 'verification' | 'password_reset' | 'login';
}

export interface AdminNotificationData {
     notificationType: string;
     title: string;
     message: string;
     relatedId?: string;
     relatedType?: string;
}

export type EmailTemplateType =
     | 'order_success'
     | 'order_confirmed'
     | 'order_shipped'
     | 'order_delivered'
     | 'order_cancelled'
     | 'payment_success'
     | 'payment_failed'
     | 'password_reset'
     | 'welcome'
     | 'otp'
     | 'contact_form'
     | 'admin_new_order'
     | 'admin_order_update'
     | 'low_stock_alert'
     | 'abandoned_cart';

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const BRAND_NAME = 'Ruang Jajan';
const BRAND_COLOR = '#ff7a00';
const BRAND_DARK = '#1a1a1a';
const BRAND_LIGHT = '#f5f5f5';
const BRAND_URL = 'https://ruang-jajan.vercel.app';

function formatCurrencyIDR(amount: number): string {
     return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
     }).format(amount);
}

function formatDateID(date: Date): string {
     return new Intl.DateTimeFormat('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
     }).format(date);
}

function formatDateShort(date: Date): string {
     return new Intl.DateTimeFormat('id-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
     }).format(date);
}

// =====================================================
// EMAIL LAYOUT GENERATOR
// =====================================================

function generateEmailLayout({
     title,
     greeting,
     content,
     ctaText,
     ctaUrl,
     orderSummary,
     footerContent,
}: {
     title: string;
     greeting: string;
     content: string;
     ctaText?: string;
     ctaUrl?: string;
     orderSummary?: string;
     footerContent?: string;
}): string {
     return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${BRAND_NAME}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f8f9fa;
      color: ${BRAND_DARK};
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    .header {
      background: linear-gradient(135deg, ${BRAND_COLOR} 0%, #ff9a3d 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .header p {
      font-size: 16px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: ${BRAND_DARK};
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      color: #4a4a4a;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      background-color: ${BRAND_COLOR};
      color: white;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      margin-top: 20px;
    }
    .cta-button:hover {
      background-color: #e66b00;
      transform: translateY(-2px);
    }
    .order-summary {
      background-color: #f8f9fa;
      border-radius: 12px;
      padding: 24px;
      margin: 30px 0;
    }
    .order-summary h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      color: ${BRAND_DARK};
    }
    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .order-item:last-child {
      border-bottom: none;
    }
    .order-item-name {
      font-size: 15px;
      color: #333;
    }
    .order-item-details {
      font-size: 14px;
      color: #666;
    }
    .order-item-price {
      font-weight: 600;
      color: ${BRAND_DARK};
    }
    .order-total {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      font-weight: 700;
      font-size: 18px;
      color: ${BRAND_DARK};
      border-top: 2px solid ${BRAND_COLOR};
      margin-top: 16px;
    }
    .security-notice {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 16px;
      margin: 30px 0;
      border-radius: 0 8px 8px 0;
    }
    .security-notice p {
      font-size: 14px;
      color: #856404;
      margin-bottom: 8px;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 40px 30px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    .footer p {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
    }
    .footer-links {
      margin: 20px 0;
    }
    .footer-links a {
      color: ${BRAND_COLOR};
      text-decoration: none;
      margin: 0 12px;
      font-size: 14px;
    }
    .copyright {
      font-size: 12px;
      color: #999;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    .divider {
      height: 1px;
      background-color: #e0e0e0;
      margin: 24px 0;
    }
    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }
    .status-success {
      background-color: #d4edda;
      color: #155724;
    }
    .status-pending {
      background-color: #fff3cd;
      color: #856404;
    }
    .status-failed {
      background-color: #f8d7da;
      color: #721c24;
    }
    @media (max-width: 600px) {
      .container {
        border-radius: 0;
      }
      .header {
        padding: 30px 20px;
      }
      .content {
        padding: 30px 20px;
      }
      .footer {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${BRAND_NAME}</h1>
      <p>Premium Food & Beverage Experience</p>
    </div>
    
    <div class="content">
      <div class="greeting">${greeting}</div>
      <div class="message">${content}</div>
      
      ${orderSummary || ''}
      
      ${ctaText && ctaUrl ? `<a href="${ctaUrl}" class="cta-button">${ctaText}</a>` : ''}
      
      ${footerContent || ''}
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
      <div class="footer-links">
        <a href="${BRAND_URL}">Website</a>
        <a href="${BRAND_URL}/contact">Contact</a>
        <a href="${BRAND_URL}/privacy">Privacy</a>
        <a href="${BRAND_URL}/terms">Terms</a>
      </div>
      <p class="copyright">Premium Food Experience in Indonesia</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// =====================================================
// ORDER SUCCESS EMAIL
// =====================================================

export function generateOrderSuccessEmail(data: {
     userInfo: UserInfo;
     order: OrderData;
}): string {
     const { userInfo, order } = data;

     const itemsHtml = order.items
          .map(
               (item) => `
      <div class="order-item">
        <div>
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-details">Qty: ${item.quantity} × ${formatCurrencyIDR(item.price)}</div>
        </div>
        <div class="order-item-price">${formatCurrencyIDR(item.subtotal)}</div>
      </div>
    `
          )
          .join('');

     const orderSummary = `
    <div class="order-summary">
      <h3>Order Summary</h3>
      ${itemsHtml}
      <div class="order-item">
        <span>Shipping</span>
        <span class="order-item-price">${formatCurrencyIDR(order.shippingCost)}</span>
      </div>
      ${order.discount > 0 ? `
      <div class="order-item">
        <span>Discount</span>
        <span class="order-item-price">-${formatCurrencyIDR(order.discount)}</span>
      </div>
      ` : ''}
      <div class="order-total">
        <span>Total</span>
        <span>${formatCurrencyIDR(order.total)}</span>
      </div>
    </div>
  `;

     const statusClass = order.paymentStatus === 'completed' ? 'status-success' : 'status-pending';
     const statusText = order.paymentStatus === 'completed' ? 'Payment Completed' : 'Payment Pending';

     return generateEmailLayout({
          title: 'Order Confirmation - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>Thank you for your order! Your order has been successfully placed.</p>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Order Date:</strong> ${formatDateID(order.orderDate)}</p>
      <div style="margin: 20px 0;">
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>
      <p>We'll notify you when your order ships.</p>
    `,
          ctaText: 'View Order Details',
          ctaUrl: `${BRAND_URL}/orders/${order.orderNumber}`,
          orderSummary,
          footerContent: `
      <div class="divider"></div>
      <p><strong>Shipping to:</strong><br>${order.shippingAddress}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
    `,
     });
}

// =====================================================
// ORDER CONFIRMED EMAIL
// =====================================================

export function generateOrderConfirmedEmail(data: {
     userInfo: UserInfo;
     order: OrderData;
}): string {
     const { userInfo, order } = data;

     return generateEmailLayout({
          title: 'Order Confirmed - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>Your order <strong>${order.orderNumber}</strong> has been confirmed and is being processed!</p>
      <p>We'll notify you when your order ships.</p>
    `,
          ctaText: 'Track Your Order',
          ctaUrl: `${BRAND_URL}/orders/${order.orderNumber}`,
          footerContent: `
      <div class="divider"></div>
      <p><strong>Estimated Arrival:</strong> ${order.estimatedArrival ? formatDateShort(order.estimatedArrival) : '3-5 business days'}</p>
    `,
     });
}

// =====================================================
// ORDER SHIPPED EMAIL
// =====================================================

export function generateOrderShippedEmail(data: {
     userInfo: UserInfo;
     order: OrderData;
}): string {
     const { userInfo, order } = data;

     return generateEmailLayout({
          title: 'Order Shipped - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>Great news! Your order <strong>${order.orderNumber}</strong> has been shipped and is on its way to you.</p>
      <p>Tracking Number: <strong>${order.trackingNumber}</strong></p>
    `,
          ctaText: 'Track Your Shipment',
          ctaUrl: order.trackingUrl || `${BRAND_URL}/orders/${order.orderNumber}`,
          footerContent: `
      <div class="divider"></div>
      <p>Estimated delivery: ${order.estimatedArrival ? formatDateShort(order.estimatedArrival) : '3-5 business days'}</p>
    `,
     });
}

// =====================================================
// ORDER DELIVERED EMAIL
// =====================================================

export function generateOrderDeliveredEmail(data: {
     userInfo: UserInfo;
     order: OrderData;
}): string {
     const { userInfo, order } = data;

     return generateEmailLayout({
          title: 'Order Delivered - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>Your order <strong>${order.orderNumber}</strong> has been delivered successfully!</p>
      <p>We hope you enjoy your purchase. If you have any questions or need assistance, please don't hesitate to contact us.</p>
    `,
          ctaText: 'Leave a Review',
          ctaUrl: `${BRAND_URL}/products`,
          footerContent: `
      <div class="divider"></div>
      <p>Thank you for choosing Ruang Jajan for your premium food experience.</p>
    `,
     });
}

// =====================================================
// ORDER CANCELLED EMAIL
// =====================================================

export function generateOrderCancelledEmail(data: {
     userInfo: UserInfo;
     order: OrderData;
}): string {
     const { userInfo, order } = data;

     return generateEmailLayout({
          title: 'Order Cancelled - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>We regret to inform you that your order <strong>${order.orderNumber}</strong> has been cancelled.</p>
      ${order.cancelReason ? `<p><strong>Reason:</strong> ${order.cancelReason}</p>` : ''}
      <p>A refund will be processed to your original payment method within 3-5 business days.</p>
    `,
          ctaText: 'Contact Support',
          ctaUrl: `${BRAND_URL}/contact`,
          footerContent: `
      <div class="divider"></div>
      <p>Refund Amount: ${formatCurrencyIDR(order.total)}</p>
    `,
     });
}

// =====================================================
// PAYMENT SUCCESS EMAIL
// =====================================================

export function generatePaymentSuccessEmail(data: {
     userInfo: UserInfo;
     payment: PaymentData;
     order: OrderData;
}): string {
     const { userInfo, payment, order } = data;

     return generateEmailLayout({
          title: 'Payment Successful - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>Thank you for your payment! Your payment of <strong>${formatCurrencyIDR(payment.amount)}</strong> has been successfully processed.</p>
      <p><strong>Transaction ID:</strong> ${payment.transactionId || 'N/A'}</p>
      <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
    `,
          ctaText: 'View Payment Receipt',
          ctaUrl: `${BRAND_URL}/orders/${order.orderNumber}`,
          footerContent: `
      <div class="divider"></div>
      <p>Order: ${order.orderNumber}</p>
    `,
     });
}

// =====================================================
// PAYMENT FAILED EMAIL
// =====================================================

export function generatePaymentFailedEmail(data: {
     userInfo: UserInfo;
     payment: PaymentData;
     order: OrderData;
}): string {
     const { userInfo, payment, order } = data;

     return generateEmailLayout({
          title: 'Payment Failed - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>We were unable to process your payment of <strong>${formatCurrencyIDR(payment.amount)}</strong> for order <strong>${order.orderNumber}</strong>.</p>
      <p>Please try again or contact our support team for assistance.</p>
    `,
          ctaText: 'Retry Payment',
          ctaUrl: `${BRAND_URL}/checkout`,
          footerContent: `
      <div class="divider"></div>
      <p>Payment Method: ${payment.paymentMethod}</p>
    `,
     });
}

// =====================================================
// PASSWORD RESET EMAIL
// =====================================================

export function generatePasswordResetEmail(data: {
     userInfo: UserInfo;
     resetUrl: string;
}): string {
     const { userInfo, resetUrl } = data;

     return generateEmailLayout({
          title: 'Password Reset - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>We received a request to reset your password for your Ruang Jajan account.</p>
      <p>Click the button below to reset your password:</p>
    `,
          ctaText: 'Reset Password',
          ctaUrl: resetUrl,
          footerContent: `
      <div class="security-notice">
        <p><strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      </div>
    `,
     });
}

// =====================================================
// WELCOME EMAIL
// =====================================================

export function generateWelcomeEmail(data: {
     userInfo: UserInfo;
}): string {
     const { userInfo } = data;

     return generateEmailLayout({
          title: 'Welcome to Ruang Jajan - Premium Food Experience',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>Welcome to Ruang Jajan! We're excited to have you as part of our community.</p>
      <p>At Ruang Jajan, we bring you the finest premium food and beverage experience in Indonesia.</p>
      <p>Start exploring our premium collection today!</p>
    `,
          ctaText: 'Start Shopping',
          ctaUrl: `${BRAND_URL}/products`,
          footerContent: `
      <div class="divider"></div>
      <p>Happy eating!</p>
      <p>The Ruang Jajan Team</p>
    `,
     });
}

// =====================================================
// OTP EMAIL
// =====================================================

export function generateOTPEmail(data: {
     userInfo: UserInfo;
     otpData: OTPData;
}): string {
     const { userInfo, otpData } = data;

     const purposeText =
          otpData.purpose === 'verification'
               ? 'verify your account'
               : otpData.purpose === 'password_reset'
                    ? 'reset your password'
                    : 'complete your login';

     return generateEmailLayout({
          title: `OTP for ${purposeText} - Ruang Jajan`,
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>Your One-Time Password (OTP) for ${purposeText} is:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: ${BRAND_COLOR}; font-family: monospace;">
          ${otpData.otpCode}
        </span>
      </div>
      <p>This code will expire in 10 minutes.</p>
      <p>Do not share this code with anyone.</p>
    `,
          footerContent: `
      <div class="security-notice">
        <p><strong>Security Notice:</strong> If you didn't request this code, please ignore this email. Your account security is our priority.</p>
      </div>
    `,
     });
}

// =====================================================
// CONTACT FORM EMAIL
// =====================================================

export function generateContactFormEmail(data: {
     contactData: ContactData;
}): string {
     const { contactData } = data;

     return generateEmailLayout({
          title: `New Contact Form Submission - ${contactData.subject || 'General Inquiry'}`,
          greeting: 'Hello Team,',
          content: `
      <p>You have received a new contact form submission:</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${contactData.subject || 'N/A'}</p>
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <p style="white-space: pre-wrap; margin-top: 10px;">${contactData.message}</p>
        </div>
      </div>
    `,
          ctaText: 'Reply to Contact',
          ctaUrl: `mailto:${contactData.email}`,
          footerContent: `
      <div class="divider"></div>
      <p>Sender Email: ${contactData.email}</p>
    `,
     });
}

// =====================================================
// ADMIN NEW ORDER EMAIL
// =====================================================

export function generateAdminNewOrderEmail(data: {
     adminInfo: UserInfo;
     order: OrderData;
     userInfo: UserInfo;
}): string {
     const { adminInfo, order, userInfo } = data;

     let itemsHtml = order.items
          .slice(0, 3)
          .map(
               (item) => `
      <div class="order-item">
        <div>
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-details">Qty: ${item.quantity}</div>
        </div>
        <div class="order-item-price">${formatCurrencyIDR(item.subtotal)}</div>
      </div>
    `
          )
          .join('');

     if (order.items.length > 3) {
          itemsHtml += `
      <div class="order-item">
        <div class="order-item-details">+${order.items.length - 3} more items</div>
      </div>
    `;
     }

     return generateEmailLayout({
          title: `New Order #${order.orderNumber} - Ruang Jajan Admin`,
          greeting: 'Hello Admin,',
          content: `
      <p>You have received a new order!</p>
      <p><strong>Customer:</strong> ${userInfo.name} (${userInfo.email})</p>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Order Date:</strong> ${formatDateID(order.orderDate)}</p>
    `,
          ctaText: 'View Order',
          ctaUrl: `${BRAND_URL}/admin/orders/${order.orderNumber}`,
          orderSummary: `
      <div class="order-summary">
        <h3>Order Items</h3>
        ${itemsHtml}
        <div class="order-total">
          <span>Total</span>
          <span>${formatCurrencyIDR(order.total)}</span>
        </div>
      </div>
    `,
          footerContent: `
      <div class="divider"></div>
      <p><strong>Shipping Address:</strong><br>${order.shippingAddress}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
    `,
     });
}

// =====================================================
// ADMIN ORDER UPDATE EMAIL
// =====================================================

export function generateAdminOrderUpdateEmail(data: {
     adminInfo: UserInfo;
     order: OrderData;
     status: string;
}): string {
     const { adminInfo, order, status } = data;

     return generateEmailLayout({
          title: `Order #${order.orderNumber} Updated - Ruang Jajan Admin`,
          greeting: 'Hello Admin,',
          content: `
      <p>The status of order <strong>${order.orderNumber}</strong> has been updated to:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span class="status-badge status-success">${status}</span>
      </div>
    `,
          ctaText: 'View Order Details',
          ctaUrl: `${BRAND_URL}/admin/orders/${order.orderNumber}`,
          footerContent: `
      <div class="divider"></div>
      <p>Customer: Guest</p>
    `,
     });
}

// =====================================================
// LOW STOCK ALERT EMAIL
// =====================================================

export function generateLowStockAlertEmail(data: {
     adminInfo: UserInfo;
     products: Array<{
          name: string;
          sku: string;
          currentStock: number;
          threshold: number;
     }>;
}): string {
     const { adminInfo, products } = data;

     const productsHtml = products
          .map(
               (product) => `
      <div class="order-item">
        <div>
          <div class="order-item-name">${product.name}</div>
          <div class="order-item-details">SKU: ${product.sku}</div>
        </div>
        <div class="order-item-price" style="color: #dc3545;">${product.currentStock} remaining</div>
      </div>
    `
          )
          .join('');

     return generateEmailLayout({
          title: 'Low Stock Alert - Ruang Jajan Admin',
          greeting: 'Hello Admin,',
          content: `
      <p>The following products are running low on stock:</p>
      <p><strong>Please restock soon to avoid missing sales.</strong></p>
    `,
          ctaText: 'Manage Inventory',
          ctaUrl: `${BRAND_URL}/admin/inventory`,
          orderSummary: `
      <div class="order-summary">
        <h3>Low Stock Products</h3>
        ${productsHtml}
      </div>
    `,
          footerContent: `
      <div class="security-notice">
        <p><strong>Warning:</strong> ${products.length} product(s) are below their low stock threshold.</p>
      </div>
    `,
     });
}

// =====================================================
// ABANDONED CART EMAIL
// =====================================================

export function generateAbandonedCartEmail(data: {
     userInfo: UserInfo;
     cartItems: OrderItem[];
     subtotal: number;
}): string {
     const { userInfo, cartItems, subtotal } = data;

     let itemsHtml = cartItems
          .slice(0, 3)
          .map(
               (item) => `
      <div class="order-item">
        <div>
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-details">Qty: ${item.quantity}</div>
        </div>
        <div class="order-item-price">${formatCurrencyIDR(item.subtotal)}</div>
      </div>
    `
          )
          .join('');

     if (cartItems.length > 3) {
          itemsHtml += `
      <div class="order-item">
        <div class="order-item-details">+${cartItems.length - 3} more items</div>
      </div>
    `;
     }

     return generateEmailLayout({
          title: 'Your Cart is Waiting - Ruang Jajan',
          greeting: `Hi ${userInfo.name},`,
          content: `
      <p>Hey! It looks like you left some items in your cart. We've saved them for you!</p>
      <p>Complete your purchase now and enjoy the premium food experience you've been eyeing.</p>
    `,
          ctaText: 'Complete Your Purchase',
          ctaUrl: `${BRAND_URL}/cart`,
          orderSummary: `
      <div class="order-summary">
        <h3>Items in Your Cart</h3>
        ${itemsHtml}
        <div class="order-total">
          <span>Subtotal</span>
          <span>${formatCurrencyIDR(subtotal)}</span>
        </div>
      </div>
    `,
          footerContent: `
      <div class="divider"></div>
      <p>Items will be reserved for 24 hours.</p>
    `,
     });
}

// =====================================================
// EXPORT ALL TEMPLATES
// =====================================================

export const EmailTemplate = {
     order_success: generateOrderSuccessEmail,
     order_confirmed: generateOrderConfirmedEmail,
     order_shipped: generateOrderShippedEmail,
     order_delivered: generateOrderDeliveredEmail,
     order_cancelled: generateOrderCancelledEmail,
     payment_success: generatePaymentSuccessEmail,
     payment_failed: generatePaymentFailedEmail,
     password_reset: generatePasswordResetEmail,
     welcome: generateWelcomeEmail,
     otp: generateOTPEmail,
     contact_form: generateContactFormEmail,
     admin_new_order: generateAdminNewOrderEmail,
     admin_order_update: generateAdminOrderUpdateEmail,
     low_stock_alert: generateLowStockAlertEmail,
     abandoned_cart: generateAbandonedCartEmail,
};
