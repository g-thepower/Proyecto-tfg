import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import "./ClienteEditForm.css";

export default function ClienteEditForm({ cliente, onCancel, onClienteActualizado }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre);
      setEmail(cliente.email);
      setTelefono(cliente.telefono);
      setDireccion(cliente.direccion);
    }
  }, [cliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/clientes/${cliente.id}`, {
        nombre,
        email,
        telefono,
        direccion
      });

      onClienteActualizado(response.data);
    } catch (err) {
      console.error("Error actualizando cliente:", err);
    }
  };

  return (
    <form className="cliente-edit-form" onSubmit={handleSubmit}>
      <h3>Editando cliente: {cliente.nombre}</h3>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />

      <input
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />

      <div className="edit-buttons">
        <button type="submit" className="guardar">Guardar cambios</button>
        <button type="button" className="cancelar" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
