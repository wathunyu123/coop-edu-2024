import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Thai from "@/dictionary/thai";
import Button from "./button";

export default function Menucheng() {
  const [error, setError] = useState<string>("");
  const pathname = usePathname();

  return (
    <div className="text-black flex md:flex-row w-full flex-col items-center justify-between rounded-3xl ">
      <div className="flex md:flex-row px-2 w-full justify-between items-center gap-2 md:gap-0">
        <div className="w-full flex justify-center">
          <Link
            href="/changeEM"
            className={`px-6 py-1 ${
              pathname === "/changeEM"
                ? "bg-sky-700 text-white"
                : "hover:bg-sky-800 hover:text-white"
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
                ? "bg-sky-700 text-white"
                : "hover:bg-sky-800 hover:text-white"
            } rounded-xl`}
          >
            {Thai.NumberEM || "Number EM"}
          </Link>
        </div>
      </div>

      {error && <div className="text-center text-red-500 mt-4">{error}</div>}
    </div>
  );
}
