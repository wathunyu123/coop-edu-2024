import Thai from "@/dictionary/thai";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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

  const [isloading, setIsLoading] = useState<boolean>(false);
  const [iserror, setIsError] = useState<string | null>(null);
  const [forgotpasswordData, setForgotpasswordData] = useState<any | null>(
    null
  );

  useEffect(() => {
    if (type === "Forgot your password") {
      const fetchForgotPasswordInfo = async () => {
        setIsLoading(true);

        try {
          const response = await fetch(
            `http://localhost:3000/api/unlock?memberNo=${memberNo}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();

          console.log(data); // ตรวจสอบข้อมูลที่ได้จาก API

          if (data.status.code === 0) {
            setForgotpasswordData(data.data.forgotPassword);
          } else {
            setIsError("ไม่สามารถดึงข้อมูลได้");
          }
        } catch (err) {
          setIsError("เกิดข้อผิดพลาดในการเชื่อมต่อ API ");
        } finally {
          setIsLoading(false);
        }
      };
      fetchForgotPasswordInfo();
    }
  }, [memberNo, type]);

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

  const handleForgotPasswordClick = async (method: string) => {
    console.log("คลิกที่ปุ่ม", method); // ตรวจสอบการคลิก
    try {
      const response = await fetch(
        `http://localhost:3000/api/unlock?memberNo=${memberNo}&deliveryMethod=${method}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data); // ตรวจสอบข้อมูลที่ได้จาก API

      if (data.status.code === 0) {
        if (method === "sms") {
          alert("รหัสผ่านใหม่ถูกส่งไปยังเบอร์โทรศัพท์ของคุณ");
        } else {
          alert("กรุณาตรวจสอบหน้าจอเพื่อดูรหัสใหม่");
        }
      } else {
        alert("ไม่สามารถขอรหัสผ่านใหม่ได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการขอรหัสผ่านใหม่", error);
      alert("เกิดข้อผิดพลาดในการขอรหัสผ่านใหม่");
    }
  };

  const renderContent = () => {
    console.log(forgotpasswordData); // ตรวจสอบค่า forgotpasswordData
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
            <p className="mt-4 text-lg text-center text-gray-500">
              {forgotpasswordData
                ? forgotpasswordData.message
                : "กำลังโหลดข้อมูล..."}
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
                  onClick={() => handleForgotPasswordClick("displaymonitor")}
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
