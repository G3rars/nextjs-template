import SideNav from '@/app/ui/dashboard/SideNav';
import React from "react";

export const experimental_ppr = true

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
                <SideNav />
            <div className="flex flex-1">{children}</div>
        </div>
    );
}