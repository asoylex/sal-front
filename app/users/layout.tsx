

"use client";
import React, { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { logoutService } from '../services/auth';


interface LayoutClientProps {
    children: React.ReactNode;
}


export default function LayoutClient({ children }: LayoutClientProps) {

    const pathname = usePathname();
    interface User {
        user?: {
            firstName?: string;
        };
    }

    const [user, setUser] = useState<User>({}); // Estado para almacenar el usuario

    const isRoute = (path: string) => pathname === path;

    useEffect(() => {
        // Este código solo se ejecuta en el cliente
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem("user");
            setUser(userData ? JSON.parse(userData) : {});
        }
    }, []);

    return (
        <div>
            <Disclosure as="nav" className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-yellow-500 focus:outline-hidden focus:ring-inset">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />


                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    src="https://www.gruposalinas.com/Content/iconos/LogoGS-main.svg"

                                    className="h-8 w-auto"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {/* Current: "border-yellow-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                <Link
                                    href="/users"
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${isRoute("/") ? "border-yellow-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                >
                                    Usuarios
                                </Link>

                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-hidden">
                                        <span className="inline-flex size-10 items-center justify-center rounded-full bg-yellow-500 shadow-lg">
                                            <span className="text-white font-semibold">
                                                {
                                                    user?.user?.firstName?.charAt(0).toUpperCase()
                                                }

                                            </span>
                                        </span>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >

                                    <MenuItem>
                                        <button
                                            onClick={() => {

                                                logoutService();
                                                window.location.href = "/login";
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        >
                                            Cerrar Sesion
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 pt-2 pb-4">
                        {/* Current: "bg-yellow-50 border-yellow-500 text-yellow-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                        <Link
                            href="/client"
                            className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${isRoute("/client")
                                ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                        >
                            Realizar pedido
                        </Link>
                        <Link
                            href="/client/orders"
                            className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${isRoute("/client/orders")
                                ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                        >
                            Historial de Pedidos
                        </Link>
                    </div>
                </DisclosurePanel>
            </Disclosure >
            {children}
            < footer className="bg-white  bottom-0 w-full" >
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">

                    <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0">
                        &copy; 2024 Grupo Salinas, Inc. Todos los derechos reservados.
                    </p>
                </div>
            </ footer >
        </div >
    );
}