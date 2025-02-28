import { Entity, PrimaryGeneratedColumn, Column, Repository } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'cliente' })
export default class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 500})
    nombre: string;

    @Column({type: 'varchar', length: 500})
    direccion: string;

    @Column({type: 'varchar', length: 10})
    telefono: string;

    private constructor() {}

    public static async obtenerClientes(): Promise<Cliente[]> {
        const repositorioCliente = await Cliente.obtenerRepositorioCliente();

        try {
            return await repositorioCliente.find();
        } catch (error) {
            throw new Error('Error al obtener los clientes');
        }
    }

    public static async crearCliente(
        nombre: string,
        direccion: string,
        telefono: string
    ): Promise<void> {
        const cliente = new Cliente();
        cliente.nombre = nombre;
        cliente.direccion = direccion;
        cliente.telefono = telefono;

        const repositorioCliente = await Cliente.obtenerRepositorioCliente();

        try {
            await repositorioCliente.save(cliente);
        } catch (error) {
            throw new Error('Error al guardar el cliente');
        }
    }

    public async actualizarCliente(
        nombre: string,
        direccion: string,
        telefono: string
    ): Promise<Cliente> {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;

        const repositorioCliente = await Cliente.obtenerRepositorioCliente();

        try {
            await repositorioCliente.save(this);
            return this;
        } catch (error) {
            throw new Error('Error al actualizar el cliente');
        }
    }

    public static async eliminarClientePorId(id: number): Promise<void> {
        const repositorioCliente = await Cliente.obtenerRepositorioCliente();

        try {
            await repositorioCliente.delete(id);
        } catch (error) {
            throw new Error('Error al eliminar el cliente');
        }
    }

    public static async obtenerClientePorId(id: number): Promise<Cliente | null> {
        const repositorioCliente = await Cliente.obtenerRepositorioCliente();

        try {
            const cliente = await repositorioCliente.findOne({ where: { id } });
            return cliente ? cliente : null;
        } catch (error) {
            throw new Error('Error al obtener el cliente');
        }
    }

    private static async obtenerRepositorioCliente(): Promise<Repository<Cliente>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Cliente);
    }
}