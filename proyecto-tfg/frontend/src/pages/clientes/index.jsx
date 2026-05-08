import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ClientesList from "./ClientesList";
import ClienteForm from "./ClienteForm";
import ClienteEditForm from "./ClienteEditForm";
import api from "../../api/axiosConfig";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);

  const cargarClientes = async () => {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data);
    } catch (err) {
      console.error("Error cargando clientes:", err);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleClienteCreado = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente]);
  };

  const handleClienteActualizado = (clienteActualizado) => {
    setClientes(
      clientes.map(c => c.id === clienteActualizado.id ? clienteActualizado : c)
    );
    setClienteEditando(null);
  };

  const handleEliminarCliente = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este cliente?")) {
      return;
    }

    try {
      await api.delete(`/clientes/${id}`);

      // Quitarlo de la lista sin recargar
      setClientes(clientes.filter(c => c.id !== id));

    } catch (err) {
      console.error("Error eliminando cliente:", err);
    }
  };


  return (
    <div>
      <Navbar />

      <h1 className="clientes-titulo">Clientes</h1>

      {clienteEditando ? (
        <ClienteEditForm
          cliente={clienteEditando}
          onCancel={() => setClienteEditando(null)}
          onClienteActualizado={handleClienteActualizado}
        />
      ) : (
        <ClienteForm onClienteCreado={handleClienteCreado} />
      )}


      <ClientesList
        clientes={clientes} 
        onEdit={setClienteEditando} 
        onDelete={handleEliminarCliente}
      />

    </div>
  );
}
