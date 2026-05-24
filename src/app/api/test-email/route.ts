import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, '')
  console.log('[ENV CHECK]', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    passLength: smtpPass?.length,
    from: process.env.SMTP_FROM,
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
      from: `"Ruang Jajan" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'Test Email Vercel - RuangJajan',
      html: '<h1>Email is working on Vercel!</h1>',
    })
    console.log('[EMAIL] Sent successfully!')
    return NextResponse.json({ success: true, message: 'Email sent!' })
  } catch (error: any) {
    console.error('[EMAIL ERROR]:', error.message)
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
    }, { status: 500 })
  }
}