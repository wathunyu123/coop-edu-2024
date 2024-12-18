'use client';

import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Navbar from "@/components/Navbar";

import Thai from "@/dictionary/thai";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { IoNotifications, IoSearchSharp } from "react-icons/io5";

export default function ChangeEM() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  const newDeviceInfo = {
    deviceName: "iPhone 15 Pro Max",
    deviceSerial: "ABC123XYZ456",
    deviceModel: "Apple",
    connectionStatus: "Connected",
    changeDate: "20 Nov 2024",
  };

  const searchParams = useSearchParams();
  const memberNo = searchParams.get("memberNo");

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 min-h-screen">
        <Navbar />
        <div className="text-center col-start-5 col-span-8 py-8">
          <div className="flex justify-between">
            <div className="bg-white max-h-8 w-3/4 rounded-xl flex justify-between items-center px-5">
              <input
                type="text"
                placeholder="รหัสสมาชิก"
                className="w-full outline-none"
              />
              <IoSearchSharp />
            </div>

            <div className="bg-white max-h-8 w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl">
              <Link
                href="/"
                className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
              >
                <IoNotifications />
              </Link>
              <Link
                href="/profile"
                className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
              >
                <FaUserCircle />
              </Link>
            </div>
          </div>

          <div className="text-white flex w-full h-12 bg-sky-700 my-10 p-6 items-center justify-between rounded-3xl">
            <div className="flex w-full justify-between items-center ">
              <div className="w-full flex justify-center">
                <Link
                  href="/changeEM"
                  className={`px-6 py-1 ${
                    isActive("/changeEM")
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  } rounded-xl`}
                >
                  {Thai.MemberNo}
                </Link>
              </div>
              <div className="w-full flex justify-center">
                <Link
                  href="/numberEM"
                  className={`px-6 py-1 ${
                    isActive("/numberEM")
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  } rounded-xl`}
                >
                  {Thai.NumberEM}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full h-3/4 p-6  bg-gray-300 rounded-3xl">
            <h1 className="flex w-full items-center justify-center text-xl">
              ไม่พบข้อมูล
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

