// =====================================================
// RUANG JAJAN - EMAIL NOTIFICATION SYSTEM
// Gmail SMTP with Nodemailer
// =====================================================

import nodemailer from 'nodemailer';
import { EmailTemplate, EmailTemplateType } from './email-templates';

// =====================================================
// EMAIL CONFIGURATION
// =====================================================

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || 'ahmadrafa063@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || 'ahmadrafa063@gmail.com';

// =====================================================
// NODERMAILER TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
     host: SMTP_HOST,
     port: SMTP_PORT,
     secure: false, // true for 465, false for other ports
     auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
     },
     tls: {
          rejectUnauthorized: true,
     },
     connectionTimeout: 10000,
     greetingTimeout: 10000,
     socketTimeout: 10000,
});

// =====================================================
// EMAIL SENDER
// =====================================================

interface SendEmailOptions {
     to: string;
     subject: string;
     html: string;
     text?: string;
     from?: string;
     attachments?: Array<{
          filename: string;
          path: string;
          cid?: string;
     }>;
}

interface EmailResult {
     success: boolean;
     messageId?: string;
     error?: string;
     retry?: boolean;
}

async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
     const { to, subject, html, text, from = SMTP_FROM, attachments } = options;

     // Validate SMTP configuration
     if (!SMTP_PASS) {
          console.error('❌ SMTP password not configured');
          return { success: false, error: 'SMTP password not configured' };
     }

     const mailOptions = {
          from: `"Ruang Jajan" <${from}>`,
          to,
          subject,
          html,
          text: text || 'Please view this email in a browser that supports HTML.',
          attachments: attachments || [],
     };

     try {
          const info = await transporter.sendMail(mailOptions);
          console.log(`✅ Email sent to ${to}: ${info.messageId}`);
          return { success: true, messageId: info.messageId };
     } catch (error: any) {
          console.error(`❌ Email failed to ${to}:`, error.message);

          // Check for retryable errors
          const retryableErrors = [
               'ECONNRESET',
               'ETIMEDOUT',
               'ECONNREFUSED',
               'EHOSTUNREACH',
          ];

          const isRetryable = retryableErrors.some(err =>
               error.message?.includes(err) || error.code?.includes(err)
          );

          return {
               success: false,
               error: error.message,
               retry: isRetryable
          };
     }
}

// =====================================================
// EMAIL TEMPLATES
// =====================================================

function renderTemplate(type: EmailTemplateType, data: any): any {
     const template = EmailTemplate[type];
     if (!template) {
          throw new Error(`Unknown email template: ${type}`);
     }
     return template(data);
}

// =====================================================
// EMAIL SENDER WITH TEMPLATES
// =====================================================

interface SendEmailWithTemplateOptions {
     to: string;
     template: EmailTemplateType;
     data: any;
     attachments?: Array<{
          filename: string;
          path: string;
          cid?: string;
     }>;
}

async function sendEmailWithTemplate(options: SendEmailWithTemplateOptions): Promise<EmailResult> {
     const { to, template, data, attachments } = options;

     try {
          const templateGenerator = EmailTemplate[template];
          if (!templateGenerator) {
               throw new Error(`Unknown email template: ${template}`);
          }

          const html = templateGenerator(data);

          // Extract subject from the HTML content
          const subjectMatch = html.match(/<title>([^<]+)<\/title>/);
          const subject = subjectMatch ? subjectMatch[1] : 'Ruang Jajan Email';

          return await sendEmail({
               to,
               subject,
               html,
               attachments,
          });
     } catch (error: any) {
          console.error(`❌ Failed to render template ${template}:`, error.message);
          return { success: false, error: error.message };
     }
}

// =====================================================
// EMAIL SENDER WITH RETRY
// =====================================================

interface SendEmailWithRetryOptions {
     to: string;
     subject: string;
     html: string;
     text?: string;
     from?: string;
     attachments?: Array<{
          filename: string;
          path: string;
          cid?: string;
     }>;
     maxRetries?: number;
     retryDelay?: number;
}

async function sendEmailWithRetry(options: SendEmailWithRetryOptions): Promise<EmailResult> {
     const {
          to,
          subject,
          html,
          text,
          from,
          attachments,
          maxRetries = 3,
          retryDelay = 1000
     } = options;

     let lastError: string | undefined;
     let retryCount = 0;

     while (retryCount < maxRetries) {
          const result = await sendEmail({ to, subject, html, text, from, attachments });

          if (result.success) {
               return result;
          }

          lastError = result.error;

          if (!result.retry) {
               // Non-retryable error
               return result;
          }

          retryCount++;
          console.log(`⏳ Email retry ${retryCount}/${maxRetries} for ${to}...`);

          if (retryCount < maxRetries) {
               await new Promise(resolve => setTimeout(resolve, retryDelay * retryCount));
          }
     }

     return {
          success: false,
          error: `Failed after ${maxRetries} retries: ${lastError}`
     };
}

// =====================================================
// EMAIL SENDER WITH TEMPLATES AND RETRY
// =====================================================

async function sendEmailWithTemplateAndRetry(options: SendEmailWithTemplateOptions): Promise<EmailResult> {
     const { to, template, data, attachments } = options;

     try {
          const templateGenerator = EmailTemplate[template];
          if (!templateGenerator) {
               throw new Error(`Unknown email template: ${template}`);
          }

          const html = templateGenerator(data);

          // Extract subject from the HTML content
          const subjectMatch = html.match(/<title>([^<]+)<\/title>/);
          const subject = subjectMatch ? subjectMatch[1] : 'Ruang Jajan Email';

          return await sendEmailWithRetry({
               to,
               subject,
               html,
               attachments,
               maxRetries: 3,
               retryDelay: 1000,
          });
     } catch (error: any) {
          console.error(`❌ Failed to render template ${template}:`, error.message);
          return { success: false, error: error.message };
     }
}

// =====================================================
// TEST SMTP CONNECTION
// =====================================================

async function testSmtpConnection(): Promise<boolean> {
     try {
          await transporter.verify();
          console.log('✅ SMTP connection verified successfully');
          return true;
     } catch (error: any) {
          console.error('❌ SMTP connection failed:', error.message);
          return false;
     }
}

// =====================================================
// EXPORTS
// =====================================================

export {
     sendEmail,
     sendEmailWithTemplate,
     sendEmailWithRetry,
     sendEmailWithTemplateAndRetry,
     testSmtpConnection,
     transporter,
     renderTemplate,
};

export type { SendEmailOptions, SendEmailWithTemplateOptions, SendEmailWithRetryOptions };
