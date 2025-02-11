"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import Popup from "@/components/popup";
import IsLoading from "@/components/isloading";
import ErrorPage from "@/components/404popup"; // ใช้ ErrorPage เพื่อแสดงข้อผิดพลาด
import PinInfo from "@/components/pininfo";
import { usePathname } from "next/navigation";

export default function OtpPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<Error | null>(null); // ข้อผิดพลาดจากการดึงข้อมูล
  const [status, setStatus] = useState<string>("normal");
  const [pinAttempts, setPinAttempts] = useState<number>(0);
  const [memberNo, setMemberNo] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"otp" | "pin" | "editStatus">(
    "otp"
  );

  useEffect(() => {
    const savedMemberNo = localStorage.getItem("memberNo");
    if (savedMemberNo) {
      setMemberNo(savedMemberNo);
    }
  }, []);

  useEffect(() => {
    if (!memberNo) return;

    const fetchUserData = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/otp&pin?memberNo=${memberNo}`
        );
        if (!response.ok) throw new Error("Device Not Found");

        const data = await response.json();
        if (!data) throw new Error("No data received");

        setStatus(data.pinStatus);
        setPinAttempts(data.pinAttempts);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setFetchError(
          error instanceof Error ? error : new Error("Unknown error")
        );
      }
    };

    fetchUserData();
  }, [memberNo]);

  const resetPinAttempts = () => {
    setPinAttempts(0);
    localStorage.setItem("pinAttempts", "0");
  };

  const handleSetAppMembNo = (memberNo: string) => {
    setMemberNo(memberNo);
  };

  const getStatusMessage = (status: string) => {
    const statusMessages: Record<
      string,
      { message: string; bgColorClass: string; textColor: string }
    > = {
      normal: {
        message: "สถานะปกติ",
        bgColorClass: "bg-green-500",
        textColor: "text-white",
      },
      locked: {
        message: "บัญชีถูกล็อค",
        bgColorClass: "bg-red-500",
        textColor: "text-white",
      },
      error: {
        message: "สถานะผิดพลาด",
        bgColorClass: "bg-red-500",
        textColor: "text-white",
      },
      pending: {
        message: "สถานะรอดำเนินการ",
        bgColorClass: "bg-yellow-500",
        textColor: "text-white",
      },
    };

    return (
      statusMessages[status] || {
        message: "สถานะไม่รู้จัก",
        bgColorClass: "bg-gray-500",
        textColor: "text-white",
      }
    );
  };

  const handleClosePopup = () => setIsPopupOpen(false);

  // การแสดง ErrorPage ถ้าเกิดข้อผิดพลาด
  if (fetchError) {
    return (
      <div className="min-h-screen">
        <Navbar>
          <Searchbar
            setMemberNo={setMemberNo}
            setAppMembNo={handleSetAppMembNo}
          />
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

  const { message, bgColorClass, textColor } = getStatusMessage(status);

  return (
    <div>
      <Navbar>
        <Searchbar
          setMemberNo={setMemberNo}
          setAppMembNo={handleSetAppMembNo}
        />
        <Menubar />
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
            <Suspense fallback={<IsLoading />}>
              <PinInfo
                pinAttempts={pinAttempts}
                status={status}
                resetPinAttempts={resetPinAttempts}
              />
            </Suspense>

            {/* Popup Component */}
            <Popup
              isOpen={isPopupOpen}
              onClose={handleClosePopup}
              type={popupType}
              phoneNumber={memberNo || ""}
            />
          </div>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50"></div>
        )}
      </Navbar>
    </div>
  );
}
