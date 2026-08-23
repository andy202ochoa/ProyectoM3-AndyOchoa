import Home from "./views/home.js";
import Chat from "./views/chat.js";
import About from "./views/about.js";

export const routes = [
  { path: "/", view: Home },
  { path: "/chat", view: Chat },
  { path: "/about", view: About }
];