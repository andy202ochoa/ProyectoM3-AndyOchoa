// 1. Requerimos la biblioteca oficial compatible con CommonJS
const { GoogleGenAI } = require('@google/genai');

module.exports = async (req, res) => {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    // 2. CORRECCIÓN CLAVE: Instanciamos el cliente DENTRO de la función para asegurar
    // que la API Key inyectada por Vercel sea leída en tiempo de ejecución de la solicitud.
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    // 3. Ejecutamos la llamada al modelo estándar
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