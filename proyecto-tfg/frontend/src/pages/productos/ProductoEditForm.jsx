import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import "./ProductoEditForm.css";

export default function ProductoEditForm({ producto, onCancel, onProductoActualizado }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [iva, setIva] = useState("");
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setIva(producto.iva);
      setActivo(producto.activo);
    }
  }, [producto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/productos/${producto.id}`, {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        iva: parseFloat(iva),
        activo
      });

      onProductoActualizado(res.data);
    } catch (err) {
      console.error("Error actualizando producto:", err);
    }
  };

  return (
    <form className="producto-edit-form" onSubmit={handleSubmit}>
      <h3>Editando producto: {producto.nombre}</h3>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />

      <input
        type="number"
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

      <div className="edit-buttons">
        <button type="submit" className="guardar">Guardar cambios</button>
        <button type="button" className="cancelar" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
