// components/Navbar.tsx
"use client";

import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaExchangeAlt, FaUserCircle, FaUnlockAlt } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Thai from "@/dictionary/thai";

export default function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen gap-4 ">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-white py-8 p-6 rounded-3xl w-[250px] h-[900px] z-50 md:relative md:translate-x-0 md:col-span-3 my-auto`}
      >
        <div className="flex justify-between items-center mb-4">
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
        <div className="flex flex-col justify-center items-center my-12 space-y-4 gap-10">
          <div
            className={`flex items-center py-2 px-2 w-full rounded-xl ${
              isActive("/changeEM")
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
              isActive("/otp&pin")
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
              isActive("/unlock")
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

      <div className="flex-1 px-3">
        <div className="md:hidden flex justify-between items-center mb-4">
          <IoMenu
            className="text-white text-3xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      </div>
    </div>
  );
}
