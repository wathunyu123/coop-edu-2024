"use client";

import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { IoNotifications, IoSearchCircle } from "react-icons/io5";
import { FaExchangeAlt, FaUserCircle } from "react-icons/fa";

import { usePathname } from "next/navigation";
import Thai from "@/dictionary/thai";
import { hrtime } from "process";
import { HiRefresh } from "react-icons/hi";
import { label } from "framer-motion/client";
import { IoHome } from "react-icons/io5";
import { MdSms } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (paths: string[]) =>
    paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  const navLinks = [
    { href: "/changeEM", label: Thai.ChangeEM, icon: FaExchangeAlt },
    /*          { href: "/otp&pin", label: Thai.OTP, icon: MdTextsms },
    { href: "/unlock", label: Thai.Unlock, icon: MdTextsms }, */
    ,
  ];

  return (
    <nav>
      <div className="grid grid-col-12 gap-16 mx-auto min-h-screen max-w-full mt-32 ">
        <div className="flex flex-col bg-white p-6 m-2 col-span-3 gap-6 justify-start items-start rounded-3xl">
          <div className="flex items-center p-7 bg-blue-400 mx-auto my-12">
            logo
          </div>
          <div className="flex flex-col my-10 items-center">
            <div className="text-black px-4 px4 py-4 rounded-xl hover:bg-cyan-600 hover:text-white">
              <Link href="/">test</Link>
            </div>
            <div className="text-black px-4 px4 py-4 rounded-xl hover:bg-cyan-600 hover:text-white">
              <h1>test</h1>
            </div>
            <div className="text-black px-4 px4 py-4 rounded-xl hover:bg-cyan-600 hover:text-white">
              <h1>test</h1>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h1>searchbar</h1>
          </div>
          <div>
            <h1>profliebar</h1>
          </div>
        </div>
        {/*     <div className="flex flex-col max-w-full bg-white mx-5 p-6 min-h-screen my-16 rounded-3xl">
          <FiMenu className="text-black text-5xl flex items-start m-4" />
          <div className="flex jutify-center items-center p- 6">
            <img
              src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
              alt="logo"
            />
          </div>

          <div className="flex p-4 m-10 items-start justify-center h-full flex-col gap-32 text-xl">
            <div className="text-black p-3 rounded-3xl gap-4 flex items-center hover:bg-cyan-700 hover:text-white">
              <FaExchangeAlt />
              <Link href="/changeEM">{Thai.ChangeEM}</Link>
            </div>

            <div className="text-black p-3 rounded-3xl gap-4 flex items-center hover:bg-cyan-700 hover:text-white">
              <MdSms />
              <Link href="/otp&pin">{Thai.OTP}</Link>
            </div>

            <div className="text-black p-3 rounded-3xl gap-4 flex items-center justify-start hover:bg-cyan-700 hover:text-white">
              <FaUnlockAlt />
              <Link href="/unlock">{Thai.Unlock}</Link>
            </div>
          </div>
        </div> */}
      </div>
    </nav>
  );
}
{
  /* <div className="flex flex-col lg:flex-row w-full min-h-screen ">
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
                  </section> */
}

{
  /*   <div className="flex justify-start items-start mx-10 my-6 p-4">
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
    </div> */
}