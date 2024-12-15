
import { getTotalPurchasesMonth } from "@/app/lib/db/query/purchase";
import {getTotalCustomersMonth} from "@/app/lib/db/query/customer";


const Stats = async () => {
    const totalSalesMonthly = await getTotalPurchasesMonth();
    const newCustomers = await getTotalCustomersMonth();
    return (
        <>
        <div className="flex flex-1 justify-center">
            <div className="stats stats-vertical shadow">
                <div className="stat">
                    <div className="stat-title">Ventas del mes</div>
                    <div className="stat-value">{totalSalesMonthly?._count?.id ?? 0}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                <div className="stat-title">Nuevos Clientes</div>
                    <div className="stat-value">{newCustomers?._count?.id ?? 0}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Notificaciones enviadas</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Stats;