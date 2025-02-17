'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Thai from "@/dictionary/thai";

export default function MyForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    memberNo: "", // memberName
    password: "", // ใช้ memberNo แทน password
  });

  // State สำหรับข้อความเตือนหรือข้อผิดพลาด
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันการตรวจสอบข้อมูลและการทำการล็อกอิน
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบว่า user หรือ memberNo ไม่มีค่าว่าง
    if (!formData.memberNo || !formData.password) {
      setErrorMessage("กรุณากรอกชื่อผู้ใช้และเลขสมาชิก");
      return; // ถ้าไม่กรอกข้อมูลครบก็หยุด
    }

    try {
      // ส่งคำขอ POST ไปยัง API login โดยใช้ memberNo แทน password
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberNo: formData.memberNo, // ส่ง memberName แทน username
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("memberNo", formData.memberNo);
        localStorage.setItem("token", data.token); // สมมุติว่า API ส่ง token กลับมา
        router.push("/profile");
      } else {
        // ถ้า API ตอบกลับ error
        if (response.status === 401) {
          setErrorMessage(
            "การเข้าสู่ระบบล้มเหลว: ข้อมูลผู้ใช้หรือรหัสไม่ถูกต้อง"
          );
        } else {
          setErrorMessage(data.message || "ชื่อผู้ใช้หรือเลขสมาชิกไม่ถูกต้อง");
        }
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error instanceof Error ? error.message : error
      );
      setErrorMessage("เกิดข้อผิดพลาดในการล็อกอิน");
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 w-full min-h-screen">
      <form
        className="flex items-center justify-center col-start-1 col-end-13"
        onSubmit={handleSubmit}
      >
        <div className="lg:flex justify-between items-center p-6 w-full h-[650px] lg:h-4/5 bg-gray-300 rounded-3xl shadow-xl ">
          <div className="max-w-full max-h-[77%] p-4">
            <img
              src="https://psucoop.psu.ac.th/home/tmp/dbd92aa88a980205c55c0d8ec2a92ffa.jpg"
              alt="page"
              className="object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="p-4 lg:flex w-1/2 flex-col items-center justify-center space-y-4">
            <h2 className="text-slate-600 text-2xl font-semibold">
              เข้าสู่ระบบ
            </h2>

            <div className="w-full space-y-4">
              <input
                type="text"
                name="memberNo"
                value={formData.memberNo}
                onChange={handleChange}
                placeholder={Thai.MemberNo}
                className="border border-white rounded-md text-center p-2 w-full text-black bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="password" // เปลี่ยนเป็น text แทน password
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={Thai.Password}
                className="border border-white rounded-md text-center p-2 w-full text-black bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white w-full p-2 mt-5 rounded-md hover:bg-blue-950 transition duration-300 transform hover:scale-105 shadow-md"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
