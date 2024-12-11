"use client";

import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { IoSearchCircle } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

/* import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { TbEdit } from "react-icons/tb";
import { nav } from "framer-motion/client"; */

export default function Navbar() {
  const navLinks = [];

  return (
    <nav>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        <section className="flex flex-col bg-white rounded-3xl min-h-screen m-10 w-72 px-6 py-6">
          <FiMenu className="text-sky-700 text-4xl mb-6" />
          <Link href={"/profile"}>
            <img
              src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
              alt="logo"
              className="bg-white shadow-2xl rounded-lg w-32 h-auto mx-auto my-4"
            />
          </Link>
        </section>

        <div className="flex justify-start items-start mx-10 my-6 p-4">
          <div className="flex max-w-3xl bg-white border border-gray-300 rounded-3xl px-4 py-2 shadow-sm h-10 w-full lg:w-[2000px] justify-between items-center">
            <input
              type="text"
              placeholder="รหัสสมาชิก"
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
            <IoSearchCircle className="text-black text-4xl" />
          </div>
        </div>

        <div className="flex justify-end items-start mx-5 my-10">
          <div className="flex justify-between items-center bg-white rounded-3xl px-2 py-1 w-[200px]">
            <Link href={"/"} className="relative group w-1/2">
              <IoNotifications className="text-black text-3xl rounded-3xl hover:bg-cyan-700 hover:text-white p-1 w-full" />
            </Link>
            <Link href={"/profile"} className="relative group w-1/2">
              <FaUserCircle className="text-black text-3xl rounded-3xl hover:bg-cyan-700 hover:text-white p-1 w-full" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* const Navbar = () => {
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

               
                <Link href="/" className="flex items-center transition-transform duration-300 transform hover:scale-110">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

               
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
 */
