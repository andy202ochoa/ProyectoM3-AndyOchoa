const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const chat = document.getElementById("chatMessages");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const mensaje = input.value.trim();
      if (!mensaje) return;

      const div = document.createElement("div");
      div.classList.add("chatUser");
      div.textContent = mensaje;

      chat.appendChild(div);
      input.value = "";

      chat.scrollTop = chat.scrollHeight;
    });
  