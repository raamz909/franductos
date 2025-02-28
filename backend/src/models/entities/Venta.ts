import { Entity, PrimaryGeneratedColumn, Column, Repository, ManyToOne, JoinColumn } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';
import Cliente from './Cliente';
import Empleado from './Empleado';

@Entity({ name: 'venta' })
export default class Venta {
    @PrimaryGeneratedColumn()
    idVenta: number;

    @ManyToOne(() => Venta)
    @JoinColumn({ name: 'idCliente' })
    Cliente: Cliente;

    @ManyToOne(() => Venta)
    @JoinColumn({ name: 'idEmpleado' })
    Empleado: Empleado;

    @Column({ type: 'float' })
    totalVenta: number;

    @Column({ type: 'int' })
    cantidadVenta: number;

    @Column({ type: 'date' })
    fecha: Date;

    private constructor() {}

    public static async obtenerVentas(): Promise<Venta[]> {
        const repositorio = await Venta.obtenerRepositorio();
        try {
            return await repositorio.find();
        } catch (error) {
            throw new Error('Error al obtener las ventas');
        }
    }

    public static async crearVenta(idCliente: number, idEmpleado: number, idProducto: number, totalVenta: number, cantidadVenta: number, fecha: Date): Promise<void> {
        const venta = new Venta();
        const cliente = await Cliente.obtenerClientePorId(idCliente);
        const empleado = await Empleado.obtenerEmpleadoPorId(idEmpleado);
        venta.Cliente = cliente!;
        venta.Empleado = empleado!;
        venta.totalVenta = totalVenta;
        venta.cantidadVenta = cantidadVenta;
        venta.fecha = fecha;

        const repositorio = await Venta.obtenerRepositorio();
        try {
            await repositorio.save(venta);
        } catch (error) {
            throw new Error('Error al guardar la venta');
        }
    }

    public async actualizarVenta(idCliente: number, idEmpleado: number, idProducto: number, totalVenta: number, cantidadVenta: number, fecha: Date): Promise<Venta> {
        const cliente = await Cliente.obtenerClientePorId(idCliente);
        const empleado = await Empleado.obtenerEmpleadoPorId(idEmpleado);
        this.Cliente = cliente!;
        this.Empleado = empleado!;
        this.totalVenta = totalVenta;
        this.cantidadVenta = cantidadVenta;
        this.fecha = fecha;

        const repositorio = await Venta.obtenerRepositorio();
        try {
            await repositorio.save(this);
            return this;
        } catch (error) {
            throw new Error('Error al actualizar la venta');
        }
    }

    public static async eliminarVentaPorId(idVenta: number): Promise<void> {
        const repositorio = await Venta.obtenerRepositorio();
        try {
            await repositorio.delete(idVenta);
        } catch (error) {
            throw new Error('Error al eliminar la venta');
        }
    }

    public static async obtenerVentaPorId(idVenta: number): Promise<Venta | null> {
        const repositorio = await Venta.obtenerRepositorio();
        try {
            const venta = await repositorio.findOne({ where: { idVenta } });
            return venta ? venta : null;
        } catch (error) {
            throw new Error('Error al obtener la venta');
        }
    }

    private static async obtenerRepositorio(): Promise<Repository<Venta>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Venta);
    }
}