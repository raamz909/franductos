import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import DatabaseConnection from "../../database/DatabaseConnection";
import Venta from "./Venta";
import Producto from "./Producto";


@Entity({ name: 'detalle_ventas' })
export default class DetalleVentas {
    @PrimaryGeneratedColumn()
    idDetalleVenta: number;

    @ManyToOne(() => DetalleVentas)
    @JoinColumn({ name: 'idVenta' })
    venta: Venta

    @ManyToOne(() => DetalleVentas)
    @JoinColumn({ name: 'idProducto' })
    producto: Producto;

    @Column({ type: 'int' })
    cantidadVenta: number;

    @Column({ type: 'float' })
    subtotal: number;

    constructor() { }

    public static async obtenerDetalleVentas(): Promise<DetalleVentas[]> {
        const repositorio = await DetalleVentas.obtenerRepositorioDetalleVentas();
        try {
            return await repositorio.find();
        } catch (error) {
            throw new Error('Error al obtener los detalles de ventas');
        }
    }

    public static async crearDetalleVenta(idVenta: number, idProducto: number, cantidadVenta: number, subtotal: number): Promise<void> {
        const detalleVenta = new DetalleVentas();
        const venta = await Venta.obtenerVentaPorId(idVenta);
        detalleVenta.venta = venta!;
        const producto = await Producto.obtenerProductoPorId(idProducto);
        detalleVenta.producto = producto!;
        detalleVenta.cantidadVenta = cantidadVenta;
        detalleVenta.subtotal = subtotal;

        const repositorio = await DetalleVentas.obtenerRepositorioDetalleVentas();
        try {
            await repositorio.save(detalleVenta);
        } catch (error) {
            throw new Error('Error al guardar el detalle de venta');
        }
    }

    public async actualizarDetalleVenta(idVenta: number, idProducto: number, cantidadVenta: number, subtotal: number): Promise<DetalleVentas> {
        const venta = await Venta.obtenerVentaPorId(idVenta);
        this.venta = venta!;
        const producto = await Producto.obtenerProductoPorId(idProducto);
        this.producto = producto!;
        this.cantidadVenta = cantidadVenta;
        this.subtotal = subtotal;

        const repositorio = await DetalleVentas.obtenerRepositorioDetalleVentas();
        try {
            await repositorio.save(this);
            return this;
        } catch (error) {
            throw new Error('Error al actualizar el detalle de venta');
        }
    }

    public static async eliminarDetalleVentaPorId(idDetalleVenta: number): Promise<void> {
        const repositorio = await DetalleVentas.obtenerRepositorioDetalleVentas();
        try {
            await repositorio.delete(idDetalleVenta);
        } catch (error) {
            throw new Error('Error al eliminar el detalle de venta');
        }
    }

    public static async obtenerDetalleVentaPorId(idDetalleVenta: number): Promise<DetalleVentas | null> {
        const repositorio = await DetalleVentas.obtenerRepositorioDetalleVentas();
        try {
            return await repositorio.findOne({ where: { idDetalleVenta } });
        } catch (error) {
            throw new Error('Error al obtener el detalle de venta');
        }
    }

    private static async obtenerRepositorioDetalleVentas() {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(DetalleVentas);
    }

}