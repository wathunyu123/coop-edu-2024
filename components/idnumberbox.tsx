import { useSearchParams } from "next/navigation";
import React from "react";
import { LiaSearchPlusSolid } from "react-icons/lia";

export default function IDbox() {
  const searchParams = useSearchParams();
  const memberNo = searchParams.get("memberNo");
  const name = searchParams.get("name");
  const idNumber = searchParams.get("idNumber");
  const phoneNumber = searchParams.get("phoneNumber");

  const handleSearch = () => {
    if (memberNo) {
      console.log("Searching for Member:", memberNo);
    } else {
      console.log("No memberNo found in query params");
    }
  };

  return (
    <div className="relative mb-6 mt-5">
      {/* แสดงค่า memberNo ที่ได้จาก query string */}
      <div className="w-full max-w-md p-4 rounded-lg border border-gray-300 bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105">
        <span className="text-gray-800 font-semibold">
          {memberNo || "ไม่ระบุ"}
        </span>
      </div>

      {/* ไอคอนค้นหา */}
      <div
        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        onClick={handleSearch}
      >
        <LiaSearchPlusSolid
          size={30}
          className="text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}
