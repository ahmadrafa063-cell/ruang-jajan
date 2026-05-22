import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { event, data } = req.body;

    console.log("TRACK MASUK");
    console.log(event);
    console.log(data);

    await prisma.trackingEvent.create({
      data: {
        event,
        data,
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("MAU KIRIM EMAIL");

    const emailText = data.message ? data.message : JSON.stringify(data, null, 2);

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "ahmadrafa063@gmail.com",
      subject: `🚀 ${event}`,
      text: emailText,
    });

    console.log("EMAIL BERHASIL");

    return res.status(200).json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: String(error) });
  }
}
