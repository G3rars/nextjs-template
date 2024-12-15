'use client';
import Image from 'next/image';
import NavLinks from '@/app/ui/dashboard/NavLinks';
import { useState } from "react";
import clsx from "clsx";
import MenuIcon from '@/app/ui/icons/menu.png'; // Ruta de la imagen
import LogoutIcon from '@/app/ui/icons/logout.png'; // Ruta de la imagen

export default function SideNav() {
    const [isOpened, setIsOpened] = useState(false);

    const handleSidebar = () => {
        setIsOpened(!isOpened);
    };

    return (
        <aside className={clsx(
            "flex flex-col justify-between bg-gray-100 h-dvh overflow-hidden transition-all duration-300",
            {
                "w-64": isOpened,
                "w-16": !isOpened,
            }
        )}>
            <section>
                {/* Contenedor del botón con ancho fijo */}
                <div className="flex items-center w-16 h-16 my-5">
                    <div className={`ml-3 hover:bg-gray-200 rounded-md duration-200`}>
                        <Image
                            src={MenuIcon}
                            onClick={handleSidebar}
                            alt="menu"
                            width={40}
                            height={40}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
                <NavLinks isOpened={isOpened} />
            </section>
            <section className={`flex`}>
                <div className={`ml-3 mb-5 hover:bg-gray-200 rounded-md duration-200`}>
                    <Image
                        src={LogoutIcon}
                        alt="logout"
                        width={40}
                        height={40}
                        className="cursor-pointer"
                    />
                </div>
            </section>
        </aside>
);
}
