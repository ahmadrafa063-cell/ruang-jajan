import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const order = await prisma.order.create({
            data: {
                userId: body.userId,
                totalPrice: body.totalPrice,
                status: "paid",
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "🛒 Order Baru",
            html: `
        <h1>Order Baru Masuk</h1>
        <p>Total: Rp ${body.totalPrice}</p>
      `,
        });

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