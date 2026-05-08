import React from "react";
import "./ProductosList.css";

export default function ProductosList({ productos, onEdit, onDelete }) {
  return (
    <div className="productos-container">
      <h2 className="productos-titulo">Productos</h2>

      <div className="tabla-wrapper">
        <table className="productos-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>IVA (%)</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>{p.iva}</td>
                <td>{p.activo ? "Sí" : "No"}</td>
                <td className="acciones">
                  <button className="btn editar" onClick={() => onEdit(p)}>
                    Editar
                  </button>
                  <button className="btn eliminar" onClick={() => onDelete(p.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
