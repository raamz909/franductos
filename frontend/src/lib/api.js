import { API_BASE_URL } from "./apiConfig";

// Función auxiliar para procesar la respuesta
async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  return await response.json();
}

/* CLIENTES */
// Crear un cliente: POST /clientes
export async function createCliente(data) {
  const response = await fetch(`${API_BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Listar todos los clientes: GET /clientes/todos (tal como se definió en ClienteController)
export async function getClientes() {
  const response = await fetch(`${API_BASE_URL}/clientes/todos`);
  return await handleResponse(response);
}

// Obtener un cliente por ID: GET /clientes/:id
export async function getClienteById(id) {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`);
  return await handleResponse(response);
}

// Actualizar un cliente: POST /clientes/actualizar/:id
export async function updateCliente(id, data) {
  const response = await fetch(`${API_BASE_URL}/clientes/actualizar/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Eliminar un cliente: DELETE /clientes/eliminar/:id
export async function deleteCliente(id) {
  const response = await fetch(`${API_BASE_URL}/clientes/eliminar/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response);
}

/* COMPRAS */
// Crear una compra: POST /compras
export async function createCompra(data) {
  const response = await fetch(`${API_BASE_URL}/compras`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Listar todas las compras: GET /compras  (controlador define GET '/' para listar)
export async function getCompras() {
  const response = await fetch(`${API_BASE_URL}/compras`);
  return await handleResponse(response);
}

// Obtener una compra por ID: GET /compras/:id
export async function getCompraById(id) {
  const response = await fetch(`${API_BASE_URL}/compras/${id}`);
  return await handleResponse(response);
}

// Actualizar una compra: POST /compras/actualizar/:id
export async function updateCompra(id, data) {
  const response = await fetch(`${API_BASE_URL}/compras/actualizar/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Eliminar una compra: DELETE /compras/eliminar/:id
export async function deleteCompra(id) {
  const response = await fetch(`${API_BASE_URL}/compras/eliminar/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response);
}

/* DETALLE COMPRA */
// Crear detalle de compra: POST /detalle-compra
export async function createDetalleCompra(data) {
  const response = await fetch(`${API_BASE_URL}/detalle-compra`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Listar todos los detalles de compra: GET /detalle-compra
export async function getDetalleCompras() {
  const response = await fetch(`${API_BASE_URL}/detalle-compra`);
  return await handleResponse(response);
}

// Obtener detalle de compra por ID: GET /detalle-compra/:id
export async function getDetalleCompraById(id) {
  const response = await fetch(`${API_BASE_URL}/detalle-compra/${id}`);
  return await handleResponse(response);
}

// Actualizar detalle de compra: POST /detalle-compra/actualizar/:id
export async function updateDetalleCompra(id, data) {
  const response = await fetch(`${API_BASE_URL}/detalle-compra/actualizar/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Eliminar detalle de compra: DELETE /detalle-compra/eliminar/:id
export async function deleteDetalleCompra(id) {
  const response = await fetch(`${API_BASE_URL}/detalle-compra/eliminar/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response);
}

/* DETALLE VENTA */
// Crear detalle de venta: POST /detalle-venta
export async function createDetalleVenta(data) {
  const response = await fetch(`${API_BASE_URL}/detalle-venta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Listar todos los detalles de venta: GET /detalle-venta
export async function getDetalleVentas() {
  const response = await fetch(`${API_BASE_URL}/detalle-venta`);
  return await handleResponse(response);
}

// Obtener detalle de venta por ID: GET /detalle-venta/:id
export async function getDetalleVentaById(id) {
  const response = await fetch(`${API_BASE_URL}/detalle-venta/${id}`);
  return await handleResponse(response);
}

// Actualizar detalle de venta: POST /detalle-venta/actualizar/:id
export async function updateDetalleVenta(id, data) {
  const response = await fetch(`${API_BASE_URL}/detalle-venta/actualizar/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Eliminar detalle de venta: DELETE /detalle-venta/eliminar/:id
export async function deleteDetalleVenta(id) {
  const response = await fetch(`${API_BASE_URL}/detalle-venta/eliminar/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response);
}

/* EMPLEADOS */
// Crear un empleado: POST /empleados
export async function createEmpleado(data) {
  const response = await fetch(`${API_BASE_URL}/empleados`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Listar todos los empleados: GET /empleados
export async function getEmpleados() {
  const response = await fetch(`${API_BASE_URL}/empleados`);
  return await handleResponse(response);
}

// Obtener un empleado por ID: GET /empleados/:id
export async function getEmpleadoById(id) {
  const response = await fetch(`${API_BASE_URL}/empleados/${id}`);
  return await handleResponse(response);
}

// Actualizar un empleado: POST /empleados/actualizar/:id
export async function updateEmpleado(id, data) {
  const response = await fetch(`${API_BASE_URL}/empleados/actualizar/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Eliminar un empleado: DELETE /empleados/eliminar/:id
export async function deleteEmpleado(id) {
  const response = await fetch(`${API_BASE_URL}/empleados/eliminar/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response);
}

/* INVENTARIO */
// Crear registro de inventario: POST /inventario
export async function createInventario(data) {
  const response = await fetch(`${API_BASE_URL}/inventario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Listar todos los registros de inventario: GET /inventario
export async function getInventario() {
  const response = await fetch(`${API_BASE_URL}/inventario`);
  return await handleResponse(response);
}

// Obtener un registro de inventario por ID: GET /inventario/:id
export async function getInventarioById(id) {
  const response = await fetch(`${API_BASE_URL}/inventario/${id}`);
  return await handleResponse(response);
}

// Actualizar inventario: POST /inventario/actualizar/:id
export async function updateInventario(id, data) {
  const response = await fetch(`${API_BASE_URL}/inventario/actualizar/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Eliminar registro de inventario: DELETE /inventario/eliminar/:id
export async function deleteInventario(id) {
  const response = await fetch(`${API_BASE_URL}/inventario/eliminar/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response);
}

/* PRODUCTOS */
// Crear un producto: POST /productos
export async function createProducto(data) {
  const response = await fetch(`${API_BASE_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Listar todos los productos: GET /productos
export async function getProductos() {
  const response = await fetch(`${API_BASE_URL}/productos`);
  return await handleResponse(response);
}

// Obtener un producto por ID: GET /productos/:id
export async function getProductoById(id) {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`);
  return await handleResponse(response);
}

// Actualizar un producto: POST /productos/actualizar/:id
export async function updateProducto(id, data) {
  const response = await fetch(`${API_BASE_URL}/productos/actualizar/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Eliminar un producto: DELETE /productos/eliminar/:id
export async function deleteProducto(id) {
  const response = await fetch(`${API_BASE_URL}/productos/eliminar/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response);
}

/* VENTAS */
// Crear una venta: POST /ventas
export async function createVenta(data) {
  const response = await fetch(`${API_BASE_URL}/ventas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Listar todas las ventas: GET /ventas
export async function getVentas() {
  const response = await fetch(`${API_BASE_URL}/ventas`);
  return await handleResponse(response);
}

// Obtener una venta por ID: GET /ventas/:id
export async function getVentaById(id) {
  const response = await fetch(`${API_BASE_URL}/ventas/${id}`);
  return await handleResponse(response);
}

// Actualizar una venta: POST /ventas/actualizar/:id
export async function updateVenta(id, data) {
  const response = await fetch(`${API_BASE_URL}/ventas/actualizar/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// Eliminar una venta: DELETE /ventas/eliminar/:id
export async function deleteVenta(id) {
  const response = await fetch(`${API_BASE_URL}/ventas/eliminar/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response);
}
