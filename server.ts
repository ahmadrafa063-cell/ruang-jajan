import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Initialization
  const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { currentItems, history } = req.body;
      const model = "gemini-3-flash-preview";
      
      const prompt = `As a modern food delivery AI, recommend 3 food items to accompany the current cart: ${JSON.stringify(currentItems)}. 
      User history: ${JSON.stringify(history)}. 
      Return ONLY a JSON array of recommendation objects with "name", "reason" (short), and "suggestedCategory".`;

      const result = await genAI.models.generateContent({
        model,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      res.json(JSON.parse(result.text || "[]"));
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  app.post("/api/track", async (req, res) => {
    try {
      const { event, data } = req.body;
      console.log(`Tracking Event: ${event}`, data);

      let transporter;
      if (!process.env.SMTP_USER) {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      } else {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      }

      const mailOptions = {
        from: '"RuangJajan Tracker" <tracker@ruangjajan.com>',
        to: 'ahmadrafa063@gmail.com',
        subject: `Tracking Alert: ${event}`,
        text: `Event: ${event}\nData: ${JSON.stringify(data, null, 2)}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      if (!process.env.SMTP_USER) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Tracking Error:", error);
      res.status(500).json({ error: "Failed to track event" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(3000, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
}

startServer();
