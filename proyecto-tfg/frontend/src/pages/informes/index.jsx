import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import "./Informes.css";

export default function Informes() {
  return (
    <div>
      <Navbar />

      <div className="informes-container">
        <h1 className="informes-titulo">Informes</h1>

        <p className="informes-descripcion">
          Selecciona un informe para ver los detalles:
        </p>

        <ul className="informes-lista">
          <li>
            <Link className="informe-link" to="/informes/por-mes">
              Ingresos mensuales
            </Link>
          </li>

          <li>
            <Link className="informe-link" to="/informes/por-cliente">
              Ingresos por cliente
            </Link>
          </li>

          <li>
            <Link className="informe-link" to="/informes/entre-fechas">
              Informe entre fechas
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
