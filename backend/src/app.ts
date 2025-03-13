import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import http from 'http';

// Importar todos los controladores
import ClienteController from './controllers/ClienteController';
import CompraController from './controllers/CompraController';
import DetalleCompraController from './controllers/DetalleCompraController';
import DetalleVentasController from './controllers/DetalleVentasController';
import EmpleadoController from './controllers/EmpleadoController';
import InventarioController from './controllers/InventarioController';
import ProductoController from './controllers/ProductoController';
import VentaController from './controllers/VentaController';

const app: Application = express();

// Configuración de CORS para permitir peticiones desde el frontend (por ejemplo, http://localhost:3001)
const corsOptions: CorsOptions = {
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token-sesion'],
    optionsSuccessStatus: 200,
    credentials: true 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

// Montar los controladores con sus rutas base
ClienteController.mount(app);           // Ruta base: "/clientes"
CompraController.mount(app);            // Ruta base: "/compras"
DetalleCompraController.mount(app);     // Ruta base: "/detalle-compra"

// IMPORTANTE: En DetalleVentasController, asegúrate de que el método mount use "/detalle-venta" para que coincida con el frontend.
DetalleVentasController.mount(app);     // Ruta base: "/detalle-venta"

EmpleadoController.mount(app);          // Ruta base: "/empleados"
InventarioController.mount(app);        // Ruta base: "/inventario"
ProductoController.mount(app);          // Ruta base: "/productos"
VentaController.mount(app);             // Ruta base: "/ventas"

export default server;
