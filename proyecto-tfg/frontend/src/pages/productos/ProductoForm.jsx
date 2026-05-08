import { useState } from "react";
import api from "../../api/axiosConfig";
import "./ProductoForm.css";

export default function ProductoForm({ onProductoCreado }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [iva, setIva] = useState("");
  const [activo, setActivo] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/productos", {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        iva: parseFloat(iva),
        activo
      });

      onProductoCreado(res.data);

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setIva("");
      setActivo(true);

    } catch (err) {
      console.error("Error creando producto:", err);
    }
  };

  return (
    <form className="producto-form" onSubmit={handleSubmit}>
      <h3>Crear producto</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="IVA (%)"
        value={iva}
        onChange={(e) => setIva(e.target.value)}
        required
      />

      <label className="checkbox-label">
        <span>Activo</span>
        <input
          type="checkbox"
          checked={activo}
          onChange={(e) => setActivo(e.target.checked)}
        />
      </label>

      <button type="submit">Crear</button>
    </form>
  );
}
