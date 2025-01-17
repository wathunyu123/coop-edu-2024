"use client";

import ErrorPage from "@/components/404popup";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Thai from "@/dictionary/thai";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Menubar from "@/components/menubar";
import Loading from "@/app/loading";
import { Suspense } from "react";
import React from "react";
import IsLoading from "@/components/isloading";

export default function ChangeEmPage() {
  const DeviceInfo = React.lazy(() => import("@/components/diviceinfo"));

  const pathname = usePathname();
  const searchParams = useSearchParams(); // ใช้ useSearchParams แทน location.search
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<any>(null);
  const [memberNo, setMemberNo] = useState<string | null>(null);

  // ดึงข้อมูลจาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    const storedMemberNo = localStorage.getItem("memberNo");
    if (storedMemberNo) {
      setMemberNo(storedMemberNo); // ตั้งค่าจาก localStorage
    }
  }, []);

  // ฟังก์ชันสำหรับดึงข้อมูลจาก API
  const fetchData = async (memberNo: string) => {
    setFetchError(null); // รีเซ็ตข้อผิดพลาด
    setLoading(true); // ตั้งค่า loading เป็น true ก่อนการดึงข้อมูล

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

      setDeviceData(data); // ตั้งค่า state ของ deviceData
    } catch (error) {
      setFetchError(
        error instanceof Error ? error : new Error("Unknown error")
      );
    } finally {
      setLoading(false); // เมื่อข้อมูลถูกโหลดเสร็จ
    }
  };

  // เมื่อ `memberNo` เปลี่ยนแปลง, ให้ทำการดึงข้อมูลใหม่
  useEffect(() => {
    if (memberNo) {
      fetchData(memberNo);
    }
  }, [memberNo]);

  // ใช้ URL query parameter เป็น memberNo
  useEffect(() => {
    const memberNoFromURL = searchParams.get("id");
    if (memberNoFromURL) {
      setMemberNo(memberNoFromURL); // ตั้งค่า `memberNo` จาก URL
    }
  }, [searchParams]);

  const handleSearch = (newMemberNo: string) => {
    localStorage.setItem("memberNo", newMemberNo); // เก็บข้อมูลใน localStorage
    setMemberNo(newMemberNo); // ตั้งค่า memberNo ใหม่
  };

  // ตรวจสอบว่า fetchError เป็น Error ก่อนที่จะเข้าถึง message
  if (fetchError instanceof Error) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  // ถ้ากำลังโหลดข้อมูล
  /*   if (loading) {
      return <Loading />;
    } */

  // แสดงข้อมูลจาก API หรือแสดงข้อความ No data หากไม่มีข้อมูล
  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={handleSearch} /> {/* เพิ่ม onSearch */}
        <Menubar />
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

            <Suspense fallback={<IsLoading />}>
              {deviceData ? (
                <DeviceInfo
                  device_id={deviceData.device_id}
                  device_type={deviceData.device_type}
                  brand={deviceData.brand}
                  model={deviceData.model}
                  serial_number={deviceData.serial_number}
                  status={deviceData.status}
                  change_date={deviceData.change_date}
                />
              ) : (
                <div className="bg-gray-200 rounded-2xl p-6 text-center text-red-500">
                  {Thai.Nodata || "No data available"}
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
