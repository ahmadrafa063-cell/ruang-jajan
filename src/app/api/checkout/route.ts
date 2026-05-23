import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { welcomeEmail } from "@/lib/email-templates";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("CHECKOUT TRIGGERED")

    try {

        const body = await req.json();
        console.log("ORDER PROCESSING STARTED")

        const order = await prisma.order.create({
            data: {
                userId: body.userId,
                totalPrice: body.totalPrice,
                status: "paid",
            },
        });

        // Send welcome email to user (non-blocking)
        if (body.email) {
            const { subject, html } = welcomeEmail(body.name || 'Customer', body.email);
            sendEmail(body.email, subject, html).catch(console.error);
        }

        return NextResponse.json({
            success: true,
            order,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json({
            success: false,
            error,
        });
    }
}