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
      return await response.json();
    } catch (error) {
      throw error;
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

  // หากมีข้อผิดพลาดในการดึงข้อมูล
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
            <ProfileInfo
              name={name ?? "Not Provided"}
              lastname={lastname ?? "Not Provided"}
              email={email ?? "Not Provided"}
              phoneNumber={phoneNumber ?? "Not Provided"}
              idNumber={idNumber ?? "Not Provided"}
              address={address ?? "Not Provided"}
              memberNo={memberNo ?? "Not Provided"}
              profileImage={profileImage ?? ""}
            />
          )}
        </Suspense>
      </Navbar>
    </div>
  );
}
