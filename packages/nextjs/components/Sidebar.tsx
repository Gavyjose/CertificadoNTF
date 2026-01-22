"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    AcademicCapIcon,
    HomeIcon,
    BeakerIcon,
    DocumentPlusIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";

export const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/", icon: Squares2X2Icon },
        { name: "Emitir", href: "/", icon: DocumentPlusIcon },
        { name: "Explorar", href: "/", icon: BeakerIcon },
        { name: "Academia", href: "/", icon: AcademicCapIcon },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-20 bg-secondary border-r border-primary/10 h-screen sticky top-0 items-center py-8 gap-10">
            <div className="bg-primary/20 p-3 rounded-2xl">
                <AcademicCapIcon className="h-8 w-8 text-primary" />
            </div>

            <nav className="flex flex-col gap-6">
                {navItems.map((item, idx) => {
                    const isActive = pathname === item.href && idx === 0; // Simplified for demo
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`p-3 rounded-2xl transition-all group relative ${isActive ? "bg-primary text-primary-content shadow-lg shadow-primary/20" : "text-opacity-50 hover:bg-primary/10 hover:text-primary"
                                }`}
                        >
                            <item.icon className="h-6 w-6" />
                            <span className="absolute left-full ml-4 bg-primary text-primary-content text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto flex flex-col gap-6 items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent animate-pulse" />
            </div>
        </aside>
    );
};
