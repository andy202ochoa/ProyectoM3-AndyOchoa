import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const { message } = req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });

  res.status(200).json({
    reply: response.text
  });
}