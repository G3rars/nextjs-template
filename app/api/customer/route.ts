import prisma from "@/app/lib/db/connect";

export async function GET() {
    try {
        // Obtén todos los usuarios sin incluir el campo "password"
        const customers = await prisma.customer.findMany();
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener los clientes' }), { status: 500 });
    }
}
