'use client';
import React from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Menu from "@/components/menu";
import Image from "next/image";

export default function Profile() {
  const searchParams = useSearchParams();

  //   const memberNo = searchParams.get("memberNo");
  //   const name = searchParams.get("name");
  //   const idNumber = searchParams.get("idNumber");
  //   const phoneNumber = searchParams.get("phoneNumber");

  const memberNo = localStorage.getItem("memberNo");
  const name = localStorage.getItem("name");
  const idNumber = localStorage.getItem("idNumber");
  const phoneNumber = localStorage.getItem("phoneNumber");

  return (
    <Container>
      <div>
        <IDbox />
        <Menu />
      </div>

      <div className="flex flex-col lg:flex-row bg-gray-200 px-16 py-20 mt-10 rounded-xl shadow-2xl justify-center items-center">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/3">
          <div className="bg-white p-4 shadow-md">
            <Image
              src="/profile-picture.jpg"
              alt="Profile Picture"
              width={150}
              height={150}
            />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-700">
            รูปโปรไฟล์
          </h2>
        </div>

        {/* Divider */}
        <div className="border-l-2 h-full mx-10 border-gray-300 hidden lg:block"></div>

        {/* Profile Information Section */}
        <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md divide-y divide-gray-300">
          <div className="flex justify-between py-4">
            <span className="text-gray-500 font-medium">ชื่อ - นามสกุล:</span>
            <span className="text-gray-800 font-semibold">
              {name || "ไม่ระบุ"}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-500 font-medium">อีเมล:</span>
            <span className="text-gray-800 font-semibold">test@gmail.com</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-500 font-medium">เบอร์โทร:</span>
            <span className="text-gray-800 font-semibold">
              {phoneNumber || "ไม่ระบุ"}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-500 font-medium">ที่อยู่:</span>
            <span className="text-gray-800 font-semibold">...</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
