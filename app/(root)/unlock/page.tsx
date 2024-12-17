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
import { IoNotifications, IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Unlock() {
  const pathname = usePathname();

  const isActive = (linkPath: string) => pathname === linkPath;

  /* const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  }; */

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 min-h-screen">
        <Navbar />
        <div className="text-center col-start-5 col-span-8 py-8">
          <div className="flex justify-between">
            <div className="bg-white max-h-8 w-3/4 rounded-xl flex justify-between items-center px-5">
              <input
                type="text"
                placeholder="รหัสสมาชิก"
                className="w-full outline-none"
              />
              <IoSearchSharp />
            </div>

            <div className="bg-white max-h-8 w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl">
              <Link
                href="/"
                className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
              >
                <IoNotifications />
              </Link>
              <Link
                href="/profile"
                className={`flex justify-center w-1/2 rounded-lg ${
                  isActive("/profile")
                    ? "bg-cyan-700 text-white"
                    : "hover:bg-cyan-700 hover:text-white"
                } rounded-lg`}
              >
                <FaUserCircle />
              </Link>
            </div>
          </div>

          <div className="flex justify-between items-center min-w-full h-1/2 bg-sky-400 p-6 my-10 mx-auto rounded-3xl">
            <div className="w-64 h-80 p-3 m-2 bg-white ">
              <div className="flex flex-col items-center">
                <h1 className="text-lg py-6 my-5">{Thai.Device_is_lock}</h1>
                <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-blue-500">
                  {Thai.Notify_status}
                </p>
                <button className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl">
                  Detail
                </button>
              </div>
            </div>
            <div className="w-64 h-80 p-3 m-2 bg-white ">
              <div className="flex flex-col items-center">
                <h1 className="text-lg py-6 my-5">{Thai.Account_is_lock}</h1>
                <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-blue-500">
                  {Thai.Notify_status}
                </p>
                <button className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl">
                  Detail
                </button>
              </div>
            </div>
            <div className="w-64 h-80 p-3 m-2 bg-white ">
              <div className="flex flex-col items-center">
                <h1 className="text-lg py-6 my-5">
                  {Thai.Forgot_your_password}
                </h1>
                <p className="flex justify-center py-2 px-3 h-10 w-full drop-shadow-2xl my-5 outline outline-offset-2 outline-blue-500">
                  {Thai.Notify_status}
                </p>
                <button className="text-white py-2 px-3 my-5 bg-sky-500 hover:bg-sky-700 rounded-xl">
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /*  <IDbox />
            <Menu /> */
}
{
  /*   <Container className="flex flex-col items-start justify-start">
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

           
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup} type={popupType} /> */
}