"use client";
import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Thai from "@/dictionary/thai";
import Popup from "@/components/popup";
import { usePathname } from "next/navigation";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import ErrorPage from "@/components/404popup";
import IsLoading from "@/components/isloading";
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
  const PinInfo = React.lazy(() => import("@/components/pininfo"));
  const pathname = usePathname();
  const isActive = (linkPath: string) => pathname === linkPath;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const [status, setStatus] = useState<string>("normal"); // สถานะสมาชิก
  const [pinAttempts, setPinAttempts] = useState<number>(0); // จำนวนครั้งที่ใส่ PIN ผิด
  const [memberNo, setMemberNo] = useState<string | null>(null); // หมายเลขสมาชิก

  useEffect(() => {
    const savedMemberNo = localStorage.getItem("memberNo");
    if (savedMemberNo) {
      setMemberNo(savedMemberNo); // ดึงหมายเลขสมาชิกจาก localStorage
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setFetchError(null);
      if (memberNo) {
        try {
          const response = await fetch(`/api/otp&pin?id=${memberNo}`);
          if (!response.ok) {
            throw new Error("Device Not Found");
          }

          const data = await response.json();

          if (!data) {
            throw new Error("No data received");
          }

          setStatus(data.pinStatus);
          setPinAttempts(data.pinAttempts);
        } catch (error) {
          setFetchError(
            error instanceof Error ? error : new Error("Unknown error")
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [memberNo]);

  const resetPinAttempts = () => {
    setPinAttempts(0);
    localStorage.setItem("pinAttempts", "0");
  };

  const getStatusMessage = (status: string) => {
    let message = "";
    let bgColorClass = "";
    let textColor = "";

    if (status === "normal") {
      message = "สถานะปกติ";
      bgColorClass = "bg-green-500";
      textColor = "text-white";
    } else if (status === "locked") {
      message = "บัญชีถูกล็อค";
      bgColorClass = "bg-red-500";
      textColor = "text-white";
    } else if (status === "error") {
      message = "สถานะผิดพลาด";
      bgColorClass = "bg-red-500";
      textColor = "text-white";
    } else if (status === "pending") {
      message = "สถานะรอดำเนินการ";
      bgColorClass = "bg-yellow-500";
      textColor = "text-white";
    } else {
      message = "สถานะไม่รู้จัก";
      bgColorClass = "bg-gray-500";
      textColor = "text-white";
    }

    return { message, bgColorClass, textColor };
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"otp" | "pin" | "editStatus">(
    "otp"
  );

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (fetchError instanceof Error) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  const { message, bgColorClass, textColor } = getStatusMessage(status);

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />
        <Menubar />
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
            <Suspense fallback={<IsLoading />}>
              {/* ส่ง props ที่จำเป็นให้กับ PinInfo */}
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
