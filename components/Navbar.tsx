"use client";

import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    // ตรวจสอบ Active ตามเส้นทาง
    const isActive = (paths: string[]) =>
        paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

    const navLinks = [
        { href: "/", label: "Home", activePaths: ["/"] },
        { href: "/profile", label: "ตรวจสอบสถานะ", activePaths: ["/profile", "/changeEM", "/numberEM", "/otp&pin", "/unlock"] },
    ];

    return (
        <header className="bg-blue-200 shadow-sm py-3 font-work-sans">
            <nav className="container mx-auto flex items-center justify-between px-5">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                {/* Navigation Links */}
                <div className="flex space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-2 rounded-md text-lg font-medium transition-all ${isActive(link.activePaths)
                                ? "bg-white text-blue-500 shadow-md"
                                : "text-gray-800 hover:bg-white hover:text-blue-500"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* User Icon */}
                <Link
                    href="/profile"
                    className={`flex items-center justify-center rounded-full transition-all ${isActive(["/profile", "/changeEM", "/numberEM", "/otp&pin", "/unlock"]) ? "text-blue-500" : "text-black hover:text-blue-500"
                        }`}
                >
                    <FaUserCircle size={40} />
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
