// components/Navbar.tsx
"use client";

import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaExchangeAlt, FaUserCircle, FaUnlockAlt } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Thai from "@/dictionary/thai";

import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
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
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-white py-6 gap-4 rounded-3xl w-[250px] max-h-[900px] z-50 md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-5 mb-4">
          <IoClose
            className="text-3xl cursor-pointer md:hidden"
            onClick={toggleSidebar}
          />
        </div>
        <div className="flex justify-center py-5">
          <img
            src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
            alt="logo"
            className="w-auto h-[80px]"
          />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center my-12 space-y-4">
          <div
            className={`flex items-center py-2 px-2 w-full rounded-xl ${
              isActive(["/changeEM", "/numberEM"])
                ? "bg-cyan-700 text-white"
                : "hover:bg-cyan-700 hover:text-white"
            }`}
          >
            <Link
              href="/changeEM"
              className="flex justify-center items-center w-full"
            >
              <FaExchangeAlt className="pr-3 text-4xl" />
              {Thai.ChangeEM}
            </Link>
          </div>
          <div
            className={`flex items-center py-2 px-2 w-full rounded-xl ${
              isActive(["/otp&pin"])
                ? "bg-cyan-700 text-white"
                : "hover:bg-cyan-700 hover:text-white"
            }`}
          >
            <Link
              href="/otp&pin"
              className="flex justify-center items-center w-full"
            >
              <MdSms className="pr-3 text-4xl" />
              {Thai.OTP}
            </Link>
          </div>
          <div
            className={`flex items-center py-2 px-2 w-full rounded-xl ${
              isActive(["/unlock"])
                ? "bg-cyan-700 text-white"
                : "hover:bg-cyan-700 hover:text-white"
            }`}
          >
            <Link
              href="/unlock"
              className="flex justify-center items-center w-full"
            >
              <FaUnlockAlt className="pr-3 text-4xl" />
              {Thai.unlock}
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-8">
        <div className="md:hidden flex justify-between items-center mb-4 text-white">
          <IoMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
        </div>
        {children}
      </div>
    </div>
  );
}
