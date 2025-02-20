"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import UnlockInfo from "@/components/unlockinfo"; // นำเข้า UnlockInfo
import IsLoading from "@/components/isloading";
import Popup from "@/components/popup";
import ErrorPage from "@/components/404popup"; // ใช้ ErrorPage เพื่อแสดงข้อผิดพลาด

export default function UnlockPage() {
  const [memberNo, setMemberNo] = useState<string | null>(null); // เก็บ memberNo
  const [deviceStatus, setDeviceStatus] = useState<string>("normal"); // เก็บสถานะของอุปกรณ์
  const [accountStatus, setAccountStatus] = useState<string>("normal"); // เก็บสถานะบัญชี
  const [forgotPasswordMethod, setForgotPasswordMethod] = useState<
    string | null
  >(null); // เก็บวิธีการขอรหัสผ่าน (SMS หรือหน้าเว็บ)
  const [isLoading, setIsLoading] = useState<boolean>(false); // สถานะการโหลด
  const [error, setError] = useState<Error | null>(null); // จัดการข้อผิดพลาด
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // สถานะเปิด/ปิดของ Popup

  // ตรวจสอบ memberNo และโหลดข้อมูล
  useEffect(() => {
    const savedMemberNo = localStorage.getItem("memberNo");
    if (savedMemberNo) {
      setMemberNo(savedMemberNo); // ตั้งค่า memberNo ที่เก็บไว้ใน localStorage
    }
  }, []);

  // เมื่อมีการเปลี่ยนแปลง memberNo ให้โหลดข้อมูลใหม่
  useEffect(() => {
    if (!memberNo) return; // ถ้าไม่มี memberNo ก็ไม่ทำการโหลดข้อมูล

    // ดึงข้อมูลจาก Unlock API
    const fetchDeviceData = async () => {
      setIsLoading(true); // เริ่มโหลด
      setError(null); // รีเซ็ต error ก่อนโหลดใหม่

      try {
        const response = await fetch(
          `http://localhost:3000/api/unlock?memberNo=${memberNo}`
        );

        if (!response.ok) throw new Error("Device Not Found");

        const data = await response.json();
        if (!data) throw new Error("No data received");

        setDeviceStatus(data.device); // เก็บข้อมูลสถานะอุปกรณ์
        setAccountStatus(data.account); // เก็บข้อมูลสถานะบัญชี
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch data")
        );
      } finally {
        setIsLoading(false); // เสร็จสิ้นการโหลด
      }
    };

    // ดึงข้อมูลจาก Forgot Password API
    const handleForgotPasswordClick = async (method: string) => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/forgotpassword",
          {
            method: "POST", // ใช้ POST เท่านั้น
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              memberNo: memberNo, // memberNo
              preferredMethod: method, // sms หรือ email
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Response:", data);
        // Handle the success response
      } catch (error) {
        console.error("Error during request:", error);
      }
    };

    fetchDeviceData(); // เรียกฟังก์ชันในการโหลดข้อมูล Unlock API
    if (forgotPasswordMethod) {
      handleForgotPasswordClick(forgotPasswordMethod); // เรียกฟังก์ชันในการโหลดข้อมูล Forgot Password API
    }
  }, [memberNo, forgotPasswordMethod]); // เมื่อ memberNo หรือ forgotPasswordMethod เปลี่ยนให้โหลดข้อมูลใหม่

  // ฟังก์ชันปิด Popup
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} setAppMembNo={setMemberNo} />
        <Menubar />

        <div>
          {/* แสดง IsLoading ขณะโหลดข้อมูล */}
          {isLoading && <IsLoading />}

          {/* แสดงข้อผิดพลาดถ้ามี */}
          {error && <ErrorPage error={error} reset={() => setError(null)} />}

          {/* แสดงข้อมูลเมื่อไม่มีข้อผิดพลาดและไม่ได้โหลดข้อมูล */}
          {!isLoading && !error && memberNo && (
            <Suspense fallback={<IsLoading />}>
              <UnlockInfo
                memberNo={memberNo || ""}
                device={deviceStatus}
                account={accountStatus}
              />
            </Suspense>
          )}

          {/* แสดงการเลือกวิธีการขอรหัสผ่าน */}
          {forgotPasswordMethod && (
            <div>
              {forgotPasswordMethod === "sms" ? (
                <p>Password reset link has been sent to your phone via SMS.</p>
              ) : (
                <p>Password reset link has been sent to your email.</p>
              )}
            </div>
          )}

          {/* แสดง Popup */}
          <Popup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            type="Forgot your password"
            phoneNumber={memberNo || ""}
          />
        </div>
      </Navbar>
    </div>
  );
}
