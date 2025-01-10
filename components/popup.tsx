import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
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

  const [otp, setOtp] = useState<string | null>(null); // OTP state
  const [countdown, setCountdown] = useState<number>(180); // Countdown state
  const [countdownActive, setCountdownActive] = useState<boolean>(false); // Countdown active state

  // สร้าง OTP แบบสุ่ม
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // สุ่ม OTP 6 หลัก
  };

  // ฟังก์ชันที่เรียกเมื่อคลิกปุ่ม Action
  const handleActionClick = () => {
    const generatedOtp = generateOtp(); // สร้าง OTP
    setOtp(generatedOtp); // ตั้งค่า OTP ที่ถูกสร้าง
    setCountdown(180); // ตั้งเวลาเป็น 3 นาที
    setCountdownActive(true); // เริ่มการนับถอยหลัง
  };

  const memberNO = localStorage.getItem("memberNo") || "ไม่พบรหัสสมาชิก"; // เพิ่มการตรวจสอบ
  const [memberNo, setMemberNo] = useState<string | null>(memberNO); // สร้าง state สำหรับรหัสสมาชิก
  useEffect(() => {
    setMemberNo(memberNO); // ตั้งค่ารหัสสมาชิกจาก localStorage
  }, [memberNO]);

  // ฟังก์ชันที่จัดการการนับถอยหลัง
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    if (countdownActive && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1); // ลดเวลาถอยหลังทีละ 1 วินาที
      }, 1000);
    } else if (countdown === 0) {
      setCountdownActive(false); // หยุดนับถอยหลังเมื่อถึง 0
    }
    return () => clearInterval(countdownInterval); // เคลียร์ interval เมื่อคอมโพเนนต์ถูกลบ
  }, [countdown, countdownActive]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // แสดงเนื้อหาตามประเภทของ Popup
  const renderContent = () => {
    switch (type) {
      case "editStatus":
        return (
          <div className="flex flex-col w-full h-full items-center">
            <h2 className="text-lg text-center w-full font-semibold p-4 bg-cyan-700 text-white rounded-xl">
              สถานะการใช้งานธุรกรรม
            </h2>
            <p className="flex items-center justify-center h-full w-full">
              ฟอร์มแก้ไขสถานะกำลังโหลด...
            </p>
          </div>
        );
      case "otp":
        return (
          <div className="flex flex-col w-full h-full items-center">
            <h2 className="text-lg text-center w-full font-semibold p-4 bg-cyan-700 text-white rounded-xl">
              ขอ OTP
            </h2>
            {otp ? (
              <p className="text-center text-xl w-full justify-center outline flex items-center p-2 my-5 h-12 rounded-md ">
                OTP ของคุณคือ: <strong>{memberNo}</strong>
              </p>
            ) : (
              <p className="py-2 my-5 w-full flex items-center justify-center text-center outline rounded-md">
                กรุณากดปุ่ม "Action" เพื่อขอ OTP
              </p>
            )}
            {countdown > 0 ? (
              <p className="mt-4 text-center text-lg outline outline-slate-600 w-full p-2 rounded-md ">
                เวลาเหลือ: {Math.floor(countdown / 60)}:
                {(countdown % 60).toString().padStart(2, "0")}
              </p>
            ) : (
              <p className="mt-4 text-center text-lg text-green-500">
                OTP หมดอายุแล้ว
              </p>
            )}
          </div>
        );
      /* case "pin":
        return (
          <div className="flex flex-col w-full h-full items-center">
            <h2 className="text-lg text-center w-full font-semibold mb-4 p-4 bg-cyan-700 text-white rounded-xl">
              ใส่ PIN ผิดพลาด
            </h2>
            <input
              type="text"
              value="จำนวนที่ใส่ PIN ผิด 0 ครั้ง"
              readOnly
              className="border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800"
            />
          </div>
        ); */
      case "timer":
      case "document":
      case "Device lock":
      case "Account lock":
      case "displaymonitor":
      case "sms":
        return (
          <div className="flex flex-col w-full h-full items-center">
            <h2 className="text-lg text-center w-full font-semibold mb-4 p-4 bg-cyan-700 text-white rounded-xl">
              กำลังดำเนินการ
            </h2>
            <p className="flex items-center justify-center h-full w-full">
              กำลังดำเนินการ...
            </p>
          </div>
        );
      case "Forgot your password":
        return (
          <div className="flex flex-col w-full h-full items-center">
            <h2 className="text-lg text-center w-full font-semibold mb-4 p-4 bg-cyan-700 text-white rounded-xl">
              ลืมรหัสผ่าน
            </h2>
            <input
              type="text"
              value={"กรุณาตั้งรหัสผ่านใหม่"}
              readOnly
              className="border border-gray-300 my-6 rounded-md p-2 bg-gray-100 text-gray-800 text-center"
            />
            <button className="text-white bg-cyan-700 px-4 py-2 rounded-xl my-2">
              แสดงบนหน้าจอ
            </button>
            <button className="text-white bg-cyan-700 px-4 py-2 rounded-xl my-2">
              ส่งทาง SMS
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <motion.div
        className="bg-white flex flex-col drop-shadow-2xl items-center rounded-lg p-6 shadow-lg w-[350px] max-w-lg h-[400px] max-h-[80%] overflow-y-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        {/* เนื้อหาของ Modal */}
        {renderContent()}

        {/* ปุ่มปิดและปุ่ม Action */}
        {!countdownActive && (
          <div className="flex w-full justify-end mt-4">
            <button
              className="text-red-700 outline outline-red-700 px-4 py-2 h-full rounded-xl mx-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-xl"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="text-white font-semibold bg-red-700 px-4 py-2 rounded-xl mx-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-xl"
              onClick={handleActionClick} // เรียกฟังก์ชัน handleActionClick
            >
              Action
            </button>
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
};

export default Popup;
