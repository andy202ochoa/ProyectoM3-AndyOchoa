// 1. Importamos el SDK oficial de Google GenAI
import { GoogleGenAI } from '@google/genai';

// 2. Inicializamos el cliente. El SDK toma automáticamente process.env.GEMINI_API_KEY
const ai = new GoogleGenAI();

export default async function handler(req, res) {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    // 3. Llamada nativa usando el SDK oficial (Evita errores de URLs manuales)
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    // 4. El SDK nos entrega el texto limpio directamente en la propiedad .text
    const botReply = response.text || "Sin respuesta del modelo.";

    res.status(200).json({
      reply: botReply 
    });

  } catch (error) {
    console.error("🔥 ERROR GENERAL DEL BACKEND:", error);
    res.status(500).json({
      error: error.message
    });
  }
}