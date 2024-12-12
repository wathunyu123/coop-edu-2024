"use client";

import { useState } from "react";
import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Menu from "@/components/menu";
import Thai from "@/dictionary/thai";
import Popup from "@/components/popup";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { LuSmartphoneCharging } from "react-icons/lu";
import { RxLapTimer } from "react-icons/rx";
import { IoIosDocument } from "react-icons/io";
import { GiVibratingSmartphone } from "react-icons/gi";
import Navbar from "@/components/Navbar";

export default function Unlock() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<
    | "editStatus"
    | "otp"
    | "timer"
    | "document"
    | "Unlock"
    | "displaymonitor"
    | "sms"
  >("editStatus");

  const handleBoxClick = (
    type:
      | "editStatus"
      | "otp"
      | "timer"
      | "document"
      | "Unlock"
      | "displaymonitor"
      | "sms"
  ) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Container>
      <Navbar />
      {/*  <IDbox />
            <Menu /> */}
      {/*   <Container className="flex flex-col items-start justify-start">
                <div className="bg-gray-200 w-full px-6 py-10 mt-5 rounded-2xl">
                   
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="flex flex-col w-full max-w-xs bg-blue-400 px-16 py-1 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-2">{Thai.Device_is_lock}</h1>
                            <div className="bg-white px-4 py-2 rounded-lg shadow-md">{Thai.unlock}</div>
                        </div>

                        <h1 className="-ml-20">{<GiVibratingSmartphone size={50} />}</h1>
                        <div
                            className="flex max-w-full items-center justify-between bg-blue-400 px-8 py-1 rounded-2xl cursor-pointer -ml-52"
                            onClick={() => handleBoxClick("Unlock")}
                        >
                            <LuSmartphoneCharging size={40} className="text-white mr-2" />
                            <h1 className="text-white mt-2">{Thai.unlock}</h1>
                        </div>

                        <div className="flex gap-5">
                            <RxLapTimer size={50} className="text-black" onClick={() => handleBoxClick("timer")} />
                            <IoIosDocument size={50} className="text-black" onClick={() => handleBoxClick("document")} />
                        </div>
                    </div>

                  
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="flex flex-col w-full max-w-xs bg-blue-400 px-16 py-1 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-2">{Thai.Account_is_lock}</h1>
                            <div className="bg-white px-4 py-2 rounded-lg shadow-md">{Thai.unlock}</div>
                        </div>

                        <div
                            className="flex max-w-full items-center justify-between bg-blue-400 px-8 py-1 rounded-2xl cursor-pointer "
                            onClick={() => handleBoxClick("Unlock")}
                        >
                            <FaUnlockKeyhole size={40} className="text-white mr-2" />
                            <h1 className="text-white mt-2">{Thai.unlock}</h1>
                        </div>

                        <div className="flex gap-5">
                            <RxLapTimer size={50} className="text-black" onClick={() => handleBoxClick("timer")} />
                            <IoIosDocument size={50} className="text-black" />
                        </div>
                    </div>

                   
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="flex flex-col w-full max-w-xs bg-blue-400 px-16 py-1 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-2">{Thai.Forgot_your_password}</h1>
                            <div className="bg-white px-4 py-2 rounded-lg shadow-md">{Thai.Notify_status}</div>
                        </div>

                        <div
                            className="flex max-w-full items-center justify-between bg-blue-400 px-8 py-1 rounded-2xl cursor-pointer -ml-52"
                            onClick={() => handleBoxClick("displaymonitor")}
                        >
                            <LuSmartphoneCharging size={40} className="text-white mr-2" />
                            <h1 className="text-white mt-2">{Thai.Displaymonitor}</h1>
                        </div>

                        <div
                            className="flex max-w-full items-center justify-between bg-blue-400 px-8 py-1 rounded-2xl cursor-pointer -ml-52"
                            onClick={() => handleBoxClick("sms")}
                        >
                            <LuSmartphoneCharging size={40} className="text-white max-w-full" />
                            <h1 className="text-white mt-2">{Thai.Sms}</h1>
                        </div>

                        <div className="flex gap-5">
                            <RxLapTimer size={50} className="text-black" />
                            <IoIosDocument size={50} className="text-black" />
                        </div>
                    </div>
                </div>
            </Container>

           
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup} type={popupType} /> */}
    </Container>
  );
}
