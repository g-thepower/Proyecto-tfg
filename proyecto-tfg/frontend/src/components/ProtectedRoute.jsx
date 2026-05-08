import { Navigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function ProtectedRoute({ children }) {
  // Si no hay credenciales guardadas en Axios, no dejamos pasar
  if (!api.defaults.auth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
