import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./FacturaForm.css";

export default function FacturaForm() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [clienteId, setClienteId] = useState("");
  const [lineas, setLineas] = useState([{ productoId: "", cantidad: 1 }]);

  useEffect(() => {
    api.get("/clientes").then(res => setClientes(res.data));
    api.get("/productos").then(res => setProductos(res.data));
  }, []);

  const agregarLinea = () => {
    setLineas([...lineas, { productoId: "", cantidad: 1 }]);
  };

  const eliminarLinea = (index) => {
    setLineas(lineas.filter((_, i) => i !== index));
  };

  const actualizarLinea = (index, campo, valor) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index][campo] = valor;
    setLineas(nuevasLineas);
  };

  const crearFactura = async () => {
    const payload = {
      clienteId,
      lineas: lineas.map(l => ({
        productoId: Number(l.productoId),
        cantidad: Number(l.cantidad)
      }))
    };

    try {
      await api.post("/facturas", payload);
      navigate("/facturas");
    } catch (err) {
      console.error("Error creando factura:", err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="factura-form-container">
        <h1 className="factura-form-titulo">Nueva Factura</h1>

        <div className="factura-form-card">

          <label className="campo-label">Cliente</label>
          <select
            className="campo-select"
            value={clienteId}
            onChange={e => setClienteId(e.target.value)}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>

          <h2 className="lineas-titulo">Líneas</h2>

          {lineas.map((linea, index) => (
            <div key={index} className="linea-row">
              <select
                className="campo-select"
                value={linea.productoId}
                onChange={e => actualizarLinea(index, "productoId", e.target.value)}
              >
                <option value="">Seleccione producto</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>

              <input
                className="campo-input"
                type="number"
                min="1"
                value={linea.cantidad}
                onChange={e => actualizarLinea(index, "cantidad", e.target.value)}
              />

              <button className="btn eliminar" onClick={() => eliminarLinea(index)}>
                Eliminar
              </button>
            </div>
          ))}

          <button className="btn agregar" onClick={agregarLinea}>
            Agregar línea
          </button>

          <div className="acciones-finales">
            <button className="btn volver" onClick={() => navigate("/facturas")}>
              Cancelar
            </button>
            <button className="btn crear" onClick={crearFactura}>
              Crear factura
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
