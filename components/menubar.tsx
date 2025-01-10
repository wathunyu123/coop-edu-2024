"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Thai from "@/dictionary/thai";

export default function Menubar() {
  const pathname = usePathname();

  const isActive = (paths: string[]) =>
    paths.some((path) => pathname === path || pathname.startsWith(path));

  return (
    <div className="text-black flex flex-col md:flex-row w-full h-auto md:h-12 bg-gray-200 mt-10 p-6 items-center justify-between rounded-xl shadow-xl ">
      <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 md:gap-0">
        <div className="w-full flex justify-center">
          <Link
            href="/changeEM"
            className={`px-6 py-1 ${
              isActive(["/changeEM", "/numberEM"])
                ? "bg-cyan-700 text-white "
                : "hover:bg-cyan-700 hover:text-white "
            } rounded-xl`}
          >
            {Thai.ChangeEM || "Member No"}
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <Link
            href="/otp&pin"
            className={`px-6 py-1 ${
              pathname === "/otp&pin"
                ? "bg-cyan-700 text-white"
                : "hover:bg-cyan-700 hover:text-white"
            } rounded-xl`}
          >
            {Thai.OTP || "Number EM"}
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <Link
            href="/unlock"
            className={`px-6 py-1 ${
              pathname === "/unlock"
                ? "bg-cyan-700 text-white"
                : "hover:bg-cyan-700 hover:text-white"
            } rounded-xl`}
          >
            {Thai.Unlock || "Number EM"}
          </Link>
        </div>
      </div>
    </div>
  );
}
