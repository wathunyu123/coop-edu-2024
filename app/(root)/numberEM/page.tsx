"use client";

import ErrorPage from "@/components/404popup";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Thai from "@/dictionary/thai";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../changeEM/loading";
import Menubar from "@/components/menubar";

export default function ChangeEmPage() {
  const pathname = usePathname();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null); // ชัดเจนว่าเป็น Error หรือ null
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [device_id, setDevice_Id] = useState<string>("");
  const [device_type, setDevice_Type] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [serial_number, setSerial_Number] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [change_date, setChange_Date] = useState<string>("");

  // เปลี่ยนชื่อเป็น isPathActive
  const isPathActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  const searchParams = useSearchParams();
  const [memberNo, setMemberNo] = useState<string | null>(null);

  // ดึง memberNo จาก localStorage เมื่อหน้าเพจถูกโหลด
  useEffect(() => {
    const storedMemberNo = localStorage.getItem("memberNo");
    setMemberNo(storedMemberNo);
  }, []);

  // ฟังก์ชันสำหรับดึงข้อมูลจาก API
  const fetchData = async (memberNo: string) => {
    setIsLoading(true);
    setFetchError(null);

    try {
      if (!memberNo) {
        throw new Error("Member number is required");
      }

      const response = await fetch(
        `http://localhost:3000/api/device?id=${memberNo}`
      );

      if (!response.ok) {
        throw new Error("Device Not Found");
      }

      const data = await response.json();

      if (!data) {
        throw new Error("No data received");
      }

      // Set fetched data to state
      setDevice_Id(data.device_id || "");
      setDevice_Type(data.device_type || "");
      setBrand(data.brand || "");
      setModel(data.model || "");
      setSerial_Number(data.serial_number || "");
      setStatus(data.status || "");
      setChange_Date(data.change_date || "");
    } catch (error) {
      setFetchError(
        error instanceof Error ? error : new Error("Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ใช้ useEffect เมื่อ memberNo เปลี่ยนแปลง
  useEffect(() => {
    if (memberNo) {
      fetchData(memberNo); // ดึงข้อมูลจาก API เมื่อ memberNo ถูกตั้งค่า
    }
  }, [memberNo]);

  // ตรวจสอบว่า fetchError เป็น Error ก่อนที่จะเข้าถึง message
  if (fetchError instanceof Error) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`transition-container ${isFadingOut ? "fade-out" : "fade-in"}`}
    >
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />
        <Menubar />
        <div className="grid md:grid-cols-12 gap-4 min-h-screen">
          <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12">
            <div className="text-white flex flex-col md:flex-row w-full h-auto md:h-12 bg-sky-700 my-10 p-6 items-center justify-between rounded-3xl">
              <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 md:gap-0">
                <div className="w-full flex justify-center">
                  <Link
                    href="/changeEM"
                    className={`px-6 py-1 ${
                      isPathActive("/changeEM")
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
                      isPathActive("/numberEM")
                        ? "bg-white text-black"
                        : "hover:bg-white hover:text-black"
                    } rounded-xl`}
                  >
                    {Thai.NumberEM || "Number EM"}
                  </Link>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="bg-gray-200 rounded-2xl p-6 text-center text-blue-500">
                {Thai.Loading || "Loading..."}
              </div>
            ) : fetchError ? (
              <div className="bg-gray-200 rounded-2xl p-6 text-center text-red-500">
                {/* เราตรวจสอบว่าถ้า fetchError เป็น Error แล้ว */}
                {/* {fetchError.message} */}
              </div>
            ) : memberNo ? (
              <div className="bg-gray-200 rounded-2xl p-6">
                <div className="flex flex-col space-y-4 mx-10 py-5">
                  <div className="flex justify-between">
                    <span className="font-bold">
                      {Thai.Device_Id || "Device ID"}:
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
            ) : (
              <div className="bg-gray-200 rounded-2xl p-6 text-center text-red-500">
                {Thai.Nodata || "No data available"}
              </div>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}
