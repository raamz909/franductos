"use client";

import { useState, useEffect } from "react";
import { createEmpleado, getEmpleados, deleteEmpleado, updateEmpleado } from "../../../lib/api";

export default function EmpleadosPage() {
  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");
  const [salario, setSalario] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [empleadoEdit, setEmpleadoEdit] = useState(null);  // Estado para manejar la edición

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

  async function handleEliminarEmpleado(idEmpleado) {
    try {
      await deleteEmpleado(idEmpleado);
      alert("Empleado eliminado con éxito");
      fetchEmpleados();
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      alert("Ocurrió un error al eliminar el empleado");
    }
  }

  async function handleActualizarEmpleado(e) {
    e.preventDefault();
    if (!nombre || !puesto || salario === "") {
      alert("Todos los campos son requeridos");
      return;
    }

    // Asegurarse de que el ID del empleado sea pasado en la solicitud de actualización
    if (!empleadoEdit) {
      alert("No se ha seleccionado un empleado para actualizar");
      return;
    }

    try {
      // Aquí se utiliza `PUT` para actualizar el empleado
      await updateEmpleado(empleadoEdit.idEmpleado, {
        nombre,
        puesto,
        salario: parseFloat(salario)
      });
      alert("Empleado actualizado con éxito");
      setEmpleadoEdit(null);  // Limpiar el estado de edición
      setNombre("");
      setPuesto("");
      setSalario("");
      fetchEmpleados();
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      alert("Ocurrió un error al actualizar el empleado");
    }
  }

  function handleEditarEmpleado(empleado) {
    setEmpleadoEdit(empleado);  // Establecer el empleado a editar
    setNombre(empleado.nombre);
    setPuesto(empleado.puesto);
    setSalario(empleado.salario.toString());
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Empleados</h1>

      {/* Formulario para crear o actualizar empleado */}
      <form onSubmit={empleadoEdit ? handleActualizarEmpleado : handleCrearEmpleado} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
        <button type="submit">{empleadoEdit ? "Actualizar Empleado" : "Crear Empleado"}</button>
      </form>

      <hr />

      {/* Lista de empleados */}
      <h2>Lista de Empleados</h2>
      <ul>
        {empleados.map((emp) => (
          <li key={emp.idEmpleado}>
            {emp.nombre} - {emp.puesto} - Salario: {emp.salario} 
            <button 
              onClick={() => handleEliminarEmpleado(emp.idEmpleado)} 
              style={{
                marginLeft: "1rem",
                backgroundColor: "red", 
                color: "white", 
                border: "none", 
                padding: "0.5rem 1rem", 
                cursor: "pointer", 
                borderRadius: "5px"
              }}
            >
              Eliminar
            </button>
            <button 
              onClick={() => handleEditarEmpleado(emp)} 
              style={{
                marginLeft: "1rem", 
                backgroundColor: "blue", 
                color: "white", 
                border: "none", 
                padding: "0.5rem 1rem", 
                cursor: "pointer", 
                borderRadius: "5px"
              }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
