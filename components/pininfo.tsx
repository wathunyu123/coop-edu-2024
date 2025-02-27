import Thai from "@/dictionary/thai";
import React, { useState } from "react";
import Popup from "@/components/popup"; // ตรวจสอบว่า Popup ถูก import เข้ามา

type PinInfoProps = {
  pinAttempts: number;
  status: string;
  resetPinAttempts: () => void;
};

const PinInfo: React.FC<PinInfoProps> = ({
  pinAttempts,
  status,
  resetPinAttempts,
}) => {
  let message = "";
  let bgColorClass = "";
  let textColor = "";

  // กำหนดข้อความและสีตามสถานะ
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"otp" | "pin" | "editStatus">(
    "otp"
  );

  const handleBoxClick = (type: "otp" | "pin" | "editStatus") => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-wrap justify-between items-center w-full h-auto p-6 my-10 mx-auto rounded-3xl">
      <div className="flex flex-wrap justify-between items-center w-full  h-auto bg-gray-200 p-6 my-10 mx-auto shadow-xl rounded-3xl">
        {/*   <!-- Card 1: Status --> */}
        <div className="w-full md:w-64 h-80 p-6 m-2 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.Status}
            </h1>
            <p
              className={`flex justify-center py-2 px-3 h-10 w-full drop-shadow-lg my-5 rounded-xl ${bgColorClass} ${textColor}`}
            >
              {message}
            </p>
          </div>
        </div>

        {/*   <!-- Card 2: OTP Request --> */}
        <div className="w-full md:w-64 h-80 p-6 m-2 bg-white rounded-xl  shadow-xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.request_otp}
            </h1>
            <p
              className={`flex justify-center py-2 px-3 h-10 w-full drop-shadow-lg my-5 rounded-xl ${bgColorClass} ${textColor}`}
            >
              {message}
            </p>
            <button
              className="text-white py-2 px-4 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl transition-all transform hover:scale-105"
              onClick={() => handleBoxClick("otp")}
            >
              {Thai.Detail}
            </button>
          </div>
        </div>

        {/*   <!-- Card 3: PIN Attempts --> */}
        <div className="w-full md:w-64 h-80 p-6 m-2 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.Entered_wrong_PIN}
            </h1>
            <p className="py-2 mt-4 text-xl text-gray-600">
              จำนวนที่ใส่ PIN ผิด: {pinAttempts} ครั้ง
            </p>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          type={popupType}
          phoneNumber="" // ส่งหมายเลขโทรศัพท์หรือตามที่ต้องการ
        />
      )}
    </div>
  );
};

export default PinInfo;
