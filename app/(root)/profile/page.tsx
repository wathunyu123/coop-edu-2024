"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";
import ErrorPage from "@/components/404popup";
import Searchbar from "@/components/searchbar";
import ProfileInfo from "@/components/profileinfo";
import IsLoading from "@/components/isloading";

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
  const { setName, setPhoneNumber } = useUserContext();
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [memberNo, setMemberNo] = useState<string>("");

  // ดึงข้อมูล memberNo จาก localStorage เมื่อเริ่มต้น
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
      const data = await response.json();
      setProfileData(data); // เก็บข้อมูลที่ได้รับ
      return data;
    } catch (error) {
      setProfileData(null); // ถ้าไม่พบข้อมูลให้เป็น null
      throw error instanceof Error ? error : new Error("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันอัปเดตข้อมูลใน Context และ localStorage
  const updateProfileData = useCallback(
    (data: ProfileData) => {
      setProfileData(data);
      setName(data.name);
      setPhoneNumber(data.phoneNumber);

      localStorage.setItem("memberNo", data.memberNo);
      localStorage.setItem("name", data.name);
      localStorage.setItem("phoneNumber", data.phoneNumber);
      localStorage.setItem("email", data.email);
      localStorage.setItem("address", data.address);
      localStorage.setItem("profileImage", data.profileImage || "");
    },
    [setName, setPhoneNumber]
  );

  // useEffect สำหรับการดึงข้อมูลผู้ใช้
  useEffect(() => {
    if (memberNo) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const data = await fetchUserData(memberNo);
          updateProfileData(data);
        } catch (error) {
          setFetchError(
            error instanceof Error ? error : new Error("Unknown error")
          );
        } finally {
          setLoading(false);
        }
      }, 2000); // หน่วงเวลา 2 วินาที
    }
  }, [memberNo, updateProfileData]);

  useEffect(() => {
    if (memberNo) {
      setProfileData(null); // รีเซ็ตข้อมูลโปรไฟล์ก่อนค้นหาครั้งใหม่
    }
  }, [memberNo]);

  if (fetchError) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  const {
    name,
    lastname,
    email,
    phoneNumber,
    idNumber,
    address,

    profileImage,
  } = profileData || {};

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />
        <Suspense fallback={<IsLoading />}>
          {loading ? (
            <IsLoading />
          ) : (
            <>
              {profileData ? (
                <ProfileInfo
                  name={profileData.name ?? "-"}
                  lastname={profileData.lastname ?? "-"}
                  email={profileData.email ?? "-"}
                  phoneNumber={profileData.phoneNumber ?? "-"}
                  idNumber={profileData.idNumber ?? "-"}
                  address={profileData.address ?? "-"}
                  memberNo={profileData.memberNo ?? "-"}
                  profileImage={profileData.profileImage ?? ""}
                />
              ) : (
                <ProfileInfo
                  name="-"
                  lastname="-"
                  email="-"
                  phoneNumber="-"
                  idNumber="-"
                  address="-"
                  memberNo="-"
                  profileImage=""
                />
              )}
            </>
          )}
        </Suspense>
      </Navbar>
    </div>
  );
}
