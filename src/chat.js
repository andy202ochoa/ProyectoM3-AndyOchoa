const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const chat = document.getElementById("chatMessages");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita que recargue la página

  const mensaje = input.value.trim();

  if (mensaje === "") return;