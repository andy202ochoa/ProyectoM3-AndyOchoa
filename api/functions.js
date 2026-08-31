module.exports = async (req, res) => {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    // Unimos la URL y la llave usando concatenación clásica
    const url = "https://googleapis.com" + process.env.GEMINI_API_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorTexto = await response.text();
      console.error("❌ Error de respuesta de Google:", errorTexto);
      return res.status(response.status).json({
        error: "Google respondió con estado " + response.status
      });
    }

    const data = await response.json();
    console.log("📦 RESPUESTA COMPLETA DE GEMINI:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(data.error.code || 400).json({ 
        error: "Error interno de la API: " + data.error.message
      });
    }

    // CORRECCIÓN DE SINTAXIS: Encadenamiento opcional simple y limpio
    let botReply = "Sin respuesta del modelo.";
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      botReply = data.candidates[0].content.parts[0].text;
    }

    return res.status(200).json({
      reply: botReply 
    });

  } catch (error) {
    console.error("🔥 ERROR GENERAL DEL BACKEND:", error);
    return res.status(500).json({
      error: error.message
    });
  }
};