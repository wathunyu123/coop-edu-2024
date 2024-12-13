'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Profile() {
  const [name, setName] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [memberno, setMemberNO] = useState<string | null>(null);
  const [idnumber, setIdmember] = useState<string | null>(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setLastname(localStorage.getItem("lastname"));
    setPhoneNumber(localStorage.getItem("phoneNumber"));
    setMemberNO(localStorage.getItem("memberno"));
    setIdmember(localStorage.getItem("idnumber"));
  }, []);

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen ">
      <Navbar />

      <div className="flex items-center justify-between lg:w-3/5 bg-gray-200 mx-44 h-1/2 my-28 w-10 rounded-3xl">
        <div className="flex flex-col lg:flex-row items-center  p-8 rounded-3xl w-full max-w-4xl mx-4">
          <div className="flex justify-center items-center bg-white  w-[150px] h-[150px] lg:w-[170px] lg:h-[200px] mr-24">
            <img src="#" alt="profile" className="rounded-full" />
          </div>

          <div className="flex flex-col lg:w-2/3 mt-8 lg:mt-0 lg:ml-8 w-full gap-5 px-5">
            <div className="flex justify-between py-2 px-5">
              <span className="text-gray-500 font-medium">ชื่อ - นามสกุล:</span>
              <span className="text-gray-800 font-semibold">
                {name || "ไม่ระบุ"}
                {lastname || "ไม่ระบุ"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500 font-medium">อีเมล:</span>
              <span className="text-gray-800 font-semibold">
                test@gmail.com
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500 font-medium">เบอร์โทร:</span>
              <span className="text-gray-800 font-semibold">
                {phoneNumber || "ไม่ระบุ"}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-500 font-medium">รหัสสมาชิก</span>
              <span className="text-gray-500 font-semibold">
                {memberno || "ไม่ระบุ"}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-500 font-medium">เลขบัตรประชาชน</span>
              <span className="text-gray-500 font-semibold">
                {idnumber || "ไม่ระบุ"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500 font-medium">ที่อยู่:</span>
              <span className="text-gray-800 font-semibold">...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
