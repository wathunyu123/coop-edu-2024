"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Thai from "@/dictionary/thai";
import Popup from "@/components/popup";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { LuSmartphoneCharging } from "react-icons/lu";
import { RxLapTimer } from "react-icons/rx";
import { IoIosDocument } from "react-icons/io";
import { GiVibratingSmartphone } from "react-icons/gi";
import Navbar from "@/components/Navbar";
import { IoHome, IoNotifications, IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Searchbar from "@/components/searchbar";

// กำหนดประเภทของ PopupType
type PopupType =
  | "editStatus"
  | "otp"
  | "timer"
  | "document"
  | "Device lock"
  | "Account lock"
  | "Forgot your password"
  | "displaymonitor"
  | "sms";

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
  name: string; // Add this line
}

export default function Unlock() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const pathname = usePathname();

  const isActive = (linkPath: string) => pathname === linkPath;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>("editStatus");

  const [memberNo, setMemberNo] = useState<string | null>(null);

  useEffect(() => {
    setMemberNo(localStorage.getItem("memberNo"));
  }, []);

  // ปรับประเภทให้เป็น PopupType แทน string
  const handleBoxClick = (type: PopupType) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div
      className={`transition-container ${isFadingOut ? "fade-out" : "fade-in"}`}
    >
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />{" "}
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
            <div className="flex flex-wrap justify-between items-center w-full h-auto bg-gray-300 p-6 my-10 mx-auto rounded-3xl">
              {/* Device is locked */}
              <div className="w-full lg:w-64 h-80 p-3 m-2 bg-white">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">{Thai.Device_is_lock}</h1>
                  <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-sky-500 rounded-xl">
                    {Thai.Notify_status}
                  </p>
                  <button
                    className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
                    onClick={() => handleBoxClick("Device lock")}
                  >
                    Detail
                  </button>
                </div>
              </div>

              {/* Account is locked */}
              <div className="w-full lg:w-64 h-80 p-3 m-2 bg-white">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">{Thai.Account_is_lock}</h1>
                  <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-sky-500 rounded-xl">
                    {Thai.Notify_status}
                  </p>
                  <button
                    className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
                    onClick={() => handleBoxClick("Account lock")}
                  >
                    Detail
                  </button>
                </div>
              </div>

              {/* Forgot your password */}
              <div className="w-full lg:w-64 h-80 p-3 m-2 bg-white">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">
                    {Thai.Forgot_your_password}
                  </h1>
                  <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-sky-500 rounded-xl">
                    {Thai.Notify_status}
                  </p>
                  <button
                    className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
                    onClick={() => handleBoxClick("Forgot your password")}
                  >
                    Detail
                  </button>
                </div>
              </div>
            </div>

            {/* Popup Rendering */}
            {isPopupOpen && (
              <Popup
                isOpen={isPopupOpen}
                type={popupType}
                onClose={handleClosePopup}
                name={memberNo || ""}
              />
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}
