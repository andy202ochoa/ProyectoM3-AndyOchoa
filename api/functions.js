export default async function handler(req, res) {
  return res.status(200).json({
    reply: "🔥 backend funcionando"
  });
}


/*import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const { message, character } = req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  // 🎭 PERSONALIDAD DEL BOT
  const prompt = `
  Responde como ${character}.
  Mantén personalidad, estilo cyberpunk y respuestas cortas.

  Usuario: ${message}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  res.status(200).json({
    reply: response.text
  });
}*/