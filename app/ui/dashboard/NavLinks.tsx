'use client';

import NotificationIcon from '@/app/ui/icons/notifications.png'; // Importa imágenes dinámicas
import InventoryIcon from '@/app/ui/icons/inventory.png'; // Importa imágenes dinámicas
import ClientIcon from '@/app/ui/icons/clients.png'; // Importa imágenes dinámicas
import HomeIcon from '@/app/ui/icons/home.png'; // Importa imágenes dinámicas
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from "clsx";
import Image from 'next/image'; // Importa el componente para imágenes

const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Notificaciones',
    href: '/dashboard/notifications',
    icon: NotificationIcon, // Ruta de imagen
  },
  { name: 'Clientes', href: '/dashboard/customer', icon: ClientIcon },
  { name: 'Inventario', href: '/dashboard/inventory', icon: InventoryIcon },
];

export default function NavLinks({ isOpened }: { isOpened: boolean }) {
  const pathname = usePathname();

  return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;

          return (
              <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                      "flex items-center px-3 py-1 my-1 rounded-lg transition-all duration-300",
                      pathname === link.href ? "bg-gray-200" : "hover:bg-gray-200"
                  )}
              >
                {/* Contenedor fijo para el ícono */}
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Image
                          src={LinkIcon}
                          alt={`${link.name} icon`}
                          width={40}
                          height={40}
                      />
                </div>

                {/* Texto condicional */}
                {isOpened && (
                    <p className="text-gray-800 text-sm font-medium">
                      {link.name}
                    </p>
                )}
              </Link>
          );
        })}
      </>
  );
}
