"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, Package, ShoppingCart, CreditCard, Users, Warehouse, UserCheck, Menu } from "lucide-react";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`h-screen transition-all ${collapsed ? "w-16" : "w-60"} p-4 flex flex-col bg-white text-black dark:bg-[#0a0a0a] dark:text-white border-r border-gray-100 dark:border-gray-800`}>

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white mb-4"
            >
                <Menu />
            </button>

            <nav className="flex flex-col gap-3">
                <NavItem href="/dashboard/productos" icon={<Package size={20} />} label="Productos" collapsed={collapsed} />
                <NavItem href="/dashboard/ventas" icon={<ShoppingCart size={20} />} label="Ventas" collapsed={collapsed} />
                <NavItem href="/dashboard/compras" icon={<CreditCard size={20} />} label="Compras" collapsed={collapsed} />
                <NavItem href="/dashboard/inventario" icon={<Warehouse size={20} />} label="Inventario" collapsed={collapsed} />
                <NavItem href="/dashboard/clientes" icon={<Users size={20} />} label="Clientes" collapsed={collapsed} />
                <NavItem href="/dashboard/empleados" icon={<UserCheck size={20} />} label="Empleados" collapsed={collapsed} />
            </nav>
        </aside>
    );
}

function NavItem({ href, icon, label, collapsed }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-white hover:text-black dark:hover:text-black"
        >
            {icon}
            {!collapsed && <span className="text-sm">{label}</span>}
        </Link>
    );
}
