import { Entity, PrimaryGeneratedColumn, Column, Repository } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'producto' })
export default class Producto {
    @PrimaryGeneratedColumn()
    idProducto: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'float' })
    precio: number;

    @Column({ type: 'text' })
    descripcion: string;

    private constructor() {}

    public static async obtenerProductos(): Promise<Producto[]> {
        const repositorio = await Producto.obtenerRepositorio();
        try {
            return await repositorio.find();
        } catch (error) {
            throw new Error('Error al obtener los productos');
        }
    }

    public static async crearProducto(nombre: string, precio: number, descripcion: string): Promise<void> {
        const producto = new Producto();
        producto.nombre = nombre;
        producto.precio = precio;
        producto.descripcion = descripcion;

        const repositorio = await Producto.obtenerRepositorio();
        try {
            await repositorio.save(producto);
        } catch (error) {
            throw new Error('Error al guardar el producto');
        }
    }

    public async actualizarProducto(nombre: string, precio: number, descripcion: string): Promise<Producto> {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;

        const repositorio = await Producto.obtenerRepositorio();
        try {
            await repositorio.save(this);
            return this;
        } catch (error) {
            throw new Error('Error al actualizar el producto');
        }
    }

    public static async eliminarProductoPorId(idProducto: number): Promise<void> {
        const repositorio = await Producto.obtenerRepositorio();
        try {
            await repositorio.delete(idProducto);
        } catch (error) {
            throw new Error('Error al eliminar el producto');
        }
    }

    public static async obtenerProductoPorId(idProducto: number): Promise<Producto | null> {
        const repositorio = await Producto.obtenerRepositorio();
        try {
            const producto = await repositorio.findOne({ where: { idProducto } });
            return producto;
        } catch (error) {
            throw new Error('Error al obtener el producto');
        }
    }

    private static async obtenerRepositorio(): Promise<Repository<Producto>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Producto);
    }
}
