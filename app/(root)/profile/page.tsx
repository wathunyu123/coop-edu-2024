// pages/profile.tsx
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import { IoNotifications, IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Popup from "@/components/popup";

export default function ProfilePage() {
  const [name, setName] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [memberNo, setMemberNo] = useState<string | null>(null);
  const [idNumber, setIdNumber] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<
    | "editStatus"
    | "otp"
    | "pin"
    | "timer"
    | "document"
    | "Device lock"
    | "Account lock"
    | "Forgot your password"
    | "displaymonitor"
    | "sms"
    | null
  >(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setLastname(localStorage.getItem("lastname"));
    setPhoneNumber(localStorage.getItem("phoneNumber"));
    setMemberNo(localStorage.getItem("memberNo"));
    setIdNumber(localStorage.getItem("idNumber"));
  }, []);

  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Navbar>
      <div className="grid grid-cols-12 gap-4 min-h-screen">
        <div className="flex flex-col col-start-2 col-span-11 min-h-screen">
          <div className="flex-1 ">
            <div className="text-center">
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-full rounded-xl flex justify-between items-center px-2 py-2">
                  <input
                    type="text"
                    value={memberNo || ""}
                    onChange={(e) => setMemberNo(e.target.value)}
                    placeholder="รหัสสมาชิก"
                    className="w-full outline-none bg-gray-200 px-6"
                  />
                  <IoSearchSharp />
                </div>

                <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl mt-4 md:mt-0">
                  <Link
                    href="/"
                    className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
                  >
                    <IoNotifications />
                  </Link>
                  <Link
                    href="/profile"
                    className={`w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center ${
                      isActive("/profile") ? "bg-cyan-700 text-white" : ""
                    }`}
                  >
                    <FaUserCircle />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col md:flex-row min-w-full min-h-1/2 bg-gray-200 my-10 rounded-3xl p-6 items-center justify-between">
                <div className="flex w-full items-center justify-center">
                  <div className="w-[200px] h-full p-6">
                    <Image
                      src=""
                      alt=""
                      className="bg-white w-full h-[200px] p-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full bg-white p-6 rounded-lg divide-y divide-gray-300">
                  <div className="flex justify-between py-4">
                    <span className="text-gray-500 font-medium">
                      ชื่อ - นามสกุล:
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {name || "ไม่ระบุ"} {lastname || "ไม่ระบุ"}
                    </span>
                  </div>

                  <div className="lg:flex justify-between py-4">
                    <span className="text-gray-500 font-medium">อีเมล:</span>
                    <span className="text-gray-800 font-semibold">
                      test@gmail.com
                    </span>
                  </div>

                  <div className="lg:flex justify-between py-4">
                    <span className="text-gray-500 font-medium">เบอร์โทร:</span>
                    <span className="text-gray-800 font-semibold">
                      {phoneNumber || "ไม่ระบุ"}
                    </span>
                  </div>

                  <div className="lg:flex justify-between py-4">
                    <span className="text-gray-500 font-medium">
                      รหัสสมาชิก:
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {memberNo || "ไม่ระบุ"}
                    </span>
                  </div>

                  <div className="lg:flex justify-between py-4">
                    <span className="text-gray-500 font-medium">
                      เลขบัตรประชาชน:
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {idNumber || "ไม่ระบุ"}
                    </span>
                  </div>

                  <div className="lg:flex justify-between py-4">
                    <span className="text-gray-500 font-medium">ที่อยู่:</span>
                    <span className="text-gray-800 font-semibold">...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popup Component */}
          <Popup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            type={popupType || "editStatus"}
          />

          {/* Backdrop (Blurred background) */}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50"></div>
          )}
        </div>
      </div>
    </Navbar>
  );
}
