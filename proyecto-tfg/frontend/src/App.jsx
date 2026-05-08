import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Clientes from "./pages/clientes";
import Productos from "./pages/productos";
import Facturas from "./pages/facturas";
import FacturaForm from "./pages/facturas/FacturaForm";
import FacturaDetalle from "./pages/facturas/FacturaDetalle";
import Informes from "./pages/informes";
import IngresosMensuales from "./pages/informes/IngresosMensuales";
import IngresosPorCliente from "./pages/informes/IngresosPorCliente";
import InformeEntreFechas from "./pages/informes/InformeEntreFechas";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <Clientes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/facturas"
          element={
            <ProtectedRoute>
              <Facturas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/facturas/:id"
          element={
            <ProtectedRoute>
              <FacturaDetalle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/facturas/nueva"
          element={
            <ProtectedRoute>
              <FacturaForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/informes"
          element={
          <ProtectedRoute>
            <Informes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/informes/por-mes"
          element={
            <ProtectedRoute>
              <IngresosMensuales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/informes/por-cliente"
          element={
          <ProtectedRoute>
            <IngresosPorCliente />
            </ProtectedRoute>
          }
        />

        <Route
        path="/informes/entre-fechas"
        element={
        <ProtectedRoute>
          <InformeEntreFechas />
          </ProtectedRoute>
        }
        />


      </Routes>
    </BrowserRouter>
  );
}
