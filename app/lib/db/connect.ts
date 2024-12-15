import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para conectar y devolver el cliente Prisma
export async function connect() {
    try {
        if (prisma.$connect) {
            await prisma.$connect(); // Asegúrate de que Prisma se conecta correctamente
        }
        return prisma;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Conexión a la base de datos fallida');
    }
}

// Exporta la instancia de Prisma para su uso en la API
export default prisma;
