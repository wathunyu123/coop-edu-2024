// pages/profile.tsx
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import { IoNotifications, IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function Profile() {
  const [name, setName] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [memberNo, setMemberNO] = useState<string | null>(null);
  const [idNumber, setIdmember] = useState<string | null>(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setLastname(localStorage.getItem("lastname"));
    setPhoneNumber(localStorage.getItem("phoneNumber"));
    setMemberNO(localStorage.getItem("memberNo"));
    setIdmember(localStorage.getItem("idNumber"));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 min-h-screen">
        <Navbar />
        <div className="text-center col-start-5 col-span-8 py-6">
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
                className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
              >
                <FaUserCircle />
              </Link>
            </div>
          </div>

          <div className="flex w-full h-1/2 bg-gray-200 my-10 rounded-3xl p-6 items-center justify-between">
            <div className="flex w-full justify-center">
              <div className="w-1/2 h-3/4">
                <Image src="" alt="" className="bg-white w-full h-60 p-2" />
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

              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">อีเมล:</span>
                <span className="text-gray-800 font-semibold">
                  test@gmail.com
                </span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">เบอร์โทร:</span>
                <span className="text-gray-800 font-semibold">
                  {phoneNumber || "ไม่ระบุ"}
                </span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">รหัสสมาชิก:</span>
                <span className="text-gray-800 font-semibold">
                  {memberNo || "ไม่ระบุ"}
                </span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">
                  เลขบัตรประชาชน:
                </span>
                <span className="text-gray-800 font-semibold">
                  {idNumber || "ไม่ระบุ"}
                </span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">ที่อยู่:</span>
                <span className="text-gray-800 font-semibold">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
