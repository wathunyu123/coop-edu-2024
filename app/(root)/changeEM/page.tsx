"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import DeviceInfo from "@/components/diviceinfo";
import IsLoading from "@/components/isloading";
import ErrorPage from "@/components/404popup";

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

      return () => clearTimeout(fetchDataWithDelay); // เคลียร์ timeout เมื่อ `memberNo` เปลี่ยน
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

  if (fetchError) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={handleSearch} />
        <Menubar />

        <Suspense fallback={<IsLoading />}>
          {loading || !deviceData ? (
            <IsLoading />
          ) : (
            <DeviceInfo
              device_id={deviceData.device_id || "Not Provided"}
              device_type={deviceData.device_type || "Not Provided"}
              brand={deviceData.brand || "Not Provided"}
              model={deviceData.model || "Not Provided"}
              serial_number={deviceData.serial_number || "Not Provided"}
              status={deviceData.status || "Not Provided"}
              change_date={deviceData.change_date || "Not Provided"}
            />
          )}
        </Suspense>
      </Navbar>
    </div>
  );
}
