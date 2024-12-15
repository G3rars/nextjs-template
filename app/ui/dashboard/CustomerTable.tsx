'use client'
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@/app/ui/icons/delete.png';
import SettingsIcon from '@/app/ui/icons/settings.png';
import AddIcon from '@/app/ui/icons/add.png';
import Image from "next/image";

export default function CustomerTable({ customers }) {

    // Estado para manejar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768); // 768px es un valor común para móviles
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const openModal = (e, customer) => {
        e.stopPropagation();
        setSelectedCustomer(customer);
        if (isMobile) {
            setIsModalOpen(true);
        }
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    return (
        <div className="w-full text">
            {/* Modal (solo visible en dispositivos móviles) */}
            <dialog id="my_modal_5" className={`modal ${isModalOpen ? 'modal-open' : ''} modal-bottom sm:modal-middle md:hidden`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Detalles del Cliente</h3>
                    <div className="py-4">
                        {selectedCustomer && (
                            <>
                                <p><strong>Nombre:</strong> {selectedCustomer.firstName} {selectedCustomer.lastName}</p>
                                <p><strong>Teléfono:</strong> {selectedCustomer.phone}</p>
                                <p><strong>Correo Electrónico:</strong> {selectedCustomer.email}</p>
                                <p><strong>Dirección:</strong> {selectedCustomer.address}</p>
                            </>
                        )}
                    </div>
                    <div className="modal-action">
                        <button className="btn" onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            </dialog>

            <h3>Registrados</h3>
            <table className="table table-xs md:table-md lg:table-lg">
                {/* head */}
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th className="md:table-cell hidden">Teléfono</th>
                    <th className="md:table-cell hidden">Correo Electrónico</th>
                    <th className="md:table-cell hidden">Dirección</th>
                    <th className="flex justify-center items-center">
                        <Image className="cursor-pointer rounded-md hover:bg-gray-200 duration-200" src={AddIcon} alt={"Add"} width={60} height={60} />
                    </th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) => (
                    <tr
                        key={index}
                        onClick={(e) => openModal(e, customer)} // Abre el modal con el cliente seleccionado
                        className="hover:cursor-pointer hover:bg-gray-200 md:hover:cursor-default md:hover:bg-transparent duration-200"
                    >
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-8 w-8 md:h-12 md:w-12">
                                        <img src={customer?.imageUrl} alt="Avatar" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold py-4">{customer.firstName}</div>
                                </div>
                            </div>
                        </td>
                        <td>{customer.lastName}</td>
                        <td className="md:table-cell hidden">{customer.phone}</td>
                        <td className="md:table-cell hidden">{customer.email}</td>
                        <td className="md:table-cell hidden">{customer.address}</td>
                        <td className="flex justify-center items-center">
                            <a
                                onClick={(e) => e.stopPropagation()} // Detiene la propagación del clic en este botón
                            >
                                <Image className="cursor-pointer rounded-md hover:bg-gray-200 duration-200" src={SettingsIcon} alt={"Setting"} width={40} height={40} />
                            </a>
                            <a
                                onClick={(e) => e.stopPropagation()} // Detiene la propagación del clic en este botón
                            >
                                <Image className="cursor-pointer rounded-md hover:bg-gray-200 duration-200" src={DeleteIcon} alt={"Delete"} width={40} height={40} />
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={6} className="text-center">
                        <div className="join flex justify-center">
                            <button className="join-item btn">1</button>
                            <button className="join-item btn">2</button>
                            <button className="join-item btn btn-disabled">...</button>
                            <button className="join-item btn">99</button>
                            <button className="join-item btn">100</button>
                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
}
