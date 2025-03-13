"use client";

import { useState } from "react";
import { createCliente, getClientes } from "../../../lib/api";

export default function ClientesPage() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [clientes, setClientes] = useState([]);
  const [mostrarClientes, setMostrarClientes] = useState(false);

  async function fetchClientes() {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      alert("Error al obtener clientes");
    }
  }

  async function handleCrear(e) {
    e.preventDefault();
    if (!nombre || !direccion || !telefono) {
      alert("Todos los campos son requeridos");
      return;
    }
    try {
      await createCliente({ nombre, direccion, telefono });
      alert("Cliente creado con éxito");
      setNombre("");
      setDireccion("");
      setTelefono("");
      if (mostrarClientes) fetchClientes();
    } catch (error) {
      console.error("Error al crear cliente:", error);
      alert("Ocurrió un error al crear el cliente");
    }
  }

  function handleVerClientes() {
    // Alterna la visualización y, si se activa, carga los clientes.
    if (!mostrarClientes) {
      fetchClientes();
    }
    setMostrarClientes(!mostrarClientes);
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Clientes</h1>
      <form onSubmit={handleCrear} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <button type="submit">Crear Cliente</button>
      </form>
      <button onClick={handleVerClientes} style={{ marginTop: "1rem" }}>
        {mostrarClientes ? "Ocultar Clientes" : "Ver Clientes"}
      </button>
      {mostrarClientes && (
        <div>
          <h2>Lista de Clientes</h2>
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.idCliente}>
                {cliente.nombre} - {cliente.direccion} - {cliente.telefono}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
