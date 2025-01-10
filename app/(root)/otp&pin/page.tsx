"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Thai from "@/dictionary/thai";
import Popup from "@/components/popup";
import { IoHome, IoNotifications, IoSearchSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import { TbBackground } from "react-icons/tb";

type PopupProps = {
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
  phoneNumber: string;
  name?: string;
};

export default function OtpPage() {
  const pathname = usePathname();
  const isActive = (linkPath: string) => pathname === linkPath;
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [status, setStatus] = useState<string>("normal"); // สถานะสมาชิก
  const [pinAttempts, setPinAttempts] = useState<number>(0); // จำนวนครั้งที่ใส่ PIN ผิด
  const [memberNo, setMemberNo] = useState<string | null>(null); // หมายเลขสมาชิก

  useEffect(() => {
    const savedMemberNo = localStorage.getItem("memberNo");
    if (savedMemberNo) {
      setMemberNo(savedMemberNo); // ดึงหมายเลขสมาชิกจาก localStorage
    }
  }, []);

  // ฟังก์ชันดึงข้อมูลจาก API
  useEffect(() => {
    const fetchUserData = async () => {
      if (memberNo) {
        try {
          const response = await fetch(`/api/otp&pin?id=${memberNo}`); // ใช้ URL ของ API ที่คุณสร้าง
          const data = await response.json();

          if (response.ok) {
            setStatus(data.pinStatus); // แสดงสถานะ
            setPinAttempts(data.pinAttempts); // จำนวนการใส่ PIN ผิด
          } else {
            console.error("User not found or error fetching data.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [memberNo]);

  // ตัวแปรสำหรับเก็บข้อความที่จะโชว์
  const resetPinAttempts = () => {
    setPinAttempts(0);
    localStorage.setItem("pinAttempts", "0");
  };

  // เช็คสถานะ
  let message = "";
  let bgColorClass = "";
  let textColor = "";

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
  >("otp");

  const [otp, setOtp] = useState<string | null>(null); // State สำหรับ OTP
  const [countdown, setCountdown] = useState<number>(60); // นับถอยหลัง
  const [countdownActive, setCountdownActive] = useState(true); // ควบคุมสถานะนับถอยหลัง

  const handleBoxClick = (
    type: "editStatus" | "otp" | "pin" | "timer" | "document"
  ) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOtpReceive = (receivedOtp: string) => {
    setOtp(receivedOtp);
    setCountdown(180); // ตั้งเวลา 180 วินาที
    setCountdownActive(true); // เริ่มนับถอยหลัง
  };

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (countdownActive && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdownActive(false);
    }

    return () => clearInterval(countdownInterval);
  }, [countdown, countdownActive]);

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />
        <Menubar />
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
            <div className="flex flex-wrap justify-between items-center w-full h-auto bg-gray-300 p-6 my-10 mx-auto rounded-3xl">
              <div className="w-full md:w-64 h-80 p-3 m-2 bg-white rounded-xl shadow-xl">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">{Thai.Status}</h1>

                  {/* แสดงข้อความตามสถานะ */}
                  <p
                    className={`flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 rounded-xl ${bgColorClass} ${textColor}`}
                  >
                    {message}
                  </p>
                </div>
              </div>

              {/* OTP Request */}
              <div className="w-full md:w-64 h-80 p-3 m-2 bg-white rounded-xl shadow-xl ">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">{Thai.request_otp}</h1>
                  <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-sky-500 rounded-xl">
                    {Thai.Notify_status}
                  </p>
                  <button
                    className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl"
                    onClick={() => handleBoxClick("otp")}
                  >
                    {Thai.Detail}
                  </button>
                </div>
              </div>

              {/* OTP Wrong PIN */}
              <div className="w-full md:w-64 h-80 p-3 m-2 bg-white rounded-xl shadow-xl">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg py-6 my-5">
                    {Thai.Entered_wrong_PIN}
                  </h1>
                  <p className="py-2 mt-4">
                    จำนวนที่ใส่ PIN ผิด: {pinAttempts} ครั้ง
                  </p>
                  {/*  <button
                    className="py-2 px-3 mt-4 bg-blue-500 rounded-lg text-white"
                    onClick={() => {
                      setPinAttempts(pinAttempts + 1);
                      localStorage.setItem(
                        "pinAttempts",
                        (pinAttempts + 1).toString()
                      );
                    }}
                  >
                    ใส่ PIN ผิด
                  </button>

           
                  <button
                    className="py-2 px-3 mt-4 bg-green-500 rounded-lg text-white"
                    onClick={resetPinAttempts}
                  >
                    รีเซ็ตจำนวนครั้งที่ใส่ PIN ผิด
                  </button> */}
                </div>
              </div>
            </div>

            {/* Popup Component */}
            <Popup
              isOpen={isPopupOpen}
              onClose={handleClosePopup}
              type={popupType}
            />
          </div>
        </div>

        {/* Backdrop (Blurred background) */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50"></div>
        )}
      </Navbar>
    </div>
  );
}
