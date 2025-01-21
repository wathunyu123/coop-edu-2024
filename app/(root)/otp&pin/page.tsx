"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import Popup from "@/components/popup";
import IsLoading from "@/components/isloading";
import ErrorPage from "@/components/404popup";
import PinInfo from "@/components/pininfo";
import { usePathname } from "next/navigation";
import React from "react";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  type:
    | "editStatus"
    | "otp"
    | "pin"
    | "timer"
    | "document"
    | "Device lock"
    | "Account lock"
    | "Forgot your password"
    | "displaymonitor"
    | "sms";
  phoneNumber: string;
  name?: string;
};

export default function OtpPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [status, setStatus] = useState<string>("normal");
  const [pinAttempts, setPinAttempts] = useState<number>(0);
  const [memberNo, setMemberNo] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"otp" | "pin" | "editStatus">(
    "otp"
  );

  // Handle memberNo from localStorage
  useEffect(() => {
    const savedMemberNo = localStorage.getItem("memberNo");
    if (savedMemberNo) {
      setMemberNo(savedMemberNo);
    }
  }, []);

  // Fetch user data when memberNo is set
  useEffect(() => {
    if (memberNo) return;

    const fetchUserData = async () => {
      setLoading(true); // เริ่มการโหลด
      setFetchError(null);

      try {
        const response = await fetch(`/api/otp&pin?id=${memberNo}`);
        if (!response.ok) throw new Error("Device Not Found");

        const data = await response.json();
        if (!data) throw new Error("No data received");

        setStatus(data.pinStatus);
        setPinAttempts(data.pinAttempts);

        // เพิ่มการหน่วงเวลา (delay) ก่อนที่จะปิดสถานะการโหลด
        setTimeout(() => {
          setLoading(false);
        }, 1000); // หน่วงเวลา 1 วินาที
      } catch (error) {
        setFetchError(
          error instanceof Error ? error : new Error("Unknown error")
        );
      }
    };

    fetchUserData();
  }, [memberNo]);

  // Reset pin attempts and store in localStorage
  const resetPinAttempts = () => {
    setPinAttempts(0);
    localStorage.setItem("pinAttempts", "0");
  };

  // Determine status message and style
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

  // Handle popup close
  const handleClosePopup = () => setIsPopupOpen(false);

  // Error handling
  if (fetchError) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  // Get status and style
  const { message, bgColorClass, textColor } = getStatusMessage(status);

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />
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

        {/* Backdrop (Blurred background) */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50"></div>
        )}
      </Navbar>
    </div>
  );
}
