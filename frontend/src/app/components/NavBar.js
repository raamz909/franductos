"use client";

import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import useTheme from "../theme";

const formatearRuta = (pathname) => {
    const cleanPath = pathname.replace("/dashboard/", "").replace("-", " ");
    return cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1);
};

export default function NavBar() {
    const [theme, setTheme] = useTheme();
    const pathname = usePathname();

    return (
        <nav className="flex justify-between items-center p-4 bg-white dark:bg-[#0A0A0A] dark:text-white border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <h1 className="text-lg font-semibold">
                {pathname === "/dashboard" ? "Dashboard" : formatearRuta(pathname)}
            </h1>

            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="group p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
                {theme === "dark" ? (
                    <Sun size={24} className="text-white group-hover:text-black transition" />
                ) : (
                    <Moon size={24} />
                )}
            </button>
        </nav>
    );
}
