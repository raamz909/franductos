import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Venta from '../models/entities/Venta';
import Cliente from '../models/entities/Cliente';
import Empleado from '../models/entities/Empleado';
import BaseController from './BaseController';

interface VentaRequestBody {
    idCliente: number;
    idEmpleado: number;
    totalVenta: number;
    cantidadVenta: number;
    fecha: Date;
    idProducto:number;
}

export default class VentaController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/', this.crearVenta);
        this.router.put('/actualizar/:id', this.actualizarVenta);
        this.router.delete('/eliminar/:id', this.eliminarVenta);
        this.router.get('/', this.obtenerVentas);
        this.router.get('/:id', this.obtenerVentaPorId);
    }

    private async crearVenta(req: Request, res: Response): Promise<void> {
        try {
            const { idCliente, idEmpleado, totalVenta, cantidadVenta, fecha,idProducto } = <VentaRequestBody>req.body;
            if (!idCliente || !idEmpleado || totalVenta === undefined || cantidadVenta === undefined || !fecha) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            await Venta.crearVenta(idCliente, idEmpleado,idProducto, totalVenta, cantidadVenta, fecha);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Venta registrada exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async actualizarVenta(req: Request, res: Response): Promise<void> {
        try {
            const { idCliente, idEmpleado, totalVenta, cantidadVenta, fecha, idProducto } = <VentaRequestBody>req.body;
            if (!idCliente || !idEmpleado || totalVenta === undefined || cantidadVenta === undefined || !fecha) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            const idVenta = parseInt(req.params.id);
            const venta = await Venta.obtenerVentaPorId(idVenta);
            if (!venta) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Venta no encontrada' }).end();
                return;
            }
            await venta.actualizarVenta(idCliente, idEmpleado,idProducto, totalVenta, cantidadVenta, fecha);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Venta actualizada exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async eliminarVenta(req: Request, res: Response): Promise<void> {
        try {
            const idVenta = parseInt(req.params.id);
            await Venta.eliminarVentaPorId(idVenta);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Venta eliminada exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerVentas(req: Request, res: Response): Promise<void> {
        try {
            const ventas = await Venta.obtenerVentas();
            res.status(HttpStatusCodes.OK).json(ventas).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerVentaPorId(req: Request, res: Response): Promise<void> {
        try {
            const idVenta = parseInt(req.params.id);
            const venta = await Venta.obtenerVentaPorId(idVenta);
            if (!venta) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Venta no encontrada' }).end();
                return;
            }
            res.status(HttpStatusCodes.OK).json(venta).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    public static mount(app: Application): VentaController {
        return new VentaController(app, '/ventas');
    }
}