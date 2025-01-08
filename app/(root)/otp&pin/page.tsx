"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Thai from "@/dictionary/thai";
import Popup from "@/components/popup";
import { IoHome, IoNotifications, IoSearchSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Searchbar from "@/components/searchbar";

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
  const isActive = (linkPath: string) => pathname === linkPath;
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<
    | "editStatus"
    | "otp"
    | "pin"
    | "timer"
    | "document"
    | "Device lock"
    | "Account lock"
    | "Forgot your password"
    | "displaymonitor"
    | "sms"
  >("otp");

  const [otp, setOtp] = useState<string | null>(null); // State สำหรับ OTP
  const [countdown, setCountdown] = useState<number>(60); // นับถอยหลัง
  const [countdownActive, setCountdownActive] = useState(true); // ควบคุมสถานะนับถอยหลัง

  const handleBoxClick = (
    type: "editStatus" | "otp" | "pin" | "timer" | "document"
  ) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOtpReceive = (receivedOtp: string) => {
    setOtp(receivedOtp);
    setCountdown(180); // ตั้งเวลา 180 วินาที
    setCountdownActive(true); // เริ่มนับถอยหลัง
  };

  const [memberNo, setMemberNo] = useState<string | null>(null);

  useEffect(() => {
    setMemberNo(localStorage.getItem("memberNo"));
  }, []);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (countdownActive && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdownActive(false); // หยุดนับถอยหลังเมื่อถึง 0
    }

    return () => clearInterval(countdownInterval);
  }, [countdown, countdownActive]);

  return (
    <div
      className={`transition-container ${isFadingOut ? "fade-out" : "fade-in"}`}
    >
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />{" "}
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          {/* search */}
          <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
            <div className="flex flex-wrap justify-between items-center w-full h-auto bg-gray-300 p-6 my-10 mx-auto rounded-3xl">
              <div className="w-full md:w-64 h-80 p-3 m-2 bg-white ">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">{Thai.Status}</h1>
                  <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-sky-500 rounded-xl">
                    {Thai.Notify_status}
                  </p>
                  <button
                    className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
                    onClick={() => handleBoxClick("editStatus")}
                    aria-label="Click to view edit status details"
                  >
                    Detail
                  </button>
                </div>
              </div>

              {/* OTP Request */}
              <div className="w-full md:w-64 h-80 p-3 m-2 bg-white ">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">{Thai.request_otp}</h1>
                  <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-sky-500 rounded-xl">
                    {Thai.Notify_status}
                  </p>
                  <button
                    className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
                    onClick={() => handleBoxClick("otp")}
                  >
                    Detail
                  </button>
                </div>
              </div>

              {/* OTP Wrong PIN */}
              <div className="w-full md:w-64 h-80 p-3 m-2 bg-white ">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">
                    {Thai.Entered_wrong_PIN}
                  </h1>
                  <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-sky-500 rounded-xl">
                    {Thai.Notify_status}
                  </p>
                  <button
                    className="text-white flex items-end justify-end py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
                    onClick={() => handleBoxClick("pin")}
                  >
                    Detail
                  </button>
                </div>
              </div>
            </div>

            {/* Popup Component */}
            <Popup
              isOpen={isPopupOpen}
              onClose={handleClosePopup}
              type={popupType}
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
