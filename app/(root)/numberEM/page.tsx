"use client";

import Thai from "@/dictionary/thai";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { IoNotifications, IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function ChangeEM() {
  const pathname = usePathname();

  const isActive = (linkPath: string) => pathname === linkPath;

  const newDeviceInfo = {
    deviceName: "iPhone 15 Pro Max",
    deviceSerial: "ABC123XYZ456",
    deviceModel: "Apple",
    connectionStatus: "Connected",
    changeDate: "20 Nov 2024",
  };

  const [memberNo, setMemberNo] = useState<string | null>(null);

  useEffect(() => {
    setMemberNo(localStorage.getItem("memberNo"));
  }, []);

  return (
    <Navbar>
      <div className="grid md:grid-cols-12 gap-4 min-h-screen">
        {/* Add any children components here */}

        <div className="text-center col-start-1 col-span-12 lg:col-start-2 lg:col-span-11 ">
          <div className="md:flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-full rounded-xl flex justify-between items-center px-2 py-2 ">
                <input
                  type="text"
                  value={memberNo || ""}
                  onChange={(e) => setMemberNo(e.target.value)}
                  placeholder="รหัสสมาชิก"
                  className="w-full outline-none bg-gray-200 px-6"
                />
                <IoSearchSharp />
              </div>

              <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl mt-4 md:mt-0">
                <Link
                  href="/"
                  className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
                >
                  <IoNotifications />
                </Link>
                <Link
                  href="/profile"
                  className={`w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center ${
                    isActive("/profile") ? "bg-cyan-700 text-white" : ""
                  }`}
                >
                  <FaUserCircle />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-white flex flex-col md:flex-row w-full h-auto md:h-12 bg-sky-700 my-10 p-6 items-center justify-between rounded-3xl">
            <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 md:gap-0">
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

          {memberNo ? (
            <div className="bg-gray-200 rounded-2xl p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <span className="font-bold">{Thai.DeviceName}:</span>
                  <span>{newDeviceInfo.deviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">{Thai.DeviceSerial}:</span>
                  <span>{newDeviceInfo.deviceSerial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">{Thai.DeviceModel}:</span>
                  <span>{newDeviceInfo.deviceModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">{Thai.ConnectionStatus}:</span>
                  <span>{newDeviceInfo.connectionStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">{Thai.ChangeDate}:</span>
                  <span>{newDeviceInfo.changeDate}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-200 rounded-2xl p-6 text-center text-red-500">
              ไม่พบข้อมูล
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}
{
  /* <Container>
      <div>
        <IDbox />
        <Menu />
      </div>
      <div className="flex flex-wrap items-start justify-between mt-5 gap-5">
        
        <div className="flex flex-col bg-blue-400 px-8 py-6 lg:px-20 lg:py-10 rounded-2xl text-center w-full lg:w-1/3">
          <h1 className="text-white text-lg mb-4">{Thai.NumberEM}</h1>
          <div className="bg-white px-8 py-4 rounded-lg shadow-md">
            {Thai.NumberEM}
          </div>
        </div>

       
        <div className="flex flex-col bg-white border-2 border-black rounded-2xl px-6 py-10 w-full max-w-2xl">
          <div className="flex justify-between mb-6">
            <Link
              href="/changeEM"
              className={`hover:bg-blue-400 hover:text-white rounded-md px-4 py-2 ${
                isActive("/changeEM") ? "bg-blue-400 text-white" : ""
              }`}
            >
              {Thai.MemberNo}
            </Link>
            <Link
              href="/numberEM"
              className={`hover:bg-blue-400 hover:text-white rounded-md px-4 py-2 ${
                isActive("/numberEM") ? "bg-blue-400 text-white" : ""
              }`}
            >
              {Thai.NumberEM}
            </Link>
          </div>

         
          <div className="bg-gray-200 rounded-2xl p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">{Thai.DeviceName}:</span>
                <span>{newDeviceInfo.deviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">{Thai.DeviceSerial}:</span>
                <span>{newDeviceInfo.deviceSerial}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">{Thai.DeviceModel}:</span>
                <span>{newDeviceInfo.deviceModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">{Thai.ConnectionStatus}:</span>
                <span>{newDeviceInfo.connectionStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">{Thai.ChangeDate}:</span>
                <span>{newDeviceInfo.changeDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container> */
}
