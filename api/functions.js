export default function handler(req, res) {
  const key = process.env.GEMINI_API_KEY;

  return res.status(200).json({
    status: "ok",
    message: "Prueba de variable de entorno",
    envKeyLoaded: Boolean(key && key.trim() !== ""),
    // Esto nos dirá cuántos caracteres lee sin mostrar la clave:
    keyLength: key ? key.length : 0 
  });
}