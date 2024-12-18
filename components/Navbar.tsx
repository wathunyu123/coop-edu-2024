// components/Navbar.tsx
"use client";

import { FaExchangeAlt, FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Thai from "@/dictionary/thai";
import { IoMenu, IoSearchSharp, IoNotifications } from "react-icons/io5";
import { MdSms } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import Link from "next/link";
import { NavbarProps } from "@nextui-org/navbar";

export default function Navbar({ children }: NavbarProps) {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  return (
    <nav>
      {children}
      <div className="grid grid-cols-12 gap-4 min-h-screen py-8 ">
        {/* Sidebar */}
        <div className="text-center col-start-1 col-span-3 max-h-[80%] bg-white p-6 rounded-3xl w-[250px]">
          <IoMenu className="text-3xl" />
          <div className="lg:flex justify-center py-5">
            <img
              src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
              alt="logo"
              className="w-auto h-[80px] "
            />
          </div>

          <div className="lg:flex flex-col justify-center items-center my-12 ">
            <div
              className={`flex items-start py-2 px-2 w-full rounded-xl ${
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
              className={`flex items-center justify-start mt-16 py-2 px-2 w-full rounded-xl ${
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
              className={`flex items-center justify-start mt-16 py-2 px-2 w-full rounded-xl ${
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
      </div>
    </nav>
  );
}
