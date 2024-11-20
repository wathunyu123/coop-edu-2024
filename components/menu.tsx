"use client";

import Thai from '@/dictionary/thai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Menu() {
    const pathname = usePathname();

    // ฟังก์ชันตรวจสอบสถานะ Active
    const isActive = (paths: string[]) => paths.some((path) => pathname.startsWith(path));

    // รายการเมนู
    const menuItems = [
        { href: "/profile", label: Thai.Profile, activePaths: ["/profile"] },
        { href: "/changeEM", label: Thai.ChangeEM, activePaths: ["/changeEM", "/numberEM"] },
        { href: "/otp&pin", label: Thai.OTP, activePaths: ["/otp&pin"] },
        { href: "/unlock", label: Thai.Unlock, activePaths: ["/unlock"] },
    ];

    return (
        <header className="px-5 py-2 bg-blue-400 shadow-sm font-work-sans rounded-2xl mt-10 mx-40">
            <nav className="flex items-center justify-between font-bold px-10 text-white">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`hover:bg-white hover:text-black rounded-2xl px-4 py-2 transition-all ${isActive(item.activePaths) ? "bg-white text-black" : ""
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
