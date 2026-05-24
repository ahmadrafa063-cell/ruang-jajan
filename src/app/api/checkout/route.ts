import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { generateCheckoutEmail } from './email';

// =====================================================
// CHECKOUT EMAIL API
// =====================================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { customerName, customerPhone, customerAddress, items, total, paymentMethod } = body;

        // Validate required fields
        if (!customerName || !customerPhone || !customerAddress || !items || !total || !paymentMethod) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate email content
        const { subject, html } = generateCheckoutEmail({
            customerName,
            customerPhone,
            customerAddress,
            items,
            total,
            paymentMethod,
        });

        // Send email
        const success = await sendEmail(
            process.env.CHECKOUT_EMAIL_TO || 'ahmadrafa063@gmail.com',
            subject,
            html
        );

        if (!success) {
            return NextResponse.json(
                { success: false, error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('[CHECKOUT EMAIL ERROR]:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
