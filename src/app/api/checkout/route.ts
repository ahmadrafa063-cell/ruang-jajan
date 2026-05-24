import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { orderSuccessEmail } from "@/lib/email-templates";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
    console.log("[CHECKOUT] TRIGGERED")

    try {
        const body = await req.json();
        console.log("[CHECKOUT] ORDER PROCESSING STARTED")

        const order = await prisma.order.create({
            data: {
                userId: body.userId,
                totalPrice: body.totalPrice,
                status: "paid",
            },
        });

        console.log("[CHECKOUT] ORDER CREATED:", order.id)

        // Send order confirmation email to user
        if (body.email) {
            console.log("[EMAIL] Sending order confirmation to:", body.email)
            const { subject, html } = orderSuccessEmail(
                body.name || 'Customer',
                order.id,
                new Date(),
                body.totalPrice,
                []
            );
            await sendEmail(body.email, subject, html);
            console.log("[EMAIL] Order confirmation sent successfully")
        } else {
            console.log("[EMAIL] No email provided, skipping notification")
        }

        return NextResponse.json({
            success: true,
            order,
        });

    } catch (error: any) {
        console.error("[CHECKOUT ERROR]:", error.message)
        console.error("[CHECKOUT FULL ERROR]:", JSON.stringify(error))

        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}