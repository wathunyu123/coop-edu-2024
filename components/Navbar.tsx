"use client"; 

import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    const isActive = (linkPath: string) => pathname === linkPath;

    return (
        <header className="px-5 py-2 bg-blue-200 shadow-sm font-work-sans">
            <nav className="flex items-center justify-between font-bold">
                <Link href="/" className="ml-10">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <Link
                    href="/"
                    className={`hover:bg-white rounded-md ml-96 p-1 ${isActive("/") ? "bg-white text-blue-500" : ""
                        }`}
                >
                    <h1>Home</h1>
                </Link>

                <Link
                    href="/profile"
                    className={`hover:bg-white rounded-md mr-96 p-1 ${isActive("/profile") ? "bg-white text-blue-500" : ""
                        }`}
                >
                    <h1>ตรวจสอบสถานะ</h1>
                </Link>

                <Link
                    href="/profile"
                    className={` mr-10 ${isActive("/profile") ? " text-blue-500" : ""}`}
                >
                    <h1>
                        <FaUserCircle style={{ fontSize: "40px" }} />

                    </h1>
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
