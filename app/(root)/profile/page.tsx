"use client";

import React, {
  useState,
  useEffect,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";
import ErrorPage from "@/components/404popup";
import Searchbar from "@/components/searchbar";
import IsLoading from "@/components/isloading"; // นำเข้า IsLoading
import ProfileInfo from "@/components/profileinfo"; // คอมโพเนนต์โปรไฟล์ที่ใช้แสดงข้อมูล

interface ProfileData {
  name: string;
  phoneNumber: string;
  idNumber: string;
  lastname: string;
  email: string;
  address: string;
  profileImage: string;
  memberNo: string;
}

export default function ProfilePage() {
  const pathname = usePathname();
  const { setName: setContextName, setPhoneNumber: setContextPhoneNumber } =
    useUserContext();
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // ใช้เช็คสถานะการโหลด
  const [memberNo, setMemberNo] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // ใช้ localStorage ในการดึงค่า memberNo
  useEffect(() => {
    const storedMemberNo = localStorage.getItem("memberNo");
    if (storedMemberNo) {
      setMemberNo(storedMemberNo);
    }
  }, []);

  // ฟังก์ชันดึงข้อมูลผู้ใช้จาก API
  const fetchUserData = async (memberNo: string): Promise<ProfileData> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users?id=${memberNo}`
      );
      if (!response.ok) throw new Error("Users Not Found");
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // ฟังก์ชันอัพเดตข้อมูลผู้ใช้
  const updateProfileData = useCallback(
    (data: ProfileData) => {
      setProfileData(data);
      setContextName(data.name);
      setContextPhoneNumber(data.phoneNumber);

      // เก็บข้อมูลใน localStorage
      localStorage.setItem("memberNo", data.memberNo);
      localStorage.setItem("name", data.name);
      localStorage.setItem("phoneNumber", data.phoneNumber);
      localStorage.setItem("email", data.email);
      localStorage.setItem("address", data.address);
      localStorage.setItem("profileImage", data.profileImage || "");
    },
    [setContextName, setContextPhoneNumber]
  );

  // ฟังก์ชันดึงข้อมูลเมื่อ memberNo เปลี่ยน
  useEffect(() => {
    if (memberNo) {
      setLoading(true);
      setFetchError(null);

      fetchUserData(memberNo)
        .then((data) => {
          updateProfileData(data); // อัพเดตข้อมูลที่ได้จาก API
        })
        .catch((error) => {
          setFetchError(
            error instanceof Error ? error : new Error("Unknown error")
          );
        })
        .finally(() => {
          setLoading(false); // เมื่อการโหลดเสร็จแล้ว
        });
    }
  }, [memberNo, updateProfileData]);

  // หากมีข้อผิดพลาดในการดึงข้อมูล
  if (fetchError) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  // หากกำลังโหลดหรือยังไม่ได้ข้อมูลจาก API
  if (loading || !profileData) {
    return <IsLoading />; // แสดง IsLoading ขณะกำลังโหลดข้อมูล
  }

  // หากโหลดข้อมูลสำเร็จ แสดงข้อมูลโปรไฟล์
  const {
    name,
    lastname,
    email,
    phoneNumber,
    idNumber,
    address,
    profileImage,
  } = profileData;

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="flex flex-col col-start-1 col-span-12 min-h-screen">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row min-w-full min-h-1/2 bg-gray-200 my-10 rounded-3xl p-6 items-center justify-between slide-in">
                <Suspense fallback={<IsLoading />}>
                  <div className="flex w-full items-center justify-center">
                    <div className="w-[200px] h-full p-6">
                      {profileImage ? (
                        <Image
                          src={profileImage}
                          alt="Profile Image"
                          className="w-full h-[200px] p-2"
                          width={200}
                          height={200}
                        />
                      ) : (
                        <svg
                          viewBox="0 0 1024 1024"
                          className="icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#000000"
                        >
                          {/* SVG สำหรับรูปโปรไฟล์ */}
                        </svg>
                      )}
                    </div>
                  </div>
                  <ProfileInfo
                    name={name}
                    lastname={lastname}
                    email={email}
                    phoneNumber={phoneNumber}
                    idNumber={idNumber}
                    address={address}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
