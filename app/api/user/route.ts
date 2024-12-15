 import prisma from "@/app/lib/db/connect";

 export async function GET() {
    try {
        // Obtén todos los usuarios sin incluir el campo "password"
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener los usuarios' }), { status: 500 });
    }
}
