"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import DeviceInfo from "@/components/diviceinfo";
import IsLoading from "@/components/isloading";
import ErrorPage from "@/components/404popup";
import Menucheng from "@/components/menucheng";
import Delete from "@/components/delete";

// ฟังก์ชันดึงข้อมูลจาก API
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

  useEffect(() => {
    const storedMemberNo = localStorage.getItem("appMembNo");
    console.log("Stored memberNo from localStorage:", storedMemberNo);

    if (storedMemberNo) {
      setAppMembNo(storedMemberNo);
    }
  }, []);

  useEffect(() => {
    const memberNoFromURL = searchParams.get("id");
    console.log("memberNo from URL:", memberNoFromURL);

    if (memberNoFromURL) {
      setAppMembNo(memberNoFromURL);
    }
  }, [searchParams]);

  // ดึงข้อมูลจาก API เมื่อ appMembNo เปลี่ยน
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
        }, 1500); // ปรับเวลาได้ตามต้องการ
      })
      .catch((error) => {
        setFetchError(
          error instanceof Error ? error : new Error("Unknown error")
        );
        setLoading(false);
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
    // เพิ่มตรรกะถ้าจำเป็น
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete-device?appMemberNo=${appMembNo}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Device deleted successfully");

        // รีเซ็ตข้อมูลหลังจากการลบ
        setDeviceData(null); // ล้างข้อมูลใน state
        setLoading(true); // ตั้งสถานะโหลดใหม่
        setTimeout(() => {
          setLoading(false); // หยุดสถานะการโหลดหลังจากเวลา
        }, 1500); // ปรับเวลาได้ตามต้องการ
      } else {
        console.error("Failed to delete device");
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  if (fetchError) {
    console.error("Fetch error:", fetchError);
    return (
      <div className="min-h-screen">
        <Navbar>
          <Searchbar setMemberNo={setMemberNo} setAppMembNo={handleSearch} />
          <Menubar />
          <Menucheng />
          <div className="grid grid-cols-12 gap-4 min-h-screen">
            <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12">
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
        <Delete />{" "}
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
                appMembNo="-"
                appCoopCode="-"
                devcUniqueUid="-"
                devcPlatform="-"
                devcPlatformVer="-"
                devcModel="-"
                devcManufacturer="-"
                devcSerialNo="-"
                devcIsVirtual="-"
                devcFcmId="-"
                devcRegDate="-"
                devcLastUsed="-"
                devcCountUsed="-"
                devcUsageStatus="-"
                devcPriority="-"
                devcPubKey="-"
                sevrPvtKey="-"
              />
            )}
          </>
        )}
      </Navbar>
    </div>
  );
}
