import Thai from "@/dictionary/thai";
import React from "react";
import Image from "next/image";

interface ProfileInfoProps {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  idNumber: string;
  address: string;
  memberNo: string;
  profileImage: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  lastname,
  email,
  phoneNumber,
  idNumber,
  address,
  memberNo,
  profileImage,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen">
      <div className="flex flex-col col-start-1 col-span-12 min-h-screen">
        <div className="flex-1">
          <div className="flex flex-col md:flex-row min-w-full min-h-1/2 bg-gray-200 my-10 rounded-3xl p-6 items-center justify-between slide-in">
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
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                )}
              </div>
            </div>

            <div className="flex flex-col w-full bg-white p-6 rounded-lg divide-y divide-gray-300">
              {/* Name and Lastname */}
              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">
                  {Thai.Name} {Thai.Lastname}
                </span>
                <span className="text-gray-800 font-semibold">
                  {name || "Not Provided"} {lastname || "Not Provided"}
                </span>
              </div>

              {/* Email */}
              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">{Thai.Email}</span>
                <span className="text-gray-800 font-semibold">
                  {email || "Not Provided"}
                </span>
              </div>

              {/* Phone Number */}
              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">
                  {Thai.PhoneNumber}
                </span>
                <span className="text-gray-800 font-semibold">
                  {phoneNumber || "Not Provided"}
                </span>
              </div>

              {/* ID Number */}
              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">
                  {Thai.IdNumber}
                </span>
                <span className="text-gray-800 font-semibold">
                  {idNumber || "Not Provided"}
                </span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">
                  {Thai.MemberNo}
                </span>
                <span className="text-gray-800 font-semibold">
                  {memberNo || "Not Provided"}
                </span>
              </div>

              {/* Address */}
              <div className="flex justify-between py-4">
                <span className="text-gray-500 font-medium">
                  {Thai.Address}
                </span>
                <span className="text-gray-800 font-semibold">
                  {address || "Not Provided"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
