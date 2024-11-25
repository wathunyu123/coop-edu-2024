"use client";

import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { TbEdit } from "react-icons/tb";

const Navbar = () => {
    const pathname = usePathname();

    const isActive = (paths: string[]) =>
        paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

    const navLinks = [
        { href: "/", label: "หน้าแรก", activePaths: ["/"] },
        { href: "/profile", label: "ตรวจสอบสถานะ", activePaths: ["/profile", "/changeEM", "/numberEM", "/otp&pin", "/unlock"] },
    ];

    return (
        <header className="bg-blue-200 shadow-sm py-3 w-full font-work-sans sticky top-0 z-50 transition-all">
            <nav className="container mx-auto flex items-center justify-between px-5">

                {/* โลโก้ */}
                <Link href="/" className="flex items-center transition-transform duration-300 transform hover:scale-110">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                {/* เมนู */}
                <div className="flex space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out ${isActive(link.activePaths)
                                ? "bg-blue-500 text-white shadow-xl transform scale-105"
                                : "text-gray-800 hover:bg-blue-500 hover:text-white hover:scale-110"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Icon for profile */}
                <Link
                    href="/profile"
                    className={`flex items-center justify-center rounded-full transition-all transform hover:scale-125 duration-300 ease-in-out ${isActive(["/profile", "/changeEM", "/numberEM", "/otp&pin", "/unlock"]) ? "text-blue-500" : "text-black hover:text-blue-500"
                        }`}
                >
                    <FaUserCircle size={40} />
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
