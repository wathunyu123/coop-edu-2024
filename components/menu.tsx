"use client"; // บอก Next.js ว่านี่คือ Client Component

import Thai from '@/dictionary/thai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Menu() {
    const pathname = usePathname(); // ดึงเส้นทางปัจจุบัน

    // ตรวจสอบว่าลิงก์เป็น active หรือไม่
    const isActive = (linkPath: string) => pathname === linkPath;

    return (
        <header className="px-5 py-2 bg-blue-400 shadow-sm font-work-sans rounded-2xl mt-10 mx-40">
            <nav className="flex items-center justify-between font-bold px-10 text-white">
                <Link
                    href="/profile"
                    className={`hover:bg-white hover:text-black rounded-2xl p-2 ${isActive("/profile") ? "bg-white text-black" : ""
                        }`}
                >
                    <h1>{Thai.Profile}</h1>
                </Link>

                <Link
                    href="/changeEM"
                    className={`hover:bg-white hover:text-black rounded-2xl p-2 ${isActive("/changeEM") ? "bg-white text-black" : ""
                        }`}
                >
                    {Thai.ChangeEM}
                </Link>

                <Link
                    href="/otp&pin"
                    className={`hover:bg-white hover:text-black rounded-2xl p-2 ${isActive("/") ? "bg-white text-black" : ""
                        }`}
                >
                    {Thai.OTP}
                </Link>

                <Link
                    href="/unlock"
                    className={`hover:bg-white hover:text-black rounded-2xl p-2 ${isActive("/") ? "bg-white text-black" : ""
                        }`}
                >
                    {Thai.Unlock}
                </Link>
            </nav>
        </header>
    );
}
