"use client";
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { useUserContext } from "@/contexts/UserContext";
import ErrorPage from "@/components/404popup";
import Searchbar from "@/components/searchbar";
import ProfileInfo from "@/components/profileinfo";
import IsLoading from "@/components/isloading";

interface ProfileData {
  memberNo: string;
  memberName: string;
  memberNameEng: string;
  department: string;
  unit: string;
  jobPosition: string;
  salary: string;
  positionAllowance: string;
  otherIncome: string;
  cardId: string;
  birthDate: string;
  age: string;
  permanentAddress: string;
  presentAddress: string;
  mastTel: string;
  mastMobile: string;
  telephone: string;
  email: string;
  memberDate: string;
  memberType: string;
  memberPeriod: string;
  memberStatus: string;
  resignDate: string;
  share: string;
  cumulativeInt: string;
  shareMonthlyAmount: string;
  monthlyBillingType: string;
  dividendPaidType: string;
  profileImage?: string | null;
}

export default function ProfilePage() {
  const { setName, setPhoneNumber } = useUserContext();
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [memberNo, setMemberNo] = useState<string>("");

  useEffect(() => {
    const storedMemberNo = localStorage.getItem("memberNo");
    if (storedMemberNo && storedMemberNo.trim() !== "") {
      setMemberNo(storedMemberNo);
    }
  }, []);

  const fetchUserData = async (memberNo: string): Promise<ProfileData> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users?memberNo=${memberNo}`
      );
      if (!response.ok) throw new Error("Users Not Found");
      const data = await response.json();
      console.log("User Data:", data);

      // ดึงข้อมูลภาพโปรไฟล์
      const profileImageResponse = await fetch(
        `http://localhost:3000/api/profileImg?memberNo=${memberNo}`
      );
      if (profileImageResponse.ok) {
        const profileImageData = await profileImageResponse.json();
        console.log("Profile Image Data:", profileImageData);

        if (profileImageData?.photo) {
          data.profileImage = profileImageData.photo;
          console.log("Base64 Image:", profileImageData.photo);
        } else {
          console.warn("No base64 image found for memberNo:", memberNo);
          data.profileImage = null;
        }
      } else {
        console.error("Failed to fetch profile image");
        data.profileImage = null;
      }

      setProfileData(data);
      return data;
    } catch (error) {
      setFetchError(
        error instanceof Error ? error : new Error("Unknown error")
      );
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfileData = useCallback(
    (data: ProfileData) => {
      setProfileData(data);
      setName(data.memberName);
      setPhoneNumber(data.mastMobile);

      (Object.keys(data) as (keyof ProfileData)[]).forEach((key) => {
        if (data[key] !== undefined) {
          localStorage.setItem(key, data[key] as string);
        }
      });
    },
    [setName, setPhoneNumber]
  );

  useEffect(() => {
    if (memberNo) {
      setLoading(true);
      setFetchError(null);
      setProfileData(null);
      fetchUserData(memberNo)
        .then((data) => {
          updateProfileData(data);
        })
        .catch((error) => {
          setFetchError(
            error instanceof Error ? error : new Error("Unknown error")
          );
        });
    }
  }, [memberNo, updateProfileData]);

  if (fetchError) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  const profileImage = profileData?.profileImage;
  console.log("Profile Image in Page:", profileImage);

  const profileContent = profileData ? (
    <ProfileInfo {...profileData} profileImage={profileImage ?? undefined} />
  ) : (
    <ProfileInfo
      memberNo="-"
      memberName="-"
      memberNameEng="-"
      department="-"
      unit="-"
      jobPosition="-"
      salary="-"
      positionAllowance="-"
      otherIncome="-"
      cardId="-"
      birthDate="-"
      age="-"
      permanentAddress="-"
      presentAddress="-"
      mastTel="-"
      mastMobile="-"
      telephone="-"
      email="-"
      memberDate="-"
      memberType="-"
      memberPeriod="-"
      memberStatus="-"
      resignDate="-"
      share="-"
      cumulativeInt="-"
      shareMonthlyAmount="-"
      monthlyBillingType="-"
      dividendPaidType="-"
      profileImage=""
    />
  );

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />
        {loading ? <IsLoading /> : profileContent}
      </Navbar>
    </div>
  );
}
