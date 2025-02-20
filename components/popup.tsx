import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import Thai from "@/dictionary/thai"; // Path to your translation dictionary

interface PopupProps {
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
  onSave?: () => void;
  name?: string;
  phoneNumber?: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, type }) => {
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

  // Fetch forgot password information from API
  const fetchForgotPasswordData = async (method: "sms" | "screen") => {
    setIsLoading(true); // Set loading state to true
    const memberNo = localStorage.getItem("memberNo");

    // ตรวจสอบว่ามี memberNo หรือไม่ ถ้าไม่แสดง error
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
      console.log("API Response:", data); // ดูข้อมูลที่ตอบกลับ

      if (data.status === "success") {
        setForgotpasswordData(data);
        setIsError(null); // รีเซ็ตข้อความ error
      } else {
        setIsError("ไม่สามารถขอรหัสผ่านใหม่ได้");
      }
    } catch (err) {
      setIsError("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false); // รีเซ็ตสถานะการโหลด
    }
  };

  useEffect(() => {
    console.log("Forgot Password Data:", forgotpasswordData); // เพิ่มการตรวจสอบข้อมูลหลังจากได้รับจาก API
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
    fetchForgotPasswordData(method); // เรียก API เมื่อผู้ใช้เลือกแล้ว
  };

  const renderContent = () => {
    console.log(
      "Rendering Content... forgotpasswordData: ",
      forgotpasswordData
    ); // ตรวจสอบค่าของ forgotpasswordData ก่อนการแสดงผล
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
          <div className="flex flex-col items-center w-full h-full">
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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={(e) =>
        e.target === e.currentTarget && !countdownActive && onClose()
      }
    >
      <motion.div
        className="bg-gradient-to-r bg-gray-900 to-gray-700 text-white shadow-xl rounded-lg w-[380px] max-w-md p-6 transform transition-all ease-out duration-500"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        {renderContent()}

        {/* ปุ่มต่างๆ */}
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
