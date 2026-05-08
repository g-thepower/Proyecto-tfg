import { useState } from "react";
import api from "../../api/axiosConfig";
import Navbar from "../../components/Navbar";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

import "./InformeEntreFechas.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InformeEntreFechas() {
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [resultado, setResultado] = useState(null);

  const consultar = async (e) => {
    e.preventDefault();

    try {
      const res = await api.get(`/informes/entre-fechas?inicio=${inicio}&fin=${fin}`);
      setResultado(res.data);
    } catch (err) {
      console.error("Error cargando informe:", err);
    }
  };

  const chartData = resultado
    ? {
        labels: ["Total del periodo"],
        datasets: [
          {
            data: [resultado.total],
            backgroundColor: ["rgba(54, 162, 235, 0.6)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 1
          }
        ]
      }
    : null;

  return (
    <div>
      <Navbar />

      <div className="informe-container">
        <h1 className="informe-titulo">Informe entre fechas</h1>

        {/* FORMULARIO */}
        <form className="informe-form" onSubmit={consultar}>
          <div className="campo">
            <label>Fecha inicio</label>
            <input
              type="date"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Fecha fin</label>
            <input
              type="date"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn consultar">
            Consultar
          </button>
        </form>

        {/* RESULTADO */}
        {resultado && (
          <div className="resultado-card">
            <h2>{resultado.etiqueta}</h2>
            <h3>Total facturado: {resultado.total.toFixed(2)} €</h3>

            <div className="grafica">
              <Pie data={chartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
