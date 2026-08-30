export default async function handler(req, res) {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    const url = "https://googleapis.com";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY || ""
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    console.log("📦 RESPUESTA COMPLETA:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(data.error.code || 400).json({ 
        error: `Error de Google: ${data.error.message}` 
      });
    }

    // CORRECCIÓN: Sintaxis limpia de encadenamiento opcional (?.) para evitar romper el backend
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta del modelo.";

    res.status(200).json({
      reply: botReply 
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
}
