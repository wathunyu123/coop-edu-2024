'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Thai from "@/dictionary/thai";

export default function MyForm() {
  const router = useRouter();

  // กำหนด state สำหรับฟอร์ม
  const [formData, setFormData] = useState({
    memberNo: "",
    name: "",
    idNumber: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันที่ใช้ส่งข้อมูลไปหน้า Profile
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams(formData).toString();
    router.push(`/profile?${query}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-slate-300 rounded-2xl shadow-2xl flex w-full max-w-4xl">
          <div className="w-full p-5">
            <div className="py-10 text-2xl font-bold text-black text-left">

              {/* Row 1: Member Number */}
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.MemberNo}</label>
                <input
                  type="text"
                  name="memberNo"
                  value={formData.memberNo}
                  onChange={handleChange}
                  className="w-full max-w-md p-2 rounded-xl border border-gray-300"
                />
              </div>

              {/* Row 2: Name */}
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.Name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full max-w-md p-2 rounded-xl border border-gray-300"
                />
              </div>

              {/* Row 3: ID Number */}
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.IdNumber}</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="w-full max-w-md p-2 rounded-xl border border-gray-300"
                />
              </div>

              {/* Row 4: Phone Number */}
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.PhoneNumber}</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full max-w-md p-2 rounded-xl border border-gray-300"
                />
              </div>

            </div>
            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleSubmit}
                className="py-3 px-4 text-2xl font-bold shadow-2xl text-white p-3 pt-2 pb-2 rounded-xl bg-blue-500"
              >
                {Thai.Next}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
