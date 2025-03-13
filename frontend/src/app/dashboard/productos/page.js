"use client";

import { useState } from "react";
import { createProducto } from "../../../lib/api";

export default function ProductosPage() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nombre || !precio || !descripcion) {
      alert("Todos los campos son requeridos");
      return;
    }
    try {
      await createProducto({
        nombre,
        precio: parseFloat(precio),
        descripcion,
      });
      alert("Producto creado con éxito");
      setNombre("");
      setPrecio("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Ocurrió un error al crear el producto");
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Crear Producto</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}
