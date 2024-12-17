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
        <div className="text-center col-start-1 col-span-3 min-h-1/2 bg-white p-6 rounded-3xl w-[250px]">
          <IoMenu className="text-3xl" />
          <div className="flex justify-center py-5">
            <img
              src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
              alt="logo"
              className="w-auto h-[80px] "
            />
          </div>

          <div className="flex flex-col justify-center items-center my-12 ">
            <div className="py-2 px-8 my-6 w-full rounded-xl hover:bg-cyan-700 hover:text-white">
              <Link href="/changeEM" className="flex items-center py-2">
                <FaExchangeAlt className="pr-3 text-4xl" />
                {Thai.ChangeEM}
              </Link>
            </div>

            <div className="py-2 px-8 my-6 w-full rounded-xl hover:bg-cyan-700 hover:text-white">
              <Link href="/otp&pin" className="flex items-center py-2">
                <MdSms className="pr-3 text-4xl" />
                {Thai.OTP}
              </Link>
            </div>

            <div className="py-2 px-8 my-6 w-full rounded-xl hover:bg-cyan-700 hover:text-white">
              <Link href="/unlock" className="flex items-center py-2">
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
