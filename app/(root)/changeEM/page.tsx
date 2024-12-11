'use client';

import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Menu from "@/components/menu";
import Navbar from "@/components/Navbar";
import Thai from "@/dictionary/thai";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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

  const searchParams = useSearchParams();
  const memberNo = searchParams.get("memberNo");

  return (
    <Container>
      <div>
        <Navbar />
        <IDbox />
        <Menu />
      </div>
      <div className="flex flex-wrap items-start justify-between mt-5 gap-5">
        {/* Device Information Card */}
        <div className="flex flex-col bg-blue-400 px-8 py-6 lg:px-20 lg:py-10 rounded-2xl text-center w-full lg:w-1/3">
          <h1 className="text-white text-lg mb-4">{Thai.NumberEM}</h1>
          <div className="bg-white px-8 py-4 rounded-lg shadow-md">
            {Thai.NumberEM}
          </div>
        </div>

        {/* Links to other sections */}
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

          {/* Device Info */}
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
    </Container>
  );
}
