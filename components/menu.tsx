"use client";

import Thai from "@/dictionary/thai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaExchangeAlt, FaKey, FaUnlock } from "react-icons/fa";

export default function Menu() {
    const pathname = usePathname();

    // ฟังก์ชันเพื่อตรวจสอบว่าเมนูไหนที่กำลัง active
    const isActive = (paths: string[]) => paths.some((path) => pathname.startsWith(path));

    // ข้อมูลเมนูที่ต้องการแสดง
    const menuItems = [
        {
            href: "/profile",
            label: Thai.Profile,
            icon: <FaUser />,
            activePaths: ["/profile"],
        },
        {
            href: "/changeEM",
            label: Thai.ChangeEM,
            icon: <FaExchangeAlt />,
            activePaths: ["/changeEM", "/numberEM"],
        },
        {
            href: "/otp&pin",
            label: Thai.OTP,
            icon: <FaKey />,
            activePaths: ["/otp&pin"],
        },
        {
            href: "/unlock",
            label: Thai.Unlock,
            icon: <FaUnlock />,
            activePaths: ["/unlock"],
        },
    ];

    return (
        <header className="px-5 py-2 bg-blue-400 shadow-lg font-work-sans rounded-2xl mt-10 mx-auto max-w-4xl">
            <nav className="flex items-center justify-between font-bold px-5 text-white">
                {menuItems.map((item) => (
                    <motion.div
                        key={item.href}
                        whileHover={{ scale: 1.1 }} // ขยายเมื่อ hover
                        whileTap={{ scale: 0.95 }} // ย่อเมื่อคลิก
                        className="flex items-center space-x-2"
                    >
                        <Link
                            href={item.href}
                            className={`flex items-center space-x-2 hover:bg-white hover:text-black rounded-xl px-4 py-2 transition-all ${isActive(item.activePaths) ? "bg-white text-black" : ""}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    </motion.div>
                ))}
            </nav>
        </header>
    );
}
