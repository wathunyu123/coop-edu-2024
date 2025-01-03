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
  onSave: () => void; // Add this line
  name: string;
  phoneNumber: string;
}

export default function ProfilePage() {
  const pathname = usePathname();
  const { setName: setContextName, setPhoneNumber: setContextPhoneNumber } =
    useUserContext();

  const handlePageChange = (path: string) => {
    console.log(`Navigating to ${path}`);
    return null;
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // สถานะโหลดข้อมูล
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
  >("editStatus"); // Define popupType variable
  const [memberNo, setMemberNo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmailState] = useState<string>("");
  const [profileImage, setLocalProfileImage] = useState<string>("");

  // Handle fetching user data (mock API)
  const fetchData = async (memberNo: string) => {
    setLoading(true);
    setFetchError(null); // Reset previous error

    try {
      if (!memberNo) {
        setFetchError(new Error("Member number is required"));
        return;
      }

      const response = await fetch(
        `http://localhost:5000/dataUser/${memberNo}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      if (!data) {
        throw new Error("Received empty data");
      }

      setMemberNo(data.memberNo || "");
      setName(data.name || "");
      setPhoneNumber(data.phoneNumber || "");
      setIdNumber(data.idNumber || "");
      setLastname(data.lastname || "");
      setEmailState(data.email || "");
      setLocalProfileImage(data.profileImage || "");

      // Update context values
      setContextName(data.name);
      setContextPhoneNumber(data.phoneNumber);
    } catch (error) {
      if (error instanceof Error) {
        setFetchError(error);
      } else {
        setFetchError(new Error("Unknown error"));
      }
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // ปิดสถานะโหลด
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (memberNo) {
      fetchData(memberNo);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("Save button clicked");
  };

  return (
    <div>
      {fetchError && <div className="text-red-500">{fetchError.message}</div>}{" "}
      {/* แสดงข้อผิดพลาด */}
      {loading && <div>Loading...</div>} {/* แสดงสถานะกำลังโหลด */}
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
                      onChange={(e) => setMemberNo(e.target.value)} // เก็บ memberNo ที่ผู้ใช้กรอก
                      placeholder="รหัสสมาชิก"
                      className="w-full outline-none bg-gray-200 px-6"
                    />
                    <button
                      onClick={handleSearch} // เรียกฟังก์ชันเมื่อกดค้นหา
                      className="flex items-center justify-center"
                    >
                      <IoSearchSharp />
                    </button>
                  </div>

                  <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl mt-4 md:mt-0 btn-hover-effect">
                    <Link
                      href="/"
                      className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
                      onClick={(e) => {
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
                      className="bg-white w-full h-[200px] p-2 "
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
                      {email || "ไม่ระบุ"}
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
          onSave={handleSave}
          name={name}
          phoneNumber={phoneNumber}
        />

        {/* Backdrop (Blurred background) */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50"></div>
        )}
      </Navbar>
    </div>
  );
}
