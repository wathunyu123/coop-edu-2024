"use client";

import { useState, useEffect } from "react";
import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Menu from "@/components/menu";
import Thai from "@/dictionary/thai";
import { TbEdit } from "react-icons/tb";
import Popup from "@/components/popup";
import { RxLapTimer } from "react-icons/rx";
import { IoIosDocument } from "react-icons/io";
import { MdOutlineTextsms } from "react-icons/md";

export default function OTP() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState<"editStatus" | "otp" | "timer" | "document">("editStatus");

    const handleBoxClick = (type: "editStatus" | "otp" | "timer" | "document") => {
        setPopupType(type);  // กำหนดประเภท Popup ที่จะเปิด
        setIsPopupOpen(true); // เปิด Popup
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false); // ปิด Popup
    };

    return (
        <Container>
            <IDbox />
            <Menu />
            <Container className="flex flex-col items-start justify-start">
                <div className="bg-gray-200 w-full px-6 py-10 mt-5 rounded-2xl">
                    {/* แถวแรก */}
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
                            <h1 className="text-white text-lg mb-2">{Thai.Status}</h1>
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

                        <div className="flex gap-5">
                            <RxLapTimer size={50} className="text-black" onClick={() => handleBoxClick("timer")} />
                            <IoIosDocument size={50} className="text-black" onClick={() => handleBoxClick("document")} />
                        </div>
                    </div>

                    {/* แถวที่สาม */}
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="flex flex-col w-auto max-w-xs bg-blue-400 px-16 py-1 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-2">{Thai.Status}</h1>
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

            {/* ใช้ Popup */}
            <Popup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                type={popupType} // ส่งประเภท Popup
            />
        </Container>
    );
}
