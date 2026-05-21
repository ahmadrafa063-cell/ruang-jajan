import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

async function startServer() {

  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // TEST EMAIL
  app.get("/api/test-email", async (req, res) => {

    try {

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "ahmadrafa063@gmail.com",
        subject: "🚀 TEST EMAIL",
        text: "Email berhasil dikirim",
      });

      console.log(info);

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.json({
        success: false,
        error,
      });
    }
  });

  app.post("/api/track", async (req, res) => {

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
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
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

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.json({
        success: false,
        error,
      });
    }
  });

  // HEALTH
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
    });
  });

  // VITE
  if (process.env.NODE_ENV !== "production") {

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);

  } else {

    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();