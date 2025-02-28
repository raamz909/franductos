import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Cliente from '../models/entities/Cliente';
import BaseController from './BaseController';

interface ClienteRequestBody {
    nombre: string;
    direccion: string;
    telefono: string;
}

export default class ClienteController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/', this.crearCliente);
        this.router.post('/actualizar/:id', this.actualizarCliente);
        this.router.delete('/eliminar/:id', this.eliminarCliente);
        this.router.get('/todos', this.obtenerClientes);
        this.router.get('/:id', this.obtenerClientePorId);
    }

    private async crearCliente(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, direccion, telefono } = <ClienteRequestBody>req.body;
            if (!nombre || !direccion || !telefono) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            await Cliente.crearCliente(nombre, direccion, telefono);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Cliente registrado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async actualizarCliente(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, direccion, telefono } = <ClienteRequestBody>req.body;
            if (!nombre || !direccion || !telefono) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            const id = parseInt(req.params.id);
            const cliente = await Cliente.obtenerClientePorId(id);
            if (!cliente) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Cliente no encontrado' }).end();
                return;
            }
            await cliente.actualizarCliente(nombre, direccion, telefono);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Cliente actualizado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async eliminarCliente(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await Cliente.eliminarClientePorId(id);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Cliente eliminado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerClientes(req: Request, res: Response): Promise<void> {
        try {
            const clientes = await Cliente.obtenerClientes();
            res.status(HttpStatusCodes.OK).json(clientes).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerClientePorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const cliente = await Cliente.obtenerClientePorId(id);
            if (!cliente) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Cliente no encontrado' }).end();
                return;
            }
            res.status(HttpStatusCodes.OK).json(cliente).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    public static mount(app: Application): ClienteController {
        return new ClienteController(app, '/clientes');
    }
}