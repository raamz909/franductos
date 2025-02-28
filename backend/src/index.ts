import server from './app';
import 'reflect-metadata';

server.listen (3000, () => {
    console.log(`app listening on port ${3000}`);
});


/*import DatabaseConnection from "./database/DatabaseConnection";


async function testConnection() {
    try {
        const db = await DatabaseConnection.getConnectedInstance();
        console.log('Conexión exitosa a la base de datos MySQL.');
        process.exit(0); // Salir con éxito
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1); // Salir con error
    }
}

testConnection();*/
