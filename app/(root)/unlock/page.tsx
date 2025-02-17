"use client";
import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import UnlockInfo from "@/components/unlockinfo"; // นำเข้า UnlockInfo
import IsLoading from "@/components/isloading";
import Popup from "@/components/popup";
import ErrorPage from "@/components/404popup";

export default function UnlockPage() {
  const [memberNo, setMemberNo] = useState<string | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<string>("normal");
  const [accountStatus, setAccountStatus] = useState<string>("normal");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  // ตรวจสอบ memberNo และโหลดข้อมูล
  useEffect(() => {
    const savedMemberNo = localStorage.getItem("memberNo");
    if (savedMemberNo) {
      setMemberNo(savedMemberNo);
    }
  }, []);

  useEffect(() => {
    if (!memberNo) return;

    const fetchDeviceData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/unlock?memberNo=${memberNo}`
        );

        if (!response.ok) throw new Error("Device Not Found");

        const data = await response.json();
        if (!data) throw new Error("No data received");

        setDeviceStatus(data.device);
        setAccountStatus(data.account);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch data")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeviceData();
  }, [memberNo]);

  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} setAppMembNo={setMemberNo} />
        <Menubar />

        <div>
          {isLoading && <IsLoading />}
          {error && <ErrorPage error={error} reset={() => setError(null)} />}

          {/* เมื่อไม่มีข้อผิดพลาดและไม่ได้โหลดข้อมูล */}
          {!isLoading && !error && memberNo && (
            <Suspense fallback={<IsLoading />}>
              <UnlockInfo
                memberNo={memberNo || ""}
                device={deviceStatus}
                account={accountStatus}
              />
            </Suspense>
          )}

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
