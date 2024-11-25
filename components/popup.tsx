"use client";

import React from "react";
import { createPortal } from "react-dom";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    type: "editStatus" | "otp" | "timer" | "document" | "Unlock" | "displaymonitor" | "sms";
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    // แสดงเนื้อหาตามประเภทของ Popup
    const renderContent = () => {
        switch (type) {
            case "editStatus":
                return <p>ฟอร์มแก้ไขสถานะกำลังโหลด...</p>;
            case "otp":
                return <p>กรุณากรอก OTP ที่ส่งไปยังหมายเลขโทรศัพท์</p>;
            case "timer":
                return <p>กำลังดำเนินการ</p>;
            case "document":
                return <p>กำลังเปิดดูเอกสาร...</p>;
            case "Unlock":
                return <p> ปลดลล็อคอุปกรณ์ </p>
            case "displaymonitor":
                return <p> แสดงรหัสผ่านบนหน้าจอ </p>
            case "sms":
                return <p>ส่งรหัสผ่านไปยัง SMS</p>
            default:
                return null;
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Popup</h2>
                {renderContent()}
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={onClose}
                >
                    ปิด
                </button>
            </div>
        </div>,
        document.body
    );
};

export default Popup;
