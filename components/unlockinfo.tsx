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
    "Device lock" | "Account lock" | "Forgot your password"
  >("Forgot your password");

  const handleBoxClick = (
    type: "Device lock" | "Account lock" | "Forgot your password"
  ) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-wrap justify-between items-center w-full h-auto p-6 my-10 mx-auto rounded-3xl">
      <div className="flex flex-wrap justify-between items-center w-full  h-auto bg-gray-200 p-6 my-10 mx-auto shadow-xl rounded-3xl">
        {/* Card 1 */}
        <div className="w-full md:w-64 h-80 p-6 m-2 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.Device_is_lock}
            </h1>
            <p
              className={`flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 ${deviceTextColor} ${deviceBgColor} rounded-xl`}
            >
              {deviceMessage}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-64 h-80 p-6 m-2 bg-white rounded-xl  shadow-xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.Account_is_lock}
            </h1>
            <p
              className={`flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 ${accountTextColor} ${accountBgColor} rounded-xl`}
            >
              {accountMessage}
            </p>
          </div>
        </div>
        {/* Crad 3 */}
        <div className="w-full md:w-64 h-80 p-6 m-2 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 py-6 my-5">
              {Thai.Forgot_your_password}
            </h1>
            <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-sky-500 rounded-xl">
              {Thai.Notify_status}
            </p>
            <button
              className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
              onClick={() => handleBoxClick("Forgot your password")}
            >
              {Thai.Detail}
            </button>
          </div>
        </div>

        {isPopupOpen && (
          <Popup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            type={popupType}
            phoneNumber={memberNo}
          />
        )}
      </div>
    </div>
  );
};

export default UnlockInfo;
