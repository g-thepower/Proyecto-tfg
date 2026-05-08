import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./LogoutButton.css";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    delete api.defaults.auth;
    navigate("/");
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}
