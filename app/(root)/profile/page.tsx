// pages/profile.tsx
"use client";
import { useState, useEffect } from "react";
import { IoNotifications, IoSearchSharp, IoHome } from "react-icons/io5";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Popup from "@/components/popup";

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";

export default function ProfilePage() {
  const { memberNo, setMemberNo, name, setName, phoneNumber, setPhoneNumber } =
    useUserContext();
  const [idNumber, setIdNumber] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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
  const [isFadingOut, setIsFadingOut] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  useEffect(() => {
    setMemberNo(localStorage.getItem("memberNo") || "");
    setName(localStorage.getItem("name") || "");
    setPhoneNumber(localStorage.getItem("phoneNumber") || "");
    setIdNumber(localStorage.getItem("idNumber"));
    setProfileImage(localStorage.getItem("profileImage"));
  }, [setMemberNo, setName, setPhoneNumber]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePageChange = (url: string) => {
    setIsFadingOut(true);
    setTimeout(() => {
      window.location.href = url;
    }, 1000); // Duration of the fade-out animation
  };

  return (
    <div
      className={`transition-container ${isFadingOut ? "fade-out" : "fade-in"}`}
    >
      <Navbar>
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="flex flex-col col-start-2 col-span-11 min-h-screen">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-full rounded-xl flex justify-between items-center px-2 py-2 ">
                    <input
                      type="text"
                      value={memberNo || ""}
                      onChange={(e) => setMemberNo(e.target.value)}
                      placeholder="รหัสสมาชิก"
                      className="w-full outline-none bg-gray-200 px-6"
                    />
                    <IoSearchSharp />
                  </div>

                  <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl mt-4 md:mt-0 ">
                    <Link
                      href="/"
                      className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange("/");
                      }}
                    >
                      <IoHome />
                    </Link>
                    <Link
                      href="/profile"
                      className={`w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center ${
                        isActive("/profile") ? "bg-cyan-700 text-white" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange("/profile");
                      }}
                    >
                      <FaUserCircle />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row min-w-full min-h-1/2 bg-gray-200 my-10 rounded-3xl p-6 items-center justify-between slide-in">
                <div className="flex w-full items-center justify-center">
                  <div className="w-[200px] h-full p-6">
                    <Image
                      src={profileImage || "/default-profile.png"}
                      alt="Profile Image"
                      className="bg-white w-full h-[200px] p-2 rounded-lg"
                      width={200}
                      height={200}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full bg-white p-6 rounded-lg divide-y divide-gray-300">
                  <div className="flex justify-between py-4">
                    <span className="text-gray-500 font-medium">
                      ชื่อ - นามสกุล:
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {name || "ไม่ระบุ"}
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
      </Navbar>
    </div>
  );
}
