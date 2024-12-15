import SideNav from '@/app/ui/dashboard/SideNav';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <SideNav />
            <div className="flex-1 overflow-auto p-9">
                {children}
            </div>
        </div>
    );
}
