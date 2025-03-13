"use client";

import { useState, useEffect } from "react";
import { getProductos } from "../../../lib/api";

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
          </div>
        ))}
      </div>
    </div>
  );
}
