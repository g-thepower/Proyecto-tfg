import { useState } from "react";
import api from "../../api/axiosConfig";
import "./ClienteForm.css";

export default function ClienteForm({ onClienteCreado }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/clientes", {
        nombre,
        email,
        telefono,
        direccion
      });

      if (onClienteCreado) {
        onClienteCreado(response.data);
      }

      setNombre("");
      setEmail("");
      setTelefono("");
      setDireccion("");

    } catch (err) {
      console.error("Error creando cliente:", err);
    }
  };

  return (
    <form className="cliente-form" onSubmit={handleSubmit}>
      <h3>Crear nuevo cliente</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />

      <button type="submit">Crear cliente</button>
    </form>
  );
}
