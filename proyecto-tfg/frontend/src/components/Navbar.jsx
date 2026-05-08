import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/clientes">Clientes</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/facturas">Facturas</Link>
        <Link to="/informes">Informes</Link>
      </div>

      <LogoutButton />
    </nav>
  );
}
