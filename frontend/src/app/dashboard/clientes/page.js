"use client"; 

import { useState } from "react";
import { createCliente, getClientes, deleteCliente } from "../../../lib/api"; // Asegúrate de tener la función deleteCliente en tu API

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
      // Ahora esperamos que el backend devuelva el cliente con el idCliente
      const nuevoCliente = await createCliente({ nombre, direccion, telefono });
      alert("Cliente creado con éxito");

      // Añadimos el nuevo cliente a la lista
      setClientes((prevClientes) => [...prevClientes, nuevoCliente]);

      // Limpiamos los campos del formulario
      setNombre("");
      setDireccion("");
      setTelefono("");
    } catch (error) {
      console.error("Error al crear cliente:", error);
      alert("Ocurrió un error al crear el cliente");
    }
  }

  function handleVerClientes() {
    if (!mostrarClientes) {
      fetchClientes();
    }
    setMostrarClientes(!mostrarClientes);
  }

  async function handleEliminarCliente(idCliente) {
    if (!idCliente) {
      console.error("ID de cliente no válido:", idCliente);
      return;
    }

    try {
      await deleteCliente(idCliente); // Llamamos a la función de eliminar
      setClientes((prevClientes) => prevClientes.filter(cliente => cliente.idCliente !== idCliente));
      alert("Cliente eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      alert("Ocurrió un error al eliminar el cliente");
    }
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
              <li key={cliente.idCliente} style={{ marginBottom: "1rem" }}>
                <span>{cliente.nombre} - {cliente.direccion} - {cliente.telefono}</span>
                <button
                  onClick={() => handleEliminarCliente(cliente.idCliente)}
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: "#f44336", // Rojo
                    color: "#fff",
                    border: "none",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
