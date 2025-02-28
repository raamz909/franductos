import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Empleado from '../models/entities/Empleado';
import BaseController from './BaseController';

interface EmpleadoRequestBody {
    nombre: string;
    puesto: string;
    salario: number;
}

export default class EmpleadoController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/', this.crearEmpleado);
        this.router.put('/actualizar/:id', this.actualizarEmpleado);
        this.router.delete('/eliminar/:id', this.eliminarEmpleado);
        this.router.get('/', this.obtenerEmpleados);
        this.router.get('/:id', this.obtenerEmpleadoPorId);
    }

    private async crearEmpleado(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, puesto, salario } = <EmpleadoRequestBody>req.body;
            if (!nombre || !puesto || salario === undefined) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            await Empleado.crearEmpleado(nombre, puesto, salario);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Empleado registrado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async actualizarEmpleado(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, puesto, salario } = <EmpleadoRequestBody>req.body;
            if (!nombre || !puesto || salario === undefined) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ mensaje: 'Existen campos vacíos' }).end();
                return;
            }
            const idEmpleado = parseInt(req.params.id);
            const empleado = await Empleado.obtenerEmpleadoPorId(idEmpleado);
            if (!empleado) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Empleado no encontrado' }).end();
                return;
            }
            await empleado.actualizarEmpleado(nombre, puesto, salario);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Empleado actualizado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async eliminarEmpleado(req: Request, res: Response): Promise<void> {
        try {
            const idEmpleado = parseInt(req.params.id);
            await Empleado.eliminarEmpleadoPorId(idEmpleado);
            res.status(HttpStatusCodes.OK).json({ mensaje: 'Empleado eliminado exitosamente.' });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerEmpleados(req: Request, res: Response): Promise<void> {
        try {
            const empleados = await Empleado.obtenerEmpleados();
            res.status(HttpStatusCodes.OK).json(empleados).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    private async obtenerEmpleadoPorId(req: Request, res: Response): Promise<void> {
        try {
            const idEmpleado = parseInt(req.params.id);
            const empleado = await Empleado.obtenerEmpleadoPorId(idEmpleado);
            if (!empleado) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ mensaje: 'Empleado no encontrado' }).end();
                return;
            }
            res.status(HttpStatusCodes.OK).json(empleado).end();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error interno del servidor' }).end();
        }
    }

    public static mount(app: Application): EmpleadoController {
        return new EmpleadoController(app, '/empleados');
    }
}