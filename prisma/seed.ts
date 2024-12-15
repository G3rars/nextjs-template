import bcrypt from 'bcrypt';
import { users, customers, products, purchases, purchaseItems } from "./placeholder-data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
    return await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return prisma.user.upsert({
                where: { id: user.id },
                update: {},
                create: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                },
            });
        }),
    );
}

async function seedCustomers() {
    return await Promise.all(
        customers.map(async (customerData) => {
            return prisma.customer.upsert({
                where: { id: customerData.id },
                update: {},
                create: {
                    id: customerData.id,
                    firstName: customerData.first_name,
                    lastName: customerData.last_name,
                    phone: customerData.phone,
                    address: customerData.address,
                    province: customerData.province,
                    email: customerData.email,
                    imageUrl: customerData.image_url,
                },
            });
        }),
    );
}

async function seedProducts() {
    return await Promise.all(
        products.map(async (product) => {
            return prisma.product.upsert({
                where: { id: product.id },
                update: {},
                create: {
                    id: product.id,
                    name: product.name,
                    classification: product.classification,
                    department: product.department,
                    format: product.format,
                    presentation: product.presentation,
                    laboratory: product.laboratory,
                    activeIngredient: product.active_ingredient,
                },
            });
        }),
    );
}

async function seedPurchases() {
    return await Promise.all(
        purchases.map(async (purchase) => {
            return prisma.purchase.upsert({
                where: { id: purchase.id },
                update: {},
                create: {
                    id: purchase.id,
                    clientId: purchase.client_id,
                    createdAt: new Date(purchase.created_at),
                    items: {
                        create: purchaseItems
                            .filter(item => item.purchase_id === purchase.id)
                            .map(item => ({
                                productId: item.product_id,
                                quantity: item.quantity,
                            })),
                    },
                },
            });
        }),
    );
}

async function seedPurchaseItems() {
    return await Promise.all(
        purchaseItems.map(async (item) => {
            return prisma.purchaseItem.upsert({
                where: {
                    purchaseId_productId: {
                        purchaseId: item.purchase_id,
                        productId: item.product_id,
                    },
                },
                update: {},
                create: {
                    purchaseId: item.purchase_id,
                    productId: item.product_id,
                    quantity: item.quantity,
                },
            });
        }),
    );
}

async function main() {
    try {
        console.log('Seeding database...');
        await seedUsers();
        console.log('Users seeded');
        await seedCustomers();
        console.log('Customers seeded');
        await seedProducts();
        console.log('Products seeded');
        await seedPurchases();
        console.log('Purchases seeded');
        await seedPurchaseItems();
        console.log('Purchase items seeded');
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
