import prisma from "@/app/lib/db/connect";

export async function getAllCustomers() {
    return prisma.customer.findMany();
}

export async function getTotalCustomersMonth() {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    return prisma.customer.aggregate({
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

export async function getCustomerById(id: string) {
    return prisma.customer.findUnique({where: {id}});
}
