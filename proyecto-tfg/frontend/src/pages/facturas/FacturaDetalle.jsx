import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import Navbar from "../../components/Navbar";
import "./FacturaDetalle.css";

export default function FacturaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [factura, setFactura] = useState(null);

  useEffect(() => {
    api.get(`/facturas/${id}`)
      .then(res => setFactura(res.data))
      .catch(err => console.error("Error cargando factura:", err));
  }, [id]);

  if (!factura) return <div className="cargando">Cargando factura...</div>;

  const handlePdf = () => {
    window.open(`http://localhost:8080/api/facturas/${id}/pdf`, "_blank");
  };

  return (
    <div>
      <Navbar />

      <div className="factura-container">
        <h1 className="factura-titulo">Factura #{factura.id}</h1>

        <div className="factura-card">
          <h3>Cliente</h3>
          <p><strong>Nombre:</strong> {factura.cliente.nombre}</p>
          <p><strong>Email:</strong> {factura.cliente.email}</p>

          <h3>Detalles</h3>
          <p><strong>Fecha:</strong> {factura.fecha}</p>

          <h3>Líneas</h3>
          <div className="tabla-wrapper">
            <table className="factura-tabla">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {factura.lineas.map((l, i) => (
                  <tr key={i}>
                    <td>{l.producto.nombre}</td>
                    <td>{l.cantidad}</td>
                    <td>{l.producto.precio.toFixed(2)}</td>
                    <td>{(l.cantidad * l.producto.precio).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Totales</h3>
          <p><strong>Base imponible:</strong> {factura.baseImponible.toFixed(2)} €</p>
          <p><strong>IVA:</strong> {factura.ivaTotal.toFixed(2)} €</p>
          <p><strong>Total:</strong> {factura.total.toFixed(2)} €</p>

          <div className="factura-botones">
            <button className="btn volver" onClick={() => navigate("/facturas")}>
              Volver
            </button>
            <button className="btn pdf" onClick={handlePdf}>
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}