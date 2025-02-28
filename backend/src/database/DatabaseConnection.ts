import { DataSource, ObjectLiteral, EntityTarget, Repository } from 'typeorm';
import Cliente from '../models/entities/Cliente';
import Compras from '../models/entities/Compras';
import DetalleCompra from '../models/entities/DetalleCompra';
import DetalleVentas from '../models/entities/DetalleVentas';
import Empleado from '../models/entities/Empleado';
import Inventario from '../models/entities/Inventario';
import Producto from '../models/entities/Producto';
import Venta from '../models/entities/Venta';

export default class DatabaseConnection {
    private dataSource: DataSource;

    private static instance: DatabaseConnection;

    private constructor() {
        this.dataSource = new DataSource({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'LugoDB',
            synchronize: true,
            entities: [Cliente, Compras, DetalleCompra, DetalleVentas, Empleado, Inventario, Producto, Venta],
        });
    }

    private get isConnected(): boolean {
        return this.dataSource.isInitialized;
    }

    public getRepository<Entity extends ObjectLiteral>(
        entityTarget: EntityTarget<Entity>
    ): Repository<Entity> {
        return this.dataSource.getRepository(entityTarget);
    }

    private async connect(): Promise<void> {
        await this.dataSource.initialize();
    }

    public static async getConnectedInstance(): Promise<DatabaseConnection> {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }

        if (!DatabaseConnection.instance.isConnected) {
            await DatabaseConnection.instance.connect();
        }

        return DatabaseConnection.instance;
    }
}
