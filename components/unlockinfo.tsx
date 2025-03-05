import React, { useState } from "react";
import Thai from "@/dictionary/thai";
import Popup from "./popup";

type UnlockInfoProps = {
  memberNo: string;
  device: string;
  account: string;
};

const UnlockInfo: React.FC<UnlockInfoProps> = ({
  memberNo,
  device,
  account,
}) => {
  let deviceMessage = "";
  let deviceBgColor = "";
  let deviceTextColor = "";

  let accountMessage = "";
  let accountBgColor = "";
  let accountTextColor = "";

  if (device === "normal") {
    deviceMessage = "สถานะปกติ";
    deviceBgColor = "bg-green-500";
    deviceTextColor = "text-white";
  } else if (device === "locked") {
    deviceMessage = "อุปกรณ์ถูกล็อค";
    deviceBgColor = "bg-red-500";
    deviceTextColor = "text-white";
  } else if (device === "pending") {
    deviceMessage = "กำลังดำเนินการ";
    deviceBgColor = "bg-yellow-500";
    deviceTextColor = "text-white";
  } else {
    deviceMessage = "สถานะไม่รู้จัก";
    deviceBgColor = "bg-gray-500";
    deviceTextColor = "text-white";
  }

  if (account === "normal") {
    accountMessage = "สถานะปกติ";
    accountBgColor = "bg-green-500";
    accountTextColor = "text-white";
  } else if (account === "locked") {
    accountMessage = "บัญชีถูกล็อค";
    accountBgColor = "bg-red-500";
    accountTextColor = "text-white";
  } else if (account === "pending") {
    accountMessage = "สถานะรอดำเนินการ";
    accountBgColor = "bg-yellow-500";
    accountTextColor = "text-white";
  } else {
    accountMessage = "สถานะไม่รู้จัก";
    accountBgColor = "bg-gray-500";
    accountTextColor = "text-white";
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<
    | "Device lock"
    | "Account lock"
    | "Forgot your password"
    | "unlockdevice"
    | "unlockaccount"
  >("Forgot your password");

  const handleBoxClick = (
    type:
      | "Device lock"
      | "Account lock"
      | "Forgot your password"
      | "unlockdevice"
      | "unlockaccount"
  ) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-wrap justify-between items-center w-full h-auto p-2 my-10 mx-auto rounded-3xl">
      <div className="flex flex-wrap justify-between items-center w-full h-auto bg-gray-200 p-6 my-10 gap-4 mx-auto shadow-xl rounded-3xl">
        {/* Card 1 */}
        <div className="w-full md:w-64 h-80 p-3 md:p-6 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.Device_is_lock}
            </h1>
            <button
              className="text-white py-2 px-3 my-5 bg-sky-500 w-full hover:bg-sky-700 rounded-xl"
              onClick={() => handleBoxClick("unlockdevice")}
            >
              {Thai.Req_Status}
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-64 h-80 p-3 md:p-6 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.Account_is_lock}
            </h1>
            <button
              className="text-white py-2 px-3 my-5 bg-sky-500 w-full hover:bg-sky-700 rounded-xl"
              onClick={() => handleBoxClick("unlockaccount")}
            >
              {Thai.Req_Status}
            </button>
          </div>
        </div>
        {/* Card 3 */}
        <div
          className={`w-full md:w-64 h-80 p-3 md:p-6 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105 ${accountTextColor} ${accountBgColor}`}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.Forgot_your_password}
            </h1>

            <button
              className="text-white py-2 px-3 my-5 bg-sky-500 w-full hover:bg-sky-700 rounded-xl"
              onClick={() => handleBoxClick("Forgot your password")}
            >
              {Thai.Req_password}
            </button>
          </div>
        </div>

        {isPopupOpen && (
          <Popup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            type={popupType}
            deviceStatus={device}
            accountStatus={account}
            status={popupType === "unlockdevice" ? device : account} // ส่ง status ที่เหมาะสม
            phoneNumber={memberNo} // Add phoneNumber property
          />
        )}
      </div>
    </div>
  );
};

export default UnlockInfo;
