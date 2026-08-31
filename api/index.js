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

    const url = "https://googleapis.com";

    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": (process.env.GEMINI_API_KEY || "").trim()
        }
      }
    );

    const data = response.data;
    let botReply = "Sin respuesta del modelo.";
    
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      botReply = data.candidates[0].content.parts[0].text;
    }

    return res.status(200).json({ reply: botReply });

  } catch (error) {
    if (error.response) {
      console.error("❌ Error de la API de Google:", JSON.stringify(error.response.data, null, 2));
      return res.status(error.response.status).json({
        error: error.response.data.error?.message || "Error en la API de Gemini"
      });
    }
    console.error("🔥 ERROR GENERAL DEL BACKEND:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
