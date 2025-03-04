"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import DeviceInfo from "@/components/diviceinfo";
import IsLoading from "@/components/isloading";
import ErrorPage from "@/components/404popup";
import Link from "next/link";
import Thai from "@/dictionary/thai";
import { Accordion, AccordionItem } from "@/components/accordion"; // Import accordion ที่มีการจัดการสถานะ
import Menucheng from "@/components/menucheng";
import { AccordionProvider } from "@/contexts/accordioncontext";
import Delete from "@/components/delete";
import IsAccordion from "@/components/delete";

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
        }, 1000); // คุณสามารถเปลี่ยนเวลา (ในที่นี้เป็น 1500ms) ตามที่ต้องการ
      })
      .catch((error) => {
        setFetchError(
          error instanceof Error ? error : new Error("Unknown error")
        );
        setDeviceData({
          appMembNo: "-",
          appCoopCode: "-",
          devcUniqueUid: "-",
          devcPlatform: "-",
          devcPlatformVer: "-",
          devcModel: "-",
          devcManufacturer: "-",
          devcSerialNo: "-",
          devcIsVirtual: "-",
          devcFcmId: "-",
          devcRegDate: "-",
          devcLastUsed: "-",
          devcCountUsed: "-",
          devcUsageStatus: "-",
          devcPriority: "-",
          devcPubKey: "-",
          sevrPvtKey: "-",
        }); // เมื่อเกิดข้อผิดพลาดให้ตั้งค่าเป็น "-" ทันที
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
    // Add your logic here if needed
  };

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

  const getSafeValue = (value: any) => {
    return value ? value : "-";
  };

  return (
    <AccordionProvider>
      <div>
        <Navbar>
          <Searchbar setMemberNo={setMemberNo} setAppMembNo={handleSearch} />
          <Menubar />
          <div className="bg-gray-300 p-6 my-5 rounded-2xl">
            <IsAccordion memberNo={appMembNo || "-"}>
              {loading ? (
                <IsLoading />
              ) : (
                <>
                  {deviceData ? (
                    <DeviceInfo
                      appMembNo={getSafeValue(deviceData.appMembNo)}
                      appCoopCode={getSafeValue(deviceData.appCoopCode)}
                      devcUniqueUid={getSafeValue(deviceData.devcUniqueUid)}
                      devcPlatform={getSafeValue(deviceData.devcPlatform)}
                      devcPlatformVer={getSafeValue(deviceData.devcPlatformVer)}
                      devcModel={getSafeValue(deviceData.devcModel)}
                      devcManufacturer={getSafeValue(
                        deviceData.devcManufacturer
                      )}
                      devcSerialNo={getSafeValue(deviceData.devcSerialNo)}
                      devcIsVirtual={getSafeValue(deviceData.devcIsVirtual)}
                      devcFcmId={getSafeValue(deviceData.devcFcmId)}
                      devcRegDate={getSafeValue(deviceData.devcRegDate)}
                      devcLastUsed={getSafeValue(deviceData.devcLastUsed)}
                      devcCountUsed={getSafeValue(deviceData.devcCountUsed)}
                      devcUsageStatus={getSafeValue(deviceData.devcUsageStatus)}
                      devcPriority={getSafeValue(deviceData.devcPriority)}
                      devcPubKey={getSafeValue(deviceData.devcPubKey)}
                      sevrPvtKey={getSafeValue(deviceData.sevrPvtKey)}
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
            </IsAccordion>
          </div>
        </Navbar>
      </div>
    </AccordionProvider>
  );
}
