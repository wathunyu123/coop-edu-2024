import { motion } from "framer-motion";
import React, { useEffect } from "react";
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
    | "Unlock"
    | "displaymonitor"
    | "sms";
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderContent = () => {
    switch (type) {
      case "editStatus":
        return (
          <p className="flex items-center justify-center h-full w-full">
            ฟอร์มแก้ไขสถานะกำลังโหลด...
          </p>
        );
      case "otp":
        return (
          <p className="flex items-center justify-center h-full w-full">
            กรุณากรอก OTP ที่ส่งไปยังหมายเลขโทรศัพท์
          </p>
        );
      case "pin":
        return (
          <p className="flex items-center justify-center h-full w-full">
            กรุณากรอก OTP ที่ส่งไปยังหมายเลขโทรศัพท์
          </p>
        );
      case "timer":
        return (
          <p className="flex items-center justify-center h-full w-full">
            กำลังดำเนินการ
          </p>
        );
      case "document":
        return <p>กำลังเปิดดูเอกสาร...</p>;
      case "Unlock":
        return <p>ปลดล็อคอุปกรณ์</p>;
      case "displaymonitor":
        return <p>แสดงรหัสผ่านบนหน้าจอ</p>;
      case "sms":
        return <p>ส่งรหัสผ่านไปยัง SMS</p>;
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
        className="bg-white flex flex-col drop-shadow-2xl items-center rounded-lg p-6 shadow-lg w-[30%] h-[40%]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4 p-4 bg-cyan-700 text-white rounded-xl">
          สถานะการใช้งานธุรกรรม
        </h2>
        {renderContent()}
        <div className="flex w-full justify-end">
          <button
            className="text-red-700 outline outline-red-700 px-4 py-2 rounded-xl mx-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-xl :shadow-xl"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="text-white font-semibold bg-red-700 px-4 py-2 rounded-xl mx-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-xl :shadow-xl"
            onClick={onClose}
          >
            Action
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default Popup;
