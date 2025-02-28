import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import DetalleCompra from '../models/entities/DetalleCompra';
import Compras from '../models/entities/Compras';
import Producto from '../models/entities/Producto';
import BaseController from './BaseController';

interface DetalleCompraRequestBody {
    idCompra: number;
    idProducto: number;
    cantidadCompra: number;
    subtotal: number;
}

export default class DetalleCompraController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/', this.crearDetalleCompra);
        this.router.put('/actualizar/:id', this.actualizarDetalleCompra);
        this.router.delete('/eliminar/:id', this.eliminarDetalleCompra);
        this.router.get('/', this.obtenerDetalleCompra);
        this.router.get('/:id', this.obtenerDetalleCompraPorId);
    }

    private async crearDetalleCompra(req: Request, res: Response): Promise<void> {
        try {
            const { idCompra, idProducto, cantidadCompra, subtotal } = <DetalleCompraRequestBody>req.body;
            if (!idCompra || !idProducto || cantidadCompra === undefined || subtotal === undefined) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            await DetalleCompra.crearDetalleCompra(idCompra, idProducto, cantidadCompra, subtotal);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Detalle de compra registrado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async actualizarDetalleCompra(req: Request, res: Response): Promise<void> {
        try {
            const { idCompra, idProducto, cantidadCompra, subtotal } = <DetalleCompraRequestBody>req.body;
            if (!idCompra || !idProducto || cantidadCompra === undefined || subtotal === undefined) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            const idDetalleCompra = parseInt(req.params.id);
            const detalleCompra = await DetalleCompra.obtenerDetalleCompraPorId(idDetalleCompra);
            if (!detalleCompra) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Detalle de compra no encontrado' }).end();
                return;
            }
            await detalleCompra.actualizarDetalleCompra(idCompra, idProducto, cantidadCompra, subtotal);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Detalle de compra actualizado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async eliminarDetalleCompra(req: Request, res: Response): Promise<void> {
        try {
            const idDetalleCompra = parseInt(req.params.id);
            await DetalleCompra.eliminarDetalleCompraPorId(idDetalleCompra);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Detalle de compra eliminado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerDetalleCompra(req: Request, res: Response): Promise<void> {
        try {
            const detalles = await DetalleCompra.obtenerDetalleCompra();
            res.status(HttpStatusCodes.OK).json(detalles).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerDetalleCompraPorId(req: Request, res: Response): Promise<void> {
        try {
            const idDetalleCompra = parseInt(req.params.id);
            const detalleCompra = await DetalleCompra.obtenerDetalleCompraPorId(idDetalleCompra);
            if (!detalleCompra) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Detalle de compra no encontrado' }).end();
                return;
            }
            res.status(HttpStatusCodes.OK).json(detalleCompra).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    public static mount(app: Application): DetalleCompraController {
        return new DetalleCompraController(app, '/detalle-compra');
    }
}