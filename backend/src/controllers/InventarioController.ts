import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Inventario from '../models/entities/Inventario';
import Producto from '../models/entities/Producto';
import BaseController from './BaseController';

interface InventarioRequestBody {
    idProducto: number;
    cantidad: number;
}

export default class InventarioController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/', this.crearInventario);
        this.router.put('/actualizar/:id', this.actualizarInventario);
        this.router.delete('/eliminar/:id', this.eliminarInventario);
        this.router.get('/', this.obtenerInventario);
    }

    private async crearInventario(req: Request, res: Response): Promise<void> {
        try {
            const { idProducto, cantidad } = <InventarioRequestBody>req.body;
            if (!idProducto || cantidad === undefined) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            await Inventario.crearInventario(idProducto, cantidad);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Inventario registrado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async actualizarInventario(req: Request, res: Response): Promise<void> {
        try {
            const { idProducto, cantidad } = <InventarioRequestBody>req.body;
            if (!idProducto || cantidad === undefined) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            const idInventario = parseInt(req.params.id);
            const inventario = await Inventario.obtenerInventarioPorId(idInventario);
            if (!inventario) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Inventario no encontrado' }).end();
                return;
            }
            await inventario.actualizarInventario(idProducto, cantidad);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Inventario actualizado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async eliminarInventario(req: Request, res: Response): Promise<void> {
        try {
            const idInventario = parseInt(req.params.id);
            await Inventario.eliminarInventarioPorId(idInventario);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Inventario eliminado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerInventario(req: Request, res: Response): Promise<void> {
        try {
            const inventario = await Inventario.obtenerInventario();
            res.status(HttpStatusCodes.OK).json(inventario).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }


    public static mount(app: Application): InventarioController {
        return new InventarioController(app, '/inventario');
    }
}