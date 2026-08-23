const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const chat = document.getElementById("chatMessages");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita que recargue la página

  const mensaje = input.value.trim();

  if (mensaje === "") return;
   // crear el mensaje
  const div = document.createElement("div");
  div.classList.add("chatUser");
  div.textContent = mensaje;

  // agregar al chat
  chat.appendChild(div);

  // limpiar input
  input.value = "";

  // scroll automático hacia abajo
  chat.scrollTop = chat.scrollHeight;
});