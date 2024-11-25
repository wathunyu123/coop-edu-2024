import React, { useState } from "react";
import { LiaSearchPlusSolid } from "react-icons/lia";

const MemberForm = () => {
    // State สำหรับเก็บค่า member number และ idNumber
    const [memberNo, setMemberNo] = useState("");
    const [idNumber, setIdNumber] = useState("1234567890"); // กำหนดค่าเริ่มต้นให้เป็นหมายเลข ID

    // ฟังก์ชันสำหรับการเปลี่ยนแปลงค่า input ของ memberNo
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberNo(e.target.value);
    };

    // ฟังก์ชันสำหรับการเปลี่ยนแปลงค่า input ของ idNumber
    const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdNumber(e.target.value); // อัปเดตค่าของ idNumber
    };

    // ฟังก์ชันค้นหาหรือการทำงานเมื่อคลิกที่ปุ่มค้นหา
    const handleSearch = () => {
        console.log("Searching for Member:", memberNo);
    };

    return (
        <div className="relative mb-6 mt-5">
            <input
                type="text"
                className="w-full max-w-md p-4 rounded-lg border border-gray-300 bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter Member Number"
                value={memberNo}
                onChange={handleChange} // อัปเดตค่า memberNo
            />


            {/* Icon Search */}
            <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={handleSearch} // เมื่อคลิกปุ่มค้นหา
            >
                <LiaSearchPlusSolid size={30} className="text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out" />
            </div>
        </div>
    );
};

export default MemberForm;
