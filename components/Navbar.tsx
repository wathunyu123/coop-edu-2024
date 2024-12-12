"use client";

import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { IoNotifications, IoSearchCircle } from "react-icons/io5";
import { FaExchangeAlt, FaUserCircle } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";
import { usePathname } from "next/navigation";
import Thai from "@/dictionary/thai";
import { hrtime } from "process";
import { HiRefresh } from "react-icons/hi";
import { label } from "framer-motion/client";
import { IoHome } from "react-icons/io5";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (paths: string[]) =>
    paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  const navLinks = [
    { href: "/changeEM", label: Thai.ChangeEM, icon: FaExchangeAlt },
    { href: "/otp&pin", label: Thai.OTP, icon: MdTextsms },
    { href: "/unlock", label: Thai.Unlock, icon: MdTextsms },
  ];

  return (
    <nav>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        <section className="flex flex-col bg-white rounded-3xl min-h-screen m-10 w-72 px-6 py-6">
          <FiMenu className="text-black text-4xl mb-6" />
          <Link href={"/profile"}>
            <img
              src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
              alt="PSU Coop Logo"
              className="bg-white shadow-2xl rounded-full w-32 h-auto mx-auto my-4"
            />
          </Link>

          <div className="flex flex-col items-start justify-center mx-10 gap-20 my-10 text-black">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center text-xl px-1.5 py-2 rounded-2xl mb-5 hover:bg-cyan-700 hover:text-white ${
                  isActive([href]) ? "bg-cyan-700 text-white" : ""
                }`}
              >
                <Icon className="mx-2 text-3xl" />
                {label}
              </Link>
            ))}
          </div>
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
              <IoNotifications
                className={`text-3xl rounded-3xl p-1 w-full ${
                  pathname === "/"
                    ? "bg-cyan-700 text-white"
                    : "text-black hover:bg-cyan-700 hover:text-white"
                }`}
              />
            </Link>

            <Link href={"/profile"} className="relative group w-1/2">
              <FaUserCircle
                className={`text-3xl rounded-3xl p-1 w-full ${
                  pathname === "/profile"
                    ? "bg-cyan-700 text-white"
                    : "text-black hover:bg-cyan-700 hover:text-white"
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
