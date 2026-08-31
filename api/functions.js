// 1. Requerimos axios en lugar del fetch nativo
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    // 2. Definimos la URL REST limpia
    const url = "https://googleapis.com";

    // 3. Realizamos la petición usando Axios (Esto evita el error 'fetch failed' en Vercel)
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Pasamos la llave de forma segura en las cabeceras
          "x-goog-api-key": (process.env.GEMINI_API_KEY || "").trim()
        }
      }
    );

    // Axios guarda la respuesta del servidor directamente en .data
    const data = response.data;
    console.log("📦 RESPUESTA COMPLETA DE GEMINI:", JSON.stringify(data, null, 2));

    let botReply = "Sin respuesta del modelo.";
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      botReply = data.candidates[0].content.parts[0].text;
    }

    return res.status(200).json({
      reply: botReply 
    });

  } catch (error) {
    // Si Axios arroja un error de respuesta del servidor (ej: Clave inválida)
    if (error.response) {
      console.error("❌ Error de la API de Google:", JSON.stringify(error.response.data, null, 2));
      return res.status(error.response.status).json({
        error: error.response.data.error?.message || "Error en la API de Gemini"
      });
    }

    console.error("🔥 ERROR GENERAL DEL BACKEND:", error.message);
    return res.status(500).json({
      error: error.message
    });
  }
};
