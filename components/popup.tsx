import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import Thai from "@/dictionary/thai";
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  type:
    | "otp"
    | "pin"
    | "editStatus"
    | "transaction"
    | "Forgot your password"
    | "Device lock"
    | "Account lock"
    | "unlockdevice"
    | "unlockaccount";
  status: string;
  phoneNumber: string;
  deviceStatus: string;
  accountStatus: string;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  type,
  status,

  phoneNumber,
}) => {
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

  if (!isOpen) return null;

  const [countdown, setCountdown] = useState<number>(180);
  const [countdownActive, setCountdownActive] = useState<boolean>(false);
  const [otp, setOtp] = useState<string | null>(null);
  const memberNo = localStorage.getItem("memberNo") || "ไม่พบรหัสสมาชิก";
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [forgotpasswordData, setForgotpasswordData] = useState<any | null>(
    null
  );

  const fetchForgotPasswordData = async (method: "sms" | "screen") => {
    setIsLoading(true);
    const memberNo = localStorage.getItem("memberNo");

    if (!memberNo) {
      setIsError("ไม่พบรหัสสมาชิก");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberNo: memberNo,
          preferredMethod: method,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "success") {
        setForgotpasswordData(data);
        setIsError(null);
      } else {
        setIsError("ไม่สามารถขอรหัสผ่านใหม่ได้");
      }
    } catch (err) {
      setIsError("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Forgot Password Data:", forgotpasswordData);
  }, [forgotpasswordData]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    if (countdownActive && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdownActive(false);
    }

    return () => clearInterval(countdownInterval);
  }, [countdown, countdownActive]);

  const handleActionClick = () => {
    setOtp(memberNo);
    setCountdown(180);
    setCountdownActive(true);
    setButtonDisabled(true);
  };

  const handleForgotPasswordClick = (method: "sms" | "screen") => {
    setIsLoading(true);
    fetchForgotPasswordData(method);
  };

  const renderContent = () => {
    console.log(
      "Rendering Content... forgotpasswordData: ",
      forgotpasswordData
    );
    switch (type) {
      case "otp":
        return (
          <div className="flex flex-col items-center w-full h-full">
            <h2 className="text-lg font-semibold text-black bg-gradient-to-r from-white to-blue-100 p-4 rounded-lg w-full text-center shadow-md">
              ขอ OTP
            </h2>
            {otp ? (
              <p className="mt-4 text-xl font-bold text-center">
                OTP ของคุณคือ: <strong>{otp}</strong>
              </p>
            ) : (
              <p className="mt-4 text-lg text-center text-gray-500">
                กรุณากดปุ่ม "Action" เพื่อขอ OTP
              </p>
            )}
            {countdown > 0 ? (
              <p className="mt-4 text-lg font-semibold text-white">
                เวลาเหลือ: {Math.floor(countdown / 60)}:
                {(countdown % 60).toString().padStart(2, "0")}
              </p>
            ) : (
              <p className="mt-4 text-lg font-semibold text-red-600">
                OTP หมดอายุแล้ว
              </p>
            )}
          </div>
        );
      case "Forgot your password":
        return (
          <div className="flex flex-col items-center w-full h-full gap-4">
            <div className="w-full flex justify-end">
              <svg
                fill="#ffffff"
                viewBox="0 0 32 32"
                version="1.1"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                onClick={(e) => {
                  e.stopPropagation(); // หยุดการ propagation ของการคลิก
                  onClose(); // เรียกฟังก์ชันปิด popup
                }}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>cancel</title>
                  <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path>
                </g>
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-black bg-gradient-to-r from-white to-blue-100 p-4 rounded-lg w-full text-center shadow-md">
              ลืมรหัสผ่าน
            </h2>
            {isLoading ? (
              <p className="mt-4 text-lg text-center text-gray-500">
                กำลังโหลดข้อมูล...
              </p>
            ) : isError ? (
              <p className="mt-4 text-lg text-center text-red-600">{isError}</p>
            ) : (
              <div>
                {forgotpasswordData ? (
                  <p className="mt-4 text-lg text-center text-white">
                    {forgotpasswordData.message}
                  </p>
                ) : (
                  <p className="mt-4 text-lg text-center text-gray-500">
                    กรุณากดปุ่มเพื่อขอรหัสผ่านใหม่
                  </p>
                )}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderContentOtp_Pin = () => {
    switch (type) {
      case "transaction":
        return (
          <div className="flex flex-col items-center w-full h-auto gap-4">
            <div className="w-full flex justify-end">
              <svg
                fill="#ffffff"
                viewBox="0 0 32 32"
                version="1.1"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>cancel</title>
                  <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path>
                </g>
              </svg>
            </div>
            <h2 className="ttext-lg font-semibold text-black bg-gradient-to-r from-white to-blue-100 p-4 rounded-lg w-full text-center shadow-md">
              {Thai.Status}
            </h2>

            <p
              className={`flex justify-center py-2 px-3 h-10 w-full drop-shadow-lg my-5 rounded-xl ${bgColorClass} ${textColor}`}
            >
              {message}
            </p>
          </div>
        );
    }
  };

  const renderUnlock = () => {
    switch (type) {
      case "unlockdevice":
        const unlockDeviceMessage =
          status === "normal" ? "สถานะปกติ" : "อุปกรณ์ถูกล็อค";
        const unlockDeviceBgColor =
          status === "normal" ? "bg-green-500" : "bg-red-500";
        const unlockDeviceTextColor = "text-white";

        return (
          <div className="flex flex-col items-center w-full h-auto gap-4">
            <div className="w-full flex justify-end">
              <svg
                fill="#ffffff"
                viewBox="0 0 32 32"
                version="1.1"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>cancel</title>
                  <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path>
                </g>
              </svg>
            </div>
            <h2 className="ttext-lg font-semibold text-black bg-gradient-to-r from-white to-blue-100 p-4 rounded-lg w-full text-center shadow-md">
              {Thai.Device_Status}
            </h2>

            <p
              className={`flex justify-center py-2 px-3 h-10 w-full drop-shadow-lg my-5 rounded-xl ${unlockDeviceBgColor} ${unlockDeviceTextColor}`}
            >
              {unlockDeviceMessage}
            </p>
          </div>
        );

      case "unlockaccount":
        const unlockAccountMessage =
          status === "normal" ? "สถานะปกติ" : "บัญชีถูกล็อค";
        const unlockAccountBgColor =
          status === "normal" ? "bg-green-500" : "bg-red-500";
        const unlockAccountTextColor = "text-white";

        return (
          <div className="flex flex-col items-center w-full h-auto gap-4">
            <div className="w-full flex justify-end">
              <svg
                fill="#ffffff"
                viewBox="0 0 32 32"
                version="1.1"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>cancel</title>
                  <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path>
                </g>
              </svg>
            </div>
            <h2 className="ttext-lg font-semibold text-black bg-gradient-to-r from-white to-blue-100 p-4 rounded-lg w-full text-center shadow-md">
              {Thai.Account_status}
            </h2>

            <p
              className={`flex justify-center py-2 px-3 h-10 w-full drop-shadow-lg my-5 rounded-xl ${unlockAccountBgColor} ${unlockAccountTextColor}`}
            >
              {unlockAccountMessage}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="bg-gradient-to-r bg-gray-900 to-gray-700 text-white shadow-xl rounded-lg w-[380px] max-w-md p-6 transform transition-all ease-out duration-500"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        {renderContent()}
        {renderContentOtp_Pin()}
        {renderUnlock()}

        {!countdownActive && (
          <div className="flex w-full justify-between mt-6">
            {type === "otp" && (
              <>
                <button
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                  onClick={handleActionClick}
                >
                  Action
                </button>
              </>
            )}
            {type === "Forgot your password" && (
              <>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleForgotPasswordClick("screen")}
                >
                  {Thai.Displaymonitor}
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleForgotPasswordClick("sms")}
                >
                  {Thai.Sms}
                </button>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
};

export default Popup;
