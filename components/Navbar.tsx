// components/Navbar.tsx
"use client";

import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaExchangeAlt, FaUnlockAlt } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Thai from "@/dictionary/thai";

import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode; // กำหนดประเภทของ children ให้เป็น ReactNode
}

export default function Navbar({ children }: NavbarProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (paths: string[]) =>
    paths.some((path) => pathname === path || pathname.startsWith(path));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex pt-8 flex-col md:flex-row min-h-screen ">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "-translate-x-4" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-200 shadow-xl py-6 gap-4 rounded-3xl w-[250px] max-h-[900px] z-50 md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center py-5 px-10 mb-4">
          <IoClose
            className="text-3xl cursor-pointer md:hidden"
            onClick={toggleSidebar}
          />
        </div>
        <Link href="/" className="flex justify-center py-5">
          <img
            src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
            alt="logo"
            className="w-auto h-[80px]"
          />
        </Link>
        <div className="flex flex-col gap-8 justify-center items-center my-12 space-y-4">
          <div
            className={`flex items-center py-2 px-2 w-4/5  rounded-xl ${
              isActive(["/changeEM", "/numberEM", "/otp&pin", "/unlock"])
                ? "bg-cyan-700 text-white"
                : "hover:bg-cyan-700 hover:text-white"
            }`}
          >
            <Link
              href="/changeEM "
              className="flex justify-center items-center w-full"
            >
              <FaExchangeAlt className="pr-3 text-4xl" />
              {Thai.ChangeEM}
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-8">
        <div className="md:hidden flex justify-between items-center mb-4 text-black">
          <IoMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
        </div>
        {children}
      </div>
    </div>
  );
}
