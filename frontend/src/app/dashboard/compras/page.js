"use client";

import { useState, useEffect } from "react";
import { createCompra, getCompras, deleteCompra } from "../../../lib/api";

export default function ComprasPage() {
  const [idProveedor, setIdProveedor] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [cantidadCompra, setCantidadCompra] = useState("");
  const [totalCompra, setTotalCompra] = useState("");
  const [fecha, setFecha] = useState("");
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    fetchCompras();
  }, []);

  async function fetchCompras() {
    try {
      const data = await getCompras();
      console.log("Compras obtenidas:", data);
      setCompras(data);
    } catch (error) {
      console.error("Error al obtener compras:", error);
      alert("Error al obtener compras");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!idProveedor || !idProducto || !cantidadCompra || !totalCompra || !fecha) {
      alert("Todos los campos son requeridos");
      return;
    }
    try {
      const compraData = {
        idProveedor: parseInt(idProveedor, 10),
        idProducto: parseInt(idProducto, 10),
        cantidadCompra: parseInt(cantidadCompra, 10),
        totalCompra: parseFloat(totalCompra),
        fecha, // Asume que el backend acepta una fecha en formato string (YYYY-MM-DD)
      };
      const response = await createCompra(compraData);
      console.log("Compra registrada:", response);
      alert("Compra registrada con éxito");
      // Limpiar campos
      setIdProveedor("");
      setIdProducto("");
      setCantidadCompra("");
      setTotalCompra("");
      setFecha("");
      fetchCompras();
    } catch (error) {
      console.error("Error al registrar compra:", error);
      alert("Ocurrió un error al registrar la compra");
    }
  }

  async function handleDeleteCompra(idCompra) {
    if (!confirm("¿Estás seguro de eliminar esta compra?")) return;
    try {
      await deleteCompra(idCompra);
      alert("Compra eliminada exitosamente.");
      fetchCompras();
    } catch (error) {
      console.error("Error al eliminar compra:", error);
      alert("Ocurrió un error al eliminar la compra");
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Compras</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="number"
          placeholder="ID Proveedor"
          value={idProveedor}
          onChange={(e) => setIdProveedor(e.target.value)}
        />
        <input
          type="number"
          placeholder="ID Producto"
          value={idProducto}
          onChange={(e) => setIdProducto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad Comprada"
          value={cantidadCompra}
          onChange={(e) => setCantidadCompra(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Compra"
          value={totalCompra}
          onChange={(e) => setTotalCompra(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button type="submit">Registrar Compra</button>
      </form>

      <hr />

      <h2>Lista de Compras</h2>
      <ul>
        {compras.map((compra, index) => (
          <li key={compra.idCompra || index} style={{ marginBottom: "0.5rem" }}>
            <span>
              Compra #{compra.idCompra}: Proveedor {compra.idProveedor} - Producto {compra.idProducto} - 
              Cantidad {compra.cantidadCompra} - Total ${compra.totalCompra} - Fecha {compra.fecha}
            </span>
            <button
              onClick={() => handleDeleteCompra(compra.idCompra)}
              style={{
                marginLeft: "1rem",
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.25rem 0.5rem",
                cursor: "pointer"
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
