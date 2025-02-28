import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Compras from '../models/entities/Compras';
import BaseController from './BaseController';

interface CompraRequestBody {
    fecha: Date;
    totalCompra: number;
}

export default class ComprasController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/', this.crearCompra);
        this.router.put('/actualizar/:id', this.actualizarCompra);
        this.router.delete('/eliminar/:id', this.eliminarCompra);
        this.router.get('/', this.obtenerCompras);
        this.router.get('/:id', this.obtenerCompraPorId);
    }

    private async crearCompra(req: Request, res: Response): Promise<void> {
        try {
            const { fecha, totalCompra } = <CompraRequestBody>req.body;
            if (!fecha || !totalCompra) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            await Compras.crearCompra(fecha, totalCompra);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Compra registrada exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async actualizarCompra(req: Request, res: Response): Promise<void> {
        try {
            const { fecha, totalCompra } = <CompraRequestBody>req.body;
            if (!fecha || !totalCompra) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            const idCompra = parseInt(req.params.id);
            const compra = await Compras.obtenerCompraPorId(idCompra);
            if (!compra) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Compra no encontrada' }).end();
                return;
            }
            await compra.actualizarCompra(fecha, totalCompra);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Compra actualizada exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async eliminarCompra(req: Request, res: Response): Promise<void> {
        try {
            const idCompra = parseInt(req.params.id);
            await Compras.eliminarCompraPorId(idCompra);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Compra eliminada exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerCompras(req: Request, res: Response): Promise<void> {
        try {
            const compras = await Compras.obtenerCompras();
            res.status(HttpStatusCodes.OK).json(compras).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerCompraPorId(req: Request, res: Response): Promise<void> {
        try {
            const idCompra = parseInt(req.params.id);
            const compra = await Compras.obtenerCompraPorId(idCompra);
            if (!compra) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Compra no encontrada' }).end();
                return;
            }
            res.status(HttpStatusCodes.OK).json(compra).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    public static mount(app: Application): ComprasController {
        return new ComprasController(app, '/compras');
    }
}