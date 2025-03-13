"use client";

import { useState, useEffect } from "react";
import { createVenta, getVentas } from "../../../lib/api";

export default function VentasPage() {
  const [idCliente, setIdCliente] = useState("");
  const [idEmpleado, setIdEmpleado] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [totalVenta, setTotalVenta] = useState("");
  const [cantidadVenta, setCantidadVenta] = useState("");
  const [fecha, setFecha] = useState("");
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetchVentas();
  }, []);

  async function fetchVentas() {
    try {
      const data = await getVentas();
      console.log("Ventas obtenidas:", data);
      setVentas(data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      alert("Error al obtener ventas");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!idCliente || !idEmpleado || !idProducto || !totalVenta || !cantidadVenta || !fecha) {
      alert("Todos los campos son requeridos");
      return;
    }
    try {
      const ventaData = {
        idCliente: parseInt(idCliente, 10),
        idEmpleado: parseInt(idEmpleado, 10),
        idProducto: parseInt(idProducto, 10),
        totalVenta: parseFloat(totalVenta),
        cantidadVenta: parseInt(cantidadVenta, 10),
        fecha
      };
      const response = await createVenta(ventaData);
      console.log("Venta registrada:", response);
      alert("Venta registrada con éxito");
      // Limpiar campos
      setIdCliente("");
      setIdEmpleado("");
      setIdProducto("");
      setTotalVenta("");
      setCantidadVenta("");
      setFecha("");
      fetchVentas();
    } catch (error) {
      console.error("Error al registrar venta:", error);
      alert("Ocurrió un error al registrar la venta");
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Ventas</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="number"
          placeholder="ID Cliente"
          value={idCliente}
          onChange={(e) => setIdCliente(e.target.value)}
        />
        <input
          type="number"
          placeholder="ID Empleado"
          value={idEmpleado}
          onChange={(e) => setIdEmpleado(e.target.value)}
        />
        <input
          type="number"
          placeholder="ID Producto"
          value={idProducto}
          onChange={(e) => setIdProducto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Venta"
          value={totalVenta}
          onChange={(e) => setTotalVenta(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad Venta"
          value={cantidadVenta}
          onChange={(e) => setCantidadVenta(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button type="submit">Registrar Venta</button>
      </form>

      <hr />

      <h2>Lista de Ventas</h2>
      <ul>
        {ventas.map((venta, index) => (
          <li key={venta.idVenta || index}>
            Venta #{venta.idVenta}: Total: ${venta.totalVenta} - Cantidad: {venta.cantidadVenta} - Fecha: {venta.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}
