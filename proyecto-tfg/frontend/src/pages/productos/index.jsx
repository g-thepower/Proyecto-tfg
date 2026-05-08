import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProductosList from "./ProductosList";
import api from "../../api/axiosConfig";
import ProductoForm from "./ProductoForm";
import ProductoEditForm from "./ProductoEditForm";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    api.get("/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  const handleEliminarProducto = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      await api.delete(`/productos/${id}`);

      // Actualizar la lista sin recargar
      setProductos(productos.filter(p => p.id !== id));

    } catch (err) {
      console.error("Error eliminando producto:", err);
    }
  };

  const handleProductoCreado = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  const handleProductoActualizado = (productoActualizado) => {
    setProductos(productos.map(p =>
      p.id === productoActualizado.id ? productoActualizado : p
    ));
    setProductoEditando(null);
  };


  return (
    <div>
      <Navbar />
      <h1>Gestión de Productos</h1>

      {productoEditando ? (
        <ProductoEditForm
          producto={productoEditando}
          onCancel={() => setProductoEditando(null)}
          onProductoActualizado={handleProductoActualizado}
        />
      ) : (
        <ProductoForm onProductoCreado={handleProductoCreado} />
      )}

      <ProductosList
        productos={productos}
        onEdit={setProductoEditando}
        onDelete={handleEliminarProducto}
      />
    </div>
  );
}
