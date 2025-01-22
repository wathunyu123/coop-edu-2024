import React, { useState } from "react";
import Image from "next/image";
import Thai from "@/dictionary/thai";

interface ProfileInfoProps {
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
  profileImage?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  memberNo,
  memberName,
  memberNameEng,
  department,
  unit,
  jobPosition,
  salary,
  positionAllowance,
  otherIncome,
  cardId,
  birthDate,
  age,
  permanentAddress,
  presentAddress,
  mastTel,
  mastMobile,
  telephone,
  email,
  memberDate,
  memberType,
  memberPeriod,
  memberStatus,
  resignDate,
  share,
  cumulativeInt,
  shareMonthlyAmount,
  monthlyBillingType,
  dividendPaidType,
  profileImage,
}) => {
  // Data for pagination (only showing part of it here)
  const profileData = [
    { title: Thai.Name, value: memberName },
    { title: Thai.NameEng, value: memberNameEng },
    { title: Thai.Department, value: department },
    { title: Thai.Unit, value: unit },
    { title: Thai.JobPosition, value: jobPosition },
    { title: Thai.Salary, value: salary },
    { title: Thai.PositionAllowance, value: positionAllowance },
    { title: Thai.OtherIncome, value: otherIncome },
    { title: Thai.CardId, value: cardId },
    { title: Thai.BirthDate, value: birthDate },
    { title: Thai.Age, value: age },
    { title: Thai.PermanentAddress, value: permanentAddress },
    { title: Thai.PresentAddress, value: presentAddress },
    { title: Thai.MastTel, value: mastTel },
    { title: Thai.MastMobile, value: mastMobile },
    { title: Thai.Telephone, value: telephone },
    { title: Thai.Email, value: email },
    { title: Thai.MemberDate, value: memberDate },
    { title: Thai.MemberType, value: memberType },
    { title: Thai.MemberPeriod, value: memberPeriod },
    { title: Thai.MemberStatus, value: memberStatus },
    { title: Thai.ResignDate, value: resignDate },
    { title: Thai.Share, value: share },
    { title: Thai.CumulativeInt, value: cumulativeInt },
    { title: Thai.ShareMonthlyAmount, value: shareMonthlyAmount },
    { title: Thai.MonthlyBillingType, value: monthlyBillingType },
    { title: Thai.DividendPaidType, value: dividendPaidType },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Calculate total pages
  const totalPages = Math.ceil(profileData.length / itemsPerPage);

  // Get data for the current page
  const currentData = profileData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen">
      <div className="flex flex-col col-start-1 col-span-12 min-h-screen">
        <div className="flex-1">
          <div className="bg-gray-200 rounded-3xl ">
            <div className="flex flex-col md:flex-row min-w-full min-h-1/2  my-10  p-6 items-center  slide-in">
              <div className="flex w-full items-center justify-center">
                <div className="w-[200px] h-full p-6">
                  {renderProfileImage()}
                </div>
              </div>

              <div className="flex flex-col w-full rounded-lg ">
                <div className="flex flex-col w-full p-6 rounded-lg divide-y divide-gray-300 bg-white">
                  {currentData.map((item, index) => (
                    <div key={index} className="flex justify-between py-4  ">
                      <span className="text-gray-500 font-medium">
                        {item.title}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {item.value || "-"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center gap-6 my-3 py-2 bg-white rounded-xl">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="bg-gray-300 p-2 rounded-lg disabled:opacity-50"
                  >
                    {Thai.Prev}
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 p-2 rounded-lg disabled:opacity-50"
                  >
                    {Thai.Next}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderProfileImage = () => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z"
          fill="#000000"
        ></path>
        <path
          d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z"
          fill="#030303"
        ></path>
        <path
          d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z"
          fill="#000000"
        ></path>
      </g>
    </svg>
  );
};

export default ProfileInfo;
