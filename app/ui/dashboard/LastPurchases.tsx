// app/ui/dashboard/CustomerTable.tsx (Client Component)

import {getAllPurchases} from "@/app/lib/db/query/purchase";
import {formatDateToLocal} from "@/app/lib/utils";

export default async function LastPurchases() {
    const purchases = await getAllPurchases();
    return (
        <div className="flex flex-col flex-1">
            <h3>Ultimas Compras</h3>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha de Compra</th>
                </tr>
                </thead>
                <tbody>
                {purchases.map((purchase, index) => (
                    <tr key={index}>
                        <td className="font-bold py-7">{purchase.customer.firstName}</td>
                        {/* Padding vertical */}
                        <td>{purchase.customer.lastName}</td>
                        {/* Padding vertical */}
                        <td>{formatDateToLocal(purchase.createdAt)}</td>
                        {/* Padding vertical */}
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}
