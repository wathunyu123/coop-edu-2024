"use client";
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { useUserContext } from "@/contexts/UserContext";
import Searchbar from "@/components/searchbar";
import ProfileInfo from "@/components/profileinfo";
import IsLoading from "@/components/isloading";
import Thai from "@/dictionary/thai";
import Popup from "@/components/popup";
import ErrorPage from "@/components/404popup";
import Menubar from "@/components/menubar";

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

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

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

      const profileImageResponse = await fetch(
        `http://localhost:3000/api/profileImg?memberNo=${memberNo}`
      );
      if (profileImageResponse.ok) {
        const profileImageData = await profileImageResponse.json();
        if (profileImageData?.photo) {
          data.profileImage = profileImageData.photo;
        } else {
          data.profileImage = null;
        }
      }
      return new Promise<ProfileData>((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 1500);
      });
    } catch (error) {
      setFetchError(
        error instanceof Error ? error : new Error("Unknown error")
      );
      return Promise.reject(error);
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
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [memberNo, updateProfileData]);

  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSetAppMembNo = (memberNo: string) => {
    setMemberNo(memberNo);
  };

  if (fetchError) {
    console.error("Fetch error:", fetchError);
    return (
      <div className="min-h-screen">
        <Navbar>
          <Searchbar
            setMemberNo={setMemberNo}
            setAppMembNo={handleSetAppMembNo}
          />
          <div className="grid grid-cols-12 gap-4 min-h-screen">
            <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
              <ErrorPage error={fetchError} reset={() => setFetchError(null)} />
            </div>
          </div>
        </Navbar>
      </div>
    );
  }

  const profileImage = profileData?.profileImage;

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
        <Searchbar
          setMemberNo={setMemberNo}
          setAppMembNo={handleSetAppMembNo}
        />
        {loading ? <IsLoading /> : profileContent}
      </Navbar>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        type="Forgot your password"
        phoneNumber={memberNo || ""}
      />
    </div>
  );
}
