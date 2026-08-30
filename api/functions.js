
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    const { message, character } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const prompt = `
    Responde como ${character}.
    Estilo cyberpunk, respuestas cortas.

    Usuario: ${message}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      reply: response.text
    });

  } catch (error) {
    console.error("🔥 ERROR GEMINI:", error);

    res.status(500).json({
      error: error.message
    });
  }
}