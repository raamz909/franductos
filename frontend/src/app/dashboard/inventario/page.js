"use client";

import { useState, useEffect } from "react";
import { getProductos, deleteProducto } from "../../../lib/api";  // Asegúrate de tener una función `deleteProducto` en tu API

export default function InventarioPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    try {
      const data = await getProductos();
      console.log("Productos disponibles:", data);
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      alert("Error al obtener productos");
    }
  }

  async function handleEliminarProducto(idProducto) {
    try {
      await deleteProducto(idProducto); // Esta función debe estar definida en tu API para eliminar un producto
      // Una vez que el producto es eliminado, actualizamos el estado para eliminarlo del listado
      setProductos(prevProductos => prevProductos.filter(prod => prod.idProducto !== idProducto));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Error al eliminar producto");
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Inventario: Productos Disponibles
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {productos.map((prod) => (
          <div
            key={prod.idProducto}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "250px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              {prod.nombre}
            </h2>
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Precio:</strong> ${prod.precio}
            </p>
            <p style={{ margin: "0.5rem 0", color: "#555" }}>
              {prod.descripcion}
            </p>
            <button
              onClick={() => handleEliminarProducto(prod.idProducto)}
              style={{
                backgroundColor: "#f44336", // Rojo
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
