module.exports = async (req, res) => {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    // CORRECCIÓN: Se añade el signo de dólar ($) antes de las llaves para que lea la variable de entorno correctamente
    const url = `https://googleapis.com{process.env.GEMINI_API_KEY}`;

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
      console.error("❌ Error de respuesta de Google (HTML/Texto):", errorTexto);
      return res.status(response.status).json({
        error: `Google respondió con estado ${response.status}.`
      });
    }

    const data = await response.json();
    console.log("📦 RESPUESTA COMPLETA DE GEMINI:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(data.error.code || 400).json({ 
        error: `Error interno de la API: ${data.error.message}` 
      });
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta del modelo.";

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