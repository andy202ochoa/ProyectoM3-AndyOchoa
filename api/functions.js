// 1. Importación nativa mediante require (Obligatorio en CommonJS)
const { GoogleGenAI } = require('@google/genai');

// 2. Inicializamos el cliente oficial de Google
const ai = new GoogleGenAI();

// 3. Exportación tradicional para Serverless Functions en Node.js estándar
module.exports = async (req, res) => {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    // 4. Invocación limpia mediante el SDK oficial
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

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
};