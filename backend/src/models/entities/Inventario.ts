import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import DatabaseConnection from "../../database/DatabaseConnection";
import Producto from "./Producto";

@Entity({ name: 'inventario' })
export default class Inventario {
    @PrimaryGeneratedColumn()
    idInventario: number;

    @OneToOne(() => Producto)
    @JoinColumn({ name: 'idProducto' })
    producto: Producto;

    @Column({ type: 'int' })
    cantidad: number;

    constructor() { }

    public static async obtenerInventario(): Promise<Inventario[]> {
        const repositorio = await Inventario.obtenerRepositorioInventario();
        try {
            return await repositorio.find();
        } catch (error) {
            throw new Error('Error al obtener el inventario');
        }
    }

    public static async crearInventario(idProducto: number, cantidad: number): Promise<void> {
        const inventario = new Inventario();
        const producto = await Producto.obtenerProductoPorId(idProducto);
        inventario.producto = producto!;
        inventario.cantidad = cantidad;

        const repositorio = await Inventario.obtenerRepositorioInventario();
        try {
            await repositorio.save(inventario);
        } catch (error) {
            throw new Error('Error al guardar el inventario');
        }
    }

    public async actualizarInventario(idProducto: number, cantidad: number): Promise<Inventario> {
        const producto = await Producto.obtenerProductoPorId(idProducto);
        this.producto = producto!;
        this.cantidad = cantidad;

        const repositorio = await Inventario.obtenerRepositorioInventario();
        try {
            await repositorio.save(this);
            return this;
        } catch (error) {
            throw new Error('Error al actualizar el inventario');
        }
    }

    public static async eliminarInventarioPorId(idInventario: number): Promise<void> {
        const repositorio = await Inventario.obtenerRepositorioInventario();
        try {
            await repositorio.delete(idInventario);
        } catch (error) {
            throw new Error('Error al eliminar el inventario');
        }
    }

    public static async obtenerInventarioPorId(idInventario: number): Promise<Inventario | null> {
        const repositorio = await Inventario.obtenerRepositorioInventario();
        try {
            return await repositorio.findOne({ where: { idInventario } });
        } catch (error) {
            throw new Error('Error al obtener el inventario');
        }
    }

    private static async obtenerRepositorioInventario() {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Inventario);
    }
}