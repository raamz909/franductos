import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import DatabaseConnection from "../../database/DatabaseConnection";

@Entity({ name: 'empleado' })
export default class Empleado {
    @PrimaryGeneratedColumn()
    idEmpleado: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'varchar', length: 255 })
    puesto: string;

    @Column({ type: 'float' })
    salario: number;

    constructor() { }

    public static async obtenerEmpleados(): Promise<Empleado[]> {
        const repositorio = await Empleado.obtenerRepositorioEmpleado();
        try {
            return await repositorio.find();
        } catch (error) {
            throw new Error('Error al obtener los empleados');
        }
    }

    public static async crearEmpleado(nombre: string, puesto: string, salario: number): Promise<void> {
        const empleado = new Empleado();
        empleado.nombre = nombre;
        empleado.puesto = puesto;
        empleado.salario = salario;

        const repositorio = await Empleado.obtenerRepositorioEmpleado();
        try {
            await repositorio.save(empleado);
        } catch (error) {
            throw new Error('Error al guardar el empleado');
        }
    }

    public async actualizarEmpleado(nombre: string, puesto: string, salario: number): Promise<Empleado> {
        this.nombre = nombre;
        this.puesto = puesto;
        this.salario = salario;

        const repositorio = await Empleado.obtenerRepositorioEmpleado();
        try {
            await repositorio.save(this);
            return this;
        } catch (error) {
            throw new Error('Error al actualizar el empleado');
        }
    }

    public static async eliminarEmpleadoPorId(idEmpleado: number): Promise<void> {
        const repositorio = await Empleado.obtenerRepositorioEmpleado();
        try {
            await repositorio.delete(idEmpleado);
        } catch (error) {
            throw new Error('Error al eliminar el empleado');
        }
    }

    public static async obtenerEmpleadoPorId(idEmpleado: number): Promise<Empleado | null> {
        const repositorio = await Empleado.obtenerRepositorioEmpleado();
        try {
            return await repositorio.findOne({ where: { idEmpleado } });
        } catch (error) {
            throw new Error('Error al obtener el empleado');
        }
    }

    private static async obtenerRepositorioEmpleado() {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Empleado);
    }
}