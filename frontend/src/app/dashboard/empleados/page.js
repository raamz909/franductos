"use client";

import { useState, useEffect } from "react";
import { createEmpleado, getEmpleados } from "../../../lib/api";

export default function EmpleadosPage() {
  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");
  const [salario, setSalario] = useState("");
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  async function fetchEmpleados() {
    try {
      const data = await getEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      alert("Error al obtener empleados");
    }
  }

  async function handleCrearEmpleado(e) {
    e.preventDefault();
    if (!nombre || !puesto || salario === "") {
      alert("Todos los campos son requeridos");
      return;
    }
    try {
      await createEmpleado({
        nombre,
        puesto,
        salario: parseFloat(salario)
      });
      alert("Empleado creado con éxito");
      setNombre("");
      setPuesto("");
      setSalario("");
      fetchEmpleados();
    } catch (error) {
      console.error("Error al crear empleado:", error);
      alert("Ocurrió un error al crear el empleado");
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Empleados</h1>
      <form onSubmit={handleCrearEmpleado} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Puesto"
          value={puesto}
          onChange={(e) => setPuesto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Salario"
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
        />
        <button type="submit">Crear Empleado</button>
      </form>

      <hr />

      <h2>Lista de Empleados</h2>
      <ul>
        {empleados.map((emp) => (
          <li key={emp.idEmpleado}>
            {emp.nombre} - {emp.puesto} - Salario: {emp.salario}
          </li>
        ))}
      </ul>
    </div>
  );
}
