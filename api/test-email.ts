import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

export default async function handler(req: VercelRequest, res: VercelResponse) {
     const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, '')
     console.log('[ENV CHECK]', {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          passLength: smtpPass?.length,
     })

     try {
          const transporter = nodemailer.createTransport({
               host: process.env.SMTP_HOST,
               port: Number(process.env.SMTP_PORT) || 587,
               secure: false,
               auth: {
                    user: process.env.SMTP_USER,
                    pass: smtpPass,
               },
          })

          await transporter.verify()
          console.log('[EMAIL] Transporter verified!')
          await transporter.sendMail({
               from: process.env.SMTP_FROM,
               to: process.env.SMTP_USER,
               subject: 'Test Email Vercel',
               html: '<h1>Email works on Vercel!</h1>',
          })
          console.log('[EMAIL] Sent successfully!')
          res.status(200).json({ success: true, message: 'Email sent!' })
     } catch (error: any) {
          console.error('[EMAIL ERROR]:', error.message)
          res.status(500).json({ success: false, error: error.message })
     }
}