"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import DeviceInfo from "@/components/diviceinfo";
import IsLoading from "@/components/isloading";
import ErrorPage from "@/components/404popup";
import Link from "next/link";
import Thai from "@/dictionary/thai";

const fetchDeviceData = async (memberNo: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/device?id=${memberNo}`
    );

    if (!response.ok) {
      throw new Error("Device Not Found");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default function ChangeEmPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [deviceData, setDeviceData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [memberNo, setMemberNo] = useState<string | null>(null);

  useEffect(() => {
    const storedMemberNo = localStorage.getItem("memberNo");
    if (storedMemberNo) {
      setMemberNo(storedMemberNo);
    }
  }, []);

  useEffect(() => {
    if (memberNo) {
      setLoading(true);
      const fetchDataWithDelay = setTimeout(() => {
        fetchDeviceData(memberNo)
          .then((data) => {
            setDeviceData(data);
          })
          .catch((error) => {
            setFetchError(
              error instanceof Error ? error : new Error("Unknown error")
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }, 2000);

      return () => clearTimeout(fetchDataWithDelay);
    }
  }, [memberNo]);

  useEffect(() => {
    const memberNoFromURL = searchParams.get("id");
    if (memberNoFromURL) {
      setMemberNo(memberNoFromURL);
    }
  }, [searchParams]);

  const handleSearch = (newMemberNo: string) => {
    localStorage.setItem("memberNo", newMemberNo);
    setMemberNo(newMemberNo);
  };
  useEffect(() => {
    if (memberNo) {
      setDeviceData(null); // รีเซ็ตข้อมูลโปรไฟล์ก่อนค้นหาครั้งใหม่
    }
  }, [memberNo]);

  if (fetchError) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  const deviceInfo = deviceData || {};
  const {
    device_id = "-",
    device_type = "-",
    brand = "-",
    model = "-",
    serial_number = "-",
    status = "-",
    change_date = "-",
  } = deviceInfo;

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={handleSearch} />
        <Menubar />
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
          {loading ? (
            <IsLoading />
          ) : (
            <>
              {deviceData ? (
                <DeviceInfo
                  device_id={deviceData.device_id ?? "-"}
                  device_type={deviceData.device_type ?? "-"}
                  brand={deviceData.brand ?? "-"}
                  model={deviceData.model ?? "-"}
                  serial_number={deviceData.serial_number ?? "-"}
                  status={deviceData.status ?? "-"}
                  change_date={deviceData.change_date ?? "-"}
                />
              ) : (
                <DeviceInfo
                  device_id="-"
                  device_type="-"
                  brand="-"
                  model="-"
                  serial_number="-"
                  status="-"
                  change_date="-"
                />
              )}
            </>
          )}
        </Suspense>
      </Navbar>
    </div>
  );
}
