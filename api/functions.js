export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "API key no configurada" });
  }

  const { message, personality } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Falta el mensaje" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: personality || "Eres un asistente útil." }]
          },
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error de Gemini:", data);
      return res.status(response.status).json({ error: "Error al consultar Gemini", detail: data });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No hubo respuesta.";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Error en el handler:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}