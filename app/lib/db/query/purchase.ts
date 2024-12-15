import prisma from "@/app/lib/db/connect";

export async function getAllPurchases() {
    return prisma.purchase.findMany({
        include: {
            customer: true, // Esto incluirá los clientes relacionados con cada 'Purchase'
            items: { // 'items' es la relación entre 'Purchase' y 'PurchaseItem'
                include: {
                    product: true, // Esto incluirá los productos relacionados con cada 'PurchaseItem'
                },
            },
        },
        take: 6, // Limita la cantidad de compras a 10
        orderBy: {createdAt: 'desc'}, // Ordena las compras por fecha de creación
    });
}

export async function getTotalPurchasesMonth() {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    return prisma.purchase.aggregate({
        _count: {
            id: true,
        },
        where: {
            createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
        },
    });
}


export async function getPurchaseById(id: string) {
    return prisma.purchase.findUnique({where: {id}});
}
