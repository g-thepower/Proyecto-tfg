import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Restaurar auth desde localStorage al arrancar
const savedAuth = localStorage.getItem("auth");
if (savedAuth) {
  api.defaults.auth = JSON.parse(savedAuth);
}

// Guardar auth cuando el usuario haga login
export function setAuth(username, password) {
  const auth = { username, password };
  api.defaults.auth = auth;
  localStorage.setItem("auth", JSON.stringify(auth));
}

export default api;
