"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import DeviceInfo from "@/components/diviceinfo";
import IsLoading from "@/components/isloading";
import ErrorPage from "@/components/404popup"; // ใช้ ErrorPage ในกรณีมีข้อผิดพลาด
import Link from "next/link";
import Thai from "@/dictionary/thai";
import Delete from "@/components/delete";

// ฟังก์ชั่นดึงข้อมูลจาก API
const fetchDeviceData = async (appMembNo: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/devices?appMemberNo=${appMembNo}`
    );
    console.log("API response status:", response.status);
    if (!response.ok) {
      throw new Error("Device Not Found");
    }
    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

export default function ChangeEmPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [deviceData, setDeviceData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [appMembNo, setAppMembNo] = useState<string | null>(null);

  // ดึง appMembNo จาก localStorage หรือ query params
  useEffect(() => {
    const storedMemberNo = localStorage.getItem("appMembNo");
    console.log("Stored memberNo from localStorage:", storedMemberNo);

    if (storedMemberNo) {
      setAppMembNo(storedMemberNo);
    }
  }, []);

  // ดึง appMembNo จาก query params (ถ้ามี)
  useEffect(() => {
    const memberNoFromURL = searchParams.get("id");
    console.log("memberNo from URL:", memberNoFromURL);

    if (memberNoFromURL) {
      setAppMembNo(memberNoFromURL);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!appMembNo) {
      return;
    }

    console.log("Fetching device data for appMembNo:", appMembNo);

    setLoading(true);
    setFetchError(null);
    setDeviceData(null);

    fetchDeviceData(appMembNo)
      .then((data) => {
        const formattedData = {
          ...data,
          devcRegDate:
            data.devcRegDate && Object.keys(data.devcRegDate).length > 0
              ? data.devcRegDate
              : "Not available",
          devcLastUsed: data.devcLastUsed || "Never Used",
          devcCountUsed: data.devcCountUsed
            ? data.devcCountUsed.toString()
            : "0",
        };
        setDeviceData(formattedData);

        setTimeout(() => {
          setLoading(false);
        }, 1500); // คุณสามารถเปลี่ยนเวลา (ในที่นี้เป็น 1500ms) ตามที่ต้องการ
      })
      .catch((error) => {
        setFetchError(
          error instanceof Error ? error : new Error("Unknown error")
        );
      });
  }, [appMembNo]);

  const handleSearch = (newAppMembNo: string) => {
    console.log("handleSearch called with newAppMembNo:", newAppMembNo);

    if (newAppMembNo !== appMembNo) {
      localStorage.setItem("appMembNo", newAppMembNo);
      setAppMembNo(newAppMembNo);
    }
  };

  const setMemberNo = (newMemberNo: string) => {
    console.log("setMemberNo called with newMemberNo:", newMemberNo);
    // Add your logic here if needed
  };

  // แสดง ErrorPage ถ้ามีข้อผิดพลาด
  if (fetchError) {
    console.error("Fetch error:", fetchError);
    return (
      <div className="min-h-screen">
        <Navbar>
          <Searchbar setMemberNo={setMemberNo} setAppMembNo={handleSearch} />
          <Menubar />
          <div className="grid grid-cols-12 gap-4 min-h-screen">
            <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
              <ErrorPage error={fetchError} reset={() => setFetchError(null)} />
            </div>
          </div>
        </Navbar>
      </div>
    );
  }

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} setAppMembNo={handleSearch} />

        <Menubar />
        <Delete />
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

        {/* แสดงสถานะการโหลด */}
        {loading ? (
          <IsLoading />
        ) : (
          <>
            {deviceData ? (
              <DeviceInfo
                appMembNo={deviceData.appMembNo}
                appCoopCode={deviceData.appCoopCode}
                devcUniqueUid={deviceData.devcUniqueUid}
                devcPlatform={deviceData.devcPlatform}
                devcPlatformVer={deviceData.devcPlatformVer}
                devcModel={deviceData.devcModel}
                devcManufacturer={deviceData.devcManufacturer}
                devcSerialNo={deviceData.devcSerialNo}
                devcIsVirtual={deviceData.devcIsVirtual}
                devcFcmId={deviceData.devcFcmId}
                devcRegDate={JSON.stringify(deviceData.devcRegDate)}
                devcLastUsed={deviceData.devcLastUsed}
                devcCountUsed={deviceData.devcCountUsed}
                devcUsageStatus={deviceData.devcUsageStatus}
                devcPriority={deviceData.devcPriority}
                devcPubKey={deviceData.devcPubKey}
                sevrPvtKey={deviceData.sevrPvtKey}
              />
            ) : (
              <DeviceInfo
                appMembNo=""
                appCoopCode=""
                devcUniqueUid=""
                devcPlatform=""
                devcPlatformVer=""
                devcModel=""
                devcManufacturer=""
                devcSerialNo=""
                devcIsVirtual=""
                devcFcmId=""
                devcRegDate=""
                devcLastUsed=""
                devcCountUsed=""
                devcUsageStatus=""
                devcPriority=""
                devcPubKey=""
                sevrPvtKey=""
              />
            )}
          </>
        )}
      </Navbar>
    </div>
  );
}
