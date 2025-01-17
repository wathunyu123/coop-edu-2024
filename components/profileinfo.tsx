import React from "react";

interface ProfileInfoProps {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  idNumber: string;
  address: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  lastname,
  email,
  phoneNumber,
  idNumber,
  address,
}) => {
  return (
    <div className="flex flex-col w-full bg-white p-6 rounded-lg divide-y divide-gray-300">
      {/* Name and Lastname */}
      <div className="flex justify-between py-4">
        <span className="text-gray-500 font-medium">Name - Lastname:</span>
        <span className="text-gray-800 font-semibold">
          {name || "Not Provided"} {lastname || "Not Provided"}
        </span>
      </div>

      {/* Email */}
      <div className="flex justify-between py-4">
        <span className="text-gray-500 font-medium">Email:</span>
        <span className="text-gray-800 font-semibold">
          {email || "Not Provided"}
        </span>
      </div>

      {/* Phone Number */}
      <div className="flex justify-between py-4">
        <span className="text-gray-500 font-medium">Phone Number:</span>
        <span className="text-gray-800 font-semibold">
          {phoneNumber || "Not Provided"}
        </span>
      </div>

      {/* ID Number */}
      <div className="flex justify-between py-4">
        <span className="text-gray-500 font-medium">ID Number:</span>
        <span className="text-gray-800 font-semibold">
          {idNumber || "Not Provided"}
        </span>
      </div>

      {/* Address */}
      <div className="flex justify-between py-4">
        <span className="text-gray-500 font-medium">Address:</span>
        <span className="text-gray-800 font-semibold">
          {address || "Not Provided"}
        </span>
      </div>
    </div>
  );
};

export default ProfileInfo;
