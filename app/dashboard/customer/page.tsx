// app/customer/page.tsx (Server Component)
import {getAllCustomers} from "@/app/lib/db/query/customer";  // La función que obtiene los clientes desde la base de datos
import CustomerTable from "@/app/ui/dashboard/CustomerTable";
import {Suspense} from "react";
import LastPurchases from "@/app/ui/dashboard/LastPurchases";
import Stats from "@/app/ui/dashboard/Stats"; // El componente de presentación que usará NextUI

const Page = async () => {
    // Obtener los datos de los clientes desde la base de datos
    const customers = await getAllCustomers();
    return (
        <div>
            <h1 className="mb-10 text-xl md:text-2xl">Clientes</h1>
            <section className="flex item-center">
                <Suspense fallback={<div className="skeleton h-32 w-32"></div>}>
                    <CustomerTable customers={customers}/>
                </Suspense>
            </section>
        </div>
    );
};

export default Page;
