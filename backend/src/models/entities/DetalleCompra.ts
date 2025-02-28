import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import DatabaseConnection from "../../database/DatabaseConnection";
import Compras from "./Compras";
import Producto from "./Producto";


@Entity({ name: 'detalle_compra' })
export default class DetalleCompra {
    @PrimaryGeneratedColumn()
    idDetalleCompra: number;

    @ManyToOne(() => DetalleCompra)
    @JoinColumn({ name: 'idCompra' })
    Compra: Compras;

    @ManyToOne(() => DetalleCompra)
    @JoinColumn({ name: 'idProducto' })
    producto: Producto;

    @Column({ type: 'int' })
    cantidadCompra: number;

    @Column({ type: 'float' })
    subtotal: number;

    constructor() { }

    public static async obtenerDetalleCompra(): Promise<DetalleCompra[]> {
        const repositorio = await DetalleCompra.obtenerRepositorioDetalleCompra();
        try {
            return await repositorio.find();
        } catch (error) {
            throw new Error('Error al obtener los detalles de compra');
        }
    }

    public static async crearDetalleCompra(idCompra: number, idProducto: number, cantidadCompra: number, subtotal: number): Promise<void> {
        const detalleCompra = new DetalleCompra();
        const compra = await Compras.obtenerCompraPorId(idCompra);
        detalleCompra.Compra = compra!;
        const producto = await Producto.obtenerProductoPorId(idProducto);
        detalleCompra.producto = producto!;
        detalleCompra.cantidadCompra = cantidadCompra;
        detalleCompra.subtotal = subtotal;

        const repositorio = await DetalleCompra.obtenerRepositorioDetalleCompra();
        try {
            await repositorio.save(detalleCompra);
        } catch (error) {
            throw new Error('Error al guardar el detalle de compra');
        }
    }

    public async actualizarDetalleCompra(idCompra: number, idProducto: number, cantidadCompra: number, subtotal: number): Promise<DetalleCompra> {
        const compra = await Compras.obtenerCompraPorId(idCompra);
        this.Compra = compra!;
        const producto = await Producto.obtenerProductoPorId(idProducto);
        this.producto = producto!;
        this.cantidadCompra = cantidadCompra;
        this.subtotal = subtotal;

        const repositorio = await DetalleCompra.obtenerRepositorioDetalleCompra();
        try {
            await repositorio.save(this);
            return this;
        } catch (error) {
            throw new Error('Error al actualizar el detalle de compra');
        }
    }

    public static async eliminarDetalleCompraPorId(idDetalleCompra: number): Promise<void> {
        const repositorio = await DetalleCompra.obtenerRepositorioDetalleCompra();
        try {
            await repositorio.delete(idDetalleCompra);
        } catch (error) {
            throw new Error('Error al eliminar el detalle de compra');
        }
    }

    public static async obtenerDetalleCompraPorId(idDetalleCompra: number): Promise<DetalleCompra | null> {
        const repositorio = await DetalleCompra.obtenerRepositorioDetalleCompra();
        try {
            return await repositorio.findOne({ where: { idDetalleCompra } });
        } catch (error) {
            throw new Error('Error al obtener el detalle de compra');
        }
    }

    private static async obtenerRepositorioDetalleCompra() {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return await databaseConnection.getRepository(DetalleCompra);
    }
}