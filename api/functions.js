export default async function handler(req, res) {
  try {
    const { message, character } = req.body;

    console.log("🔑 KEY:", process.env.GEMINI_API_KEY ? "EXISTE" : "NO EXISTE");

    const prompt = `
Responde como ${character}.
Estilo cyberpunk, respuestas cortas.

Usuario: ${message}
`;

    // 1. URL REST oficial corregida para Gemini en v1beta
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

    // 2. CONTROL DE PROTECCIÓN: Si Google responde con un error HTTP (como HTML), lo atrapamos aquí sin romper el servidor
    if (!response.ok) {
      const errorTexto = await response.text();
      console.error("❌ Error de respuesta de Google (HTML/Texto):", errorTexto);
      return res.status(response.status).json({
        error: `Google respondió con estado ${response.status}. Revisa los logs del servidor.`
      });
    }

    // 3. Si la respuesta fue OK (200), ahora sí es seguro procesar el JSON
    const data = await response.json();
    console.log("📦 RESPUESTA COMPLETA DE GEMINI:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(data.error.code || 400).json({ 
        error: `Error interno de la API: ${data.error.message}` 
      });
    }

    // 4. Extracción segura del texto
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
}