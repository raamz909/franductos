import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import DatabaseConnection from "../../database/DatabaseConnection";


@Entity({ name: 'compras' })
export default class Compras {
    @PrimaryGeneratedColumn()
    idCompra: number;

    @Column({ type: 'datetime' })
    fecha: Date;

    @Column({ type: 'float' })
    totalCompra: number;

    constructor() { }

    public static async obtenerCompras(): Promise<Compras[]> {
        const repositorio = await Compras.obtenerRepositorioCompras();
        try {
            return await repositorio.find();
        } catch (error) {
            throw new Error('Error al obtener las compras');
        }
    }

    public static async crearCompra(fecha: Date, totalCompra: number): Promise<void> {
        const compra = new Compras();
        compra.fecha = fecha;
        compra.totalCompra = totalCompra;

        const repositorio = await Compras.obtenerRepositorioCompras();
        try {
            await repositorio.save(compra);
        } catch (error) {
            throw new Error('Error al guardar la compra');
        }
    }

    public async actualizarCompra(fecha: Date, totalCompra: number): Promise<Compras> {
        this.fecha = fecha;
        this.totalCompra = totalCompra;

        const repositorio = await Compras.obtenerRepositorioCompras();
        try {
            await repositorio.save(this);
            return this;
        } catch (error) {
            throw new Error('Error al actualizar la compra');
        }
    }

    public static async eliminarCompraPorId(idCompra: number): Promise<void> {
        const repositorio = await Compras.obtenerRepositorioCompras();
        try {
            await repositorio.delete(idCompra);
        } catch (error) {
            throw new Error('Error al eliminar la compra');
        }
    }


    public static async obtenerCompraPorId(idCompra: number): Promise<Compras | null> {
        const repositorio = await Compras.obtenerRepositorioCompras();
        try {
            return await repositorio.findOne({ where: { idCompra } });
        } catch (error) {
            throw new Error('Error al obtener la compra');
        }
    }

    private static async obtenerRepositorioCompras() {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return await databaseConnection.getRepository(Compras);
    }

}