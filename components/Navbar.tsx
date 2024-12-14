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

  const navLinks = [
    { href: "/changeEM", label: Thai.ChangeEM, icon: FaExchangeAlt },
    /*          { href: "/otp&pin", label: Thai.OTP, icon: MdTextsms },
    { href: "/unlock", label: Thai.Unlock, icon: MdTextsms }, */
    ,
  ];

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
              <Link
                href="/changeEM"
                className="flex items-center"
              >
                <FaExchangeAlt className="pr-3 text-4xl" />
                {Thai.ChangeEM}
              </Link>
            </div>

            <div className="py-2 px-8 my-5 rounded-xl hover:bg-cyan-700 hover:text-white">
              <Link
                href="/otp&pin"
                className="flex items-center"
              >
                <MdSms className="pr-3 text-4xl" />

                {Thai.OTP}
              </Link>
            </div>

            <div className="py-2 px-8 my-5 rounded-xl hover:bg-cyan-700 hover:text-white">
              {" "}
              <Link
                href="/unlock"
                className="flex items-center"
              >
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
            <IoNotifications className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white"/>

            <FaUserCircle className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white"/>
          </div>
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
