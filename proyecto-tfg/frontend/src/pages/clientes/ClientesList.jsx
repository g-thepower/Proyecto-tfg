import "./ClientesList.css";

export default function ClientesList({ clientes, onEdit, onDelete }) {
  return (
    <div className="clientes-container">
      <h2 className="clientes-titulo">Clientes</h2>

      <div className="tabla-wrapper">
        <table className="clientes-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
                <td>{c.direccion}</td>
                <td className="acciones">
                  <button className="btn editar" onClick={() => onEdit(c)}>
                    Editar
                  </button>
                  <button className="btn eliminar" onClick={() => onDelete(c.id)}>
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
