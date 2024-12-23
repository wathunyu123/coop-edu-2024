"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Thai from "@/dictionary/thai";
import Popup from "@/components/popup";
import { IoNotifications, IoSearchSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OtpPage() {
  const pathname = usePathname();
  const isActive = (linkPath: string) => pathname === linkPath;

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
    <div>
      <div className="grid grid-cols-12 gap-4 min-h-screen">
        <div className="col-start-1 col-span-3">
          <Navbar />
        </div>

        <div className="text-center col-start-4 col-span-8 py-8">
          <div className="flex justify-between">
            <div className="bg-white min-h-8 w-3/4 rounded-xl lg:flex justify-between items-center px-5">
              <input
                type="text"
                value={memberNo || ""}
                onChange={(e) => setMemberNo(e.target.value)}
                placeholder="รหัสสมาชิก"
                className="w-full outline-none"
              />
              <IoSearchSharp />
            </div>

            <div className="bg-white lg:min-h-8 lg:min-w-32 rounded-xl lg:flex justify-between items-center py-2 px-2 text-2xl">
              <Link
                href="/"
                className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
              >
                <IoNotifications />
              </Link>
              <Link
                href="/profile"
                className={`flex justify-center w-1/2 rounded-lg ${
                  isActive("/profile")
                    ? "bg-cyan-700 text-white"
                    : "hover:bg-cyan-700 hover:text-white"
                } rounded-lg`}
              >
                <FaUserCircle />
              </Link>
            </div>
          </div>

          <div className="flex justify-between items-center min-w-full h-[50%] bg-sky-400 p-6 my-10 mx-auto rounded-3xl">
            <div className="w-64 h-80 p-3 m-2 bg-white ">
              <div className="flex flex-col items-center">
                <h1 className="text-lg py-6 my-5">{Thai.Status}</h1>
                <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-blue-500">
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
            <div className="w-64 h-80 p-3 m-2 bg-white ">
              <div className="flex flex-col items-center">
                <h1 className="text-lg py-6 my-5">{Thai.request_otp}</h1>
                <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-blue-500">
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
            <div className="w-64 h-80 p-3 m-2 bg-white ">
              <div className="flex flex-col items-center">
                <h1 className="text-lg py-6 my-5">{Thai.Entered_wrong_PIN}</h1>
                <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-blue-500">
                  {Thai.Notify_status}
                </p>
                <button
                  className="text-white flex items-end jutify-end py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
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
    </div>
  );
}
