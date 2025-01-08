import Thai from "@/dictionary/thai";
import { useState } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  const [isOpen, setIsOpen] = useState(true); // ใช้ state ในการเปิดหรือปิด popup

  // ฟังก์ชันปิด Popup
  const closePopup = () => {
    setIsOpen(false);
    reset(); // รีเซ็ตข้อผิดพลาด
  };

  if (!isOpen) {
    return null; // ถ้าปิดแล้วไม่ให้แสดง
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-red-600">{Thai.Notfound}</h2>
        <p className="text-gray-700 mt-4">{error.message}</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={closePopup}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            {Thai.Back}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
