import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import DetalleVentas from '../models/entities/DetalleVentas';
import Venta from '../models/entities/Venta';
import Producto from '../models/entities/Producto';
import BaseController from './BaseController';

interface DetalleVentasRequestBody {
    idVenta: number;
    idProducto: number;
    cantidadVenta: number;
    subtotal: number;
}

export default class DetalleVentasController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/', this.crearDetalleVenta);
        this.router.put('/actualizar/:id', this.actualizarDetalleVenta);
        this.router.delete('/eliminar/:id', this.eliminarDetalleVenta);
        this.router.get('/', this.obtenerDetalleVentas);
        this.router.get('/:id', this.obtenerDetalleVentaPorId);
    }

    private async crearDetalleVenta(req: Request, res: Response): Promise<void> {
        try {
            const { idVenta, idProducto, cantidadVenta, subtotal } = <DetalleVentasRequestBody>req.body;
            if (!idVenta || !idProducto || cantidadVenta === undefined || subtotal === undefined) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            await DetalleVentas.crearDetalleVenta(idVenta, idProducto, cantidadVenta, subtotal);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Detalle de venta registrado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async actualizarDetalleVenta(req: Request, res: Response): Promise<void> {
        try {
            const { idVenta, idProducto, cantidadVenta, subtotal } = <DetalleVentasRequestBody>req.body;
            if (!idVenta || !idProducto || cantidadVenta === undefined || subtotal === undefined) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            const idDetalleVenta = parseInt(req.params.id);
            const detalleVenta = await DetalleVentas.obtenerDetalleVentaPorId(idDetalleVenta);
            if (!detalleVenta) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Detalle de venta no encontrado' }).end();
                return;
            }
            await detalleVenta.actualizarDetalleVenta(idVenta, idProducto, cantidadVenta, subtotal);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Detalle de venta actualizado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async eliminarDetalleVenta(req: Request, res: Response): Promise<void> {
        try {
            const idDetalleVenta = parseInt(req.params.id);
            await DetalleVentas.eliminarDetalleVentaPorId(idDetalleVenta);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Detalle de venta eliminado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerDetalleVentas(req: Request, res: Response): Promise<void> {
        try {
            const detalles = await DetalleVentas.obtenerDetalleVentas();
            res.status(HttpStatusCodes.OK).json(detalles).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerDetalleVentaPorId(req: Request, res: Response): Promise<void> {
        try {
            const idDetalleVenta = parseInt(req.params.id);
            const detalleVenta = await DetalleVentas.obtenerDetalleVentaPorId(idDetalleVenta);
            if (!detalleVenta) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Detalle de venta no encontrado' }).end();
                return;
            }
            res.status(HttpStatusCodes.OK).json(detalleVenta).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    public static mount(app: Application): DetalleVentasController {
        return new DetalleVentasController(app, '/detalle-ventas');
    }
}