// components/DeviceInfo.tsx
import Thai from "@/dictionary/thai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type DeviceInfoProps = {
  device_id: string;
  device_type: string;
  brand: string;
  model: string;
  serial_number: string;
  status: string;
  change_date: string;
};

const DeviceInfo: React.FC<DeviceInfoProps> = ({
  device_id,
  device_type,
  brand,
  model,
  serial_number,
  status,
  change_date,
}) => {
  const pathname = usePathname(); // มาที่นี้เพื่อให้ใช้ pathname ได้ถูกต้องภายในคอมโพเนนต์

  return (
    <div className="grid md:grid-cols-12 gap-4 min-h-screen">
      <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12">
        <div className="text-white flex flex-col md:flex-row w-full h-auto md:h-12 bg-sky-700 my-10 p-6 items-center justify-between rounded-3xl">
          <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 md:gap-0">
            <div className="w-full flex justify-center">
              <Link
                href="/changeEM"
                className={`px-6 py-1 ${
                  pathname === "/changeEM"
                    ? "bg-white text-black"
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
                    ? "bg-white text-black"
                    : "hover:bg-white hover:text-black"
                } rounded-xl`}
              >
                {Thai.NumberEM || "Number EM"}
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 rounded-2xl p-6">
          <div className="flex flex-col space-y-4 mx-10 py-5">
            <div className="flex justify-between">
              <span className="font-bold">
                {Thai.Device_Id || "Device Id"}:
              </span>
              <span>{device_id || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">
                {Thai.Device_Type || "Device Type"}:
              </span>
              <span>{device_type || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">{Thai.Brand || "Brand"}:</span>
              <span>{brand || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">
                {Thai.DeviceModel || "Device Model"}:
              </span>
              <span>{model || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">
                {Thai.DeviceSerial || "Device Serial"}:
              </span>
              <span>{serial_number || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">
                {Thai.Device_Status || "Device Status"}:
              </span>
              <span>{status || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">
                {Thai.ChangeDate || "Change Date"}:
              </span>
              <span>{change_date || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
