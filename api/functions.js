export default async function handler(req, res) {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    // 1. Cambiamos la URL para no pasar la llave AQ en la URL expuesta y usamos v1beta
    const url = "https://googleapis.com";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 2. Pasamos la API Key AQ de forma segura en los headers recomendados por Google
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
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

    // 3. Manejo de errores si Google responde algo mal (ej: API key inválida)
    if (data.error) {
      return res.status(data.error.code || 400).json({ error: data.error.message });
    }

    // 4. Extraemos el texto limpio del JSON estructurado de Gemini
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta.";

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