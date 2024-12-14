"use client";

import { FaExchangeAlt, FaUserCircle } from "react-icons/fa";

import { usePathname } from "next/navigation";
import Thai from "@/dictionary/thai";
import { IoMenu } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { IoNotifications } from "react-icons/io5";
import { MdSms } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (paths: string[]) =>
    paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  return (
    <nav>
      <div className="grid grid-cols-12 gap-4 min-h-screen py-6">
        <div className="text-center col-start-1 col-span-3 min-h-52 bg-white p-6 rounded-3xl w-[250px]">
          <IoMenu className="text-3xl" />
          <div className="flex justify-center py-5">
            <img
              src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
              alt="logo"
              className="w-auto h-[80px] "
            />
          </div>

          <div className="flex flex-col justify-center items-start">
            <div className="py-2 px-8 my-5 rounded-xl hover:bg-cyan-700 hover:text-white">
              <Link href="/changeEM" className="flex items-center">
                <FaExchangeAlt className="pr-3 text-4xl" />
                {Thai.ChangeEM}
              </Link>
            </div>

            <div className="py-2 px-8 my-5 rounded-xl hover:bg-cyan-700 hover:text-white">
              <Link href="/otp&pin" className="flex items-center">
                <MdSms className="pr-3 text-4xl" />

                {Thai.OTP}
              </Link>
            </div>

            <div className="py-2 px-8 my-5 rounded-xl hover:bg-cyan-700 hover:text-white">
              {" "}
              <Link href="/unlock" className="flex items-center">
                <FaUnlockAlt className="pr-3 text-4xl" />

                {Thai.unlock}
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center col-start-5 col-span-8 flex justify-between">
          <div className="bg-white max-h-8 w-3/4 rounded-xl flex justify-between items-center px-5">
            <input
              type="text"
              placeholder="รหัสสมาชิก"
              className="w-full outline-none"
            />
            <IoSearchSharp />
          </div>

          <div className="bg-white max-h-8 w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl">
            <IoNotifications className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white" />

            <FaUserCircle className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white" />
          </div>
        </div>
      </div>

  
    </nav>
  );
}
