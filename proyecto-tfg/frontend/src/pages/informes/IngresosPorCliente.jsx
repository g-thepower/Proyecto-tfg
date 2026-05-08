import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import Navbar from "../../components/Navbar";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

import "./IngresosPorCliente.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function IngresosPorCliente() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    api.get("/informes/por-cliente")
      .then(res => setDatos(res.data))
      .catch(err => console.error("Error cargando informe:", err));
  }, []);

  const labels = datos.map(fila => fila.etiqueta);
  const totals = datos.map(fila => fila.total);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total facturado (€)",
        data: totals,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="ingresos-container">
        <h1 className="ingresos-titulo">Ingresos por cliente</h1>

        {/* TABLA */}
        <div className="tabla-wrapper">
          <table className="ingresos-tabla">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Total facturado (€)</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((fila, i) => (
                <tr key={i}>
                  <td>{fila.etiqueta}</td>
                  <td>{fila.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="grafica-titulo">Gráfica de ingresos por cliente</h2>

        {/* GRÁFICA */}
        <div className="grafica">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
