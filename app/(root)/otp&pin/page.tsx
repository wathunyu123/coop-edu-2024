"use client";

import { useState, useEffect } from "react";
import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Menu from "@/components/menu";
import Thai from "@/dictionary/thai";
import Popup from "@/components/popup";
import { TbEdit } from "react-icons/tb";
import { MdOutlineTextsms } from "react-icons/md";
import { RxLapTimer } from "react-icons/rx";
import { IoIosDocument } from "react-icons/io";

export default function OTP() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState<"editStatus" | "otp" | "timer" | "document">("editStatus");
    const [otp, setOtp] = useState<string | null>(null); // State สำหรับ OTP
    const [countdown, setCountdown] = useState<number>(0); // นับถอยหลัง
    const [countdownActive, setCountdownActive] = useState(false); // ควบคุมสถานะนับถอยหลัง

    const handleBoxClick = (type: "editStatus" | "otp" | "timer" | "document") => {
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
            setCountdownActive(false); // หยุดนับถอยหลังเมื่อถึง 0
        }

        return () => clearInterval(countdownInterval);
    }, [countdown, countdownActive]);



    return (
        <Container>
            <IDbox />
            <Menu />
            <Container className="flex flex-col items-start justify-start">
                <div className="bg-gray-200 w-full px-6 py-10 mt-5 rounded-2xl">
                   
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="flex flex-col w-auto max-w-xs bg-blue-400 px-16 py-1 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-2">{Thai.Status}</h1>
                            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                                {Thai.Notify_status}
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-between bg-blue-400 px-8 py-1 rounded-2xl cursor-pointer "
                            onClick={() => handleBoxClick("editStatus")}
                        >
                            <TbEdit size={40} className="text-white" />
                            <h1 className="text-white mt-2">{Thai.Edit_status}</h1>
                        </div>

                        <div className="flex gap-5">
                            <RxLapTimer size={50} className="text-black" onClick={() => handleBoxClick("timer")} />
                            <IoIosDocument size={50} className="text-black" onClick={() => handleBoxClick("document")} />
                        </div>
                    </div>

                    {/* แถวที่สอง */}
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="flex flex-col w-auto max-w-xs bg-blue-400 px-16 py-1 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-2">{Thai.request_otp}</h1>
                            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                                {Thai.Notify_status}
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-between bg-blue-400 px-8 py-1 rounded-2xl cursor-pointer "
                            onClick={() => handleBoxClick("otp")}
                        >
                            <MdOutlineTextsms size={40} className="text-white" />
                            <h1 className="text-white mt-2">{Thai.Otp}</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center -ml-32 space-y-4">
                            <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
                                onClick={() => handleOtpReceive("123456")} // จำลอง OTP ที่เข้ามา
                            >
                                รับ OTP
                            </button>

                            <div className="text-center space-y-2">
                                <p className="text-lg font-medium text-gray-700">
                                    OTP: {otp ? otp : "ยังไม่มี OTP"}
                                </p>
                                {countdownActive && (
                                    <p className="text-xl font-semibold text-red-600">
                                        เวลาที่เหลือ: {Math.floor(countdown / 60)}:
                                        {String(countdown % 60).padStart(2, "0")}
                                    </p>
                                )}
                            </div>
                        </div>



                        <div className="flex gap-5">
                            <RxLapTimer size={50} className="text-black" onClick={() => handleBoxClick("timer")} />
                            <IoIosDocument size={50} className="text-black" onClick={() => handleBoxClick("document")} />
                        </div>
                    </div>

                    {/* แถวที่สาม */}
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="flex flex-col w-auto max-w-xs bg-blue-400 px-16 py-1 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-2">{Thai.Entered_wrong_PIN}</h1>
                            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                                {Thai.Notify_status}
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <RxLapTimer size={50} className="text-black" onClick={() => handleBoxClick("timer")} />
                            <IoIosDocument size={50} className="text-black" onClick={() => handleBoxClick("document")} />
                        </div>
                    </div>
                </div>
            </Container>


            {/* Popup */}
            <Popup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                type={popupType}
            />
        </Container>
    );
}
