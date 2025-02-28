import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Producto from '../models/entities/Producto';
import BaseController from './BaseController';

interface ProductoRequestBody {
    nombre: string;
    precio: number;
    descripcion: string;
}

export default class ProductoController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/', this.crearProducto);
        this.router.put('/actualizar/:id', this.actualizarProducto);
        this.router.delete('/eliminar/:id', this.eliminarProducto);
        this.router.get('/', this.obtenerProductos);
        this.router.get('/:id', this.obtenerProductoPorId);
    }

    private async crearProducto(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, precio, descripcion } = <ProductoRequestBody>req.body;
            if (!nombre || precio === undefined || !descripcion) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            await Producto.crearProducto(nombre, precio, descripcion);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Producto registrado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async actualizarProducto(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, precio, descripcion } = <ProductoRequestBody>req.body;
            if (!nombre || precio === undefined || !descripcion) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            const idProducto = parseInt(req.params.id);
            const producto = await Producto.obtenerProductoPorId(idProducto);
            if (!producto) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Producto no encontrado' }).end();
                return;
            }
            await producto.actualizarProducto(nombre, precio, descripcion);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Producto actualizado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async eliminarProducto(req: Request, res: Response): Promise<void> {
        try {
            const idProducto = parseInt(req.params.id);
            await Producto.eliminarProductoPorId(idProducto);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Producto eliminado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerProductos(req: Request, res: Response): Promise<void> {
        try {
            const productos = await Producto.obtenerProductos();
            res.status(HttpStatusCodes.OK).json(productos).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerProductoPorId(req: Request, res: Response): Promise<void> {
        try {
            const idProducto = parseInt(req.params.id);
            const producto = await Producto.obtenerProductoPorId(idProducto);
            if (!producto) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Producto no encontrado' }).end();
                return;
            }
            res.status(HttpStatusCodes.OK).json(producto).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    public static mount(app: Application): ProductoController {
        return new ProductoController(app, '/productos');
    }
}