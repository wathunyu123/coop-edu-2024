import Link from "next/link";
import Thai from "@/dictionary/thai";
import React from "react";
import { usePathname } from "next/navigation";

export default function Menucheng() {
  const pathname = usePathname();

  const isActive = (paths: string[]) =>
    paths.some((path) => pathname === path || pathname.startsWith(path));

  return (
    <div className="text-black flex md:flex-row w-full flex-col items-center justify-between rounded-3xl">
      <div className="flex md:flex-row w-full justify-between items-center gap-4 md:gap-0">
        <div className="w-full flex justify-center">
          <Link
            href="/changeEM"
            className={`px-6 py-1 ${
              pathname === "/changeEM"
                ? "bg-sky-700 text-white"
                : "hover:bg-white hover:text-black"
            } rounded-xl`}
          >
            {Thai.MemberNo || "Member No"}
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <Link
            href="/numberEM"
            className={`px-6 py-1 ${
              pathname === "/numberEM"
                ? " bg-sky-700 text-white"
                : "hover:bg-sky-800 hover:text-white"
            } rounded-xl`}
          >
            {Thai.NumberEM || "Number EM"}
          </Link>
        </div>
      </div>
    </div>
  );
}
