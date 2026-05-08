import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Facturas.css";

export default function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/facturas")
      .then(res => setFacturas(res.data))
      .catch(err => console.error("Error cargando facturas:", err));
  }, []);

  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta factura?")) return;

    try {
      await api.delete(`/facturas/${id}`);
      setFacturas(facturas.filter(f => f.id !== id));
    } catch (err) {
      console.error("Error eliminando factura:", err);
    }
  };

  const handlePdf = (id) => {
    window.open(`http://localhost:8080/api/facturas/${id}/pdf`, "_blank");
  };

  return (
    <div>
      <Navbar />

      <div className="facturas-container">
        <h1 className="facturas-titulo">Facturas</h1>

        <button
          className="btn crear-factura"
          onClick={() => navigate("/facturas/nueva")}
        >
          Crear factura
        </button>

        <div className="tabla-wrapper">
          <table className="facturas-tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Base</th>
                <th>IVA</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {facturas.map(f => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.fecha}</td>
                  <td>{f.cliente?.nombre}</td>
                  <td>{f.baseImponible.toFixed(2)}</td>
                  <td>{f.ivaTotal.toFixed(2)}</td>
                  <td>{f.total.toFixed(2)}</td>
                  <td className="acciones">
                    <button
                      className="btn ver"
                      onClick={() => navigate(`/facturas/${f.id}`)}
                    >
                      Ver
                    </button>

                    <button
                      className="btn eliminar"
                      onClick={() => handleEliminar(f.id)}
                    >
                      Eliminar
                    </button>

                    <button
                      className="btn pdf"
                      onClick={() => handlePdf(f.id)}
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

