import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoHome, IoSearchSharp } from "react-icons/io5";

interface SearchbarProps {
  setMemberNo: (memberNo: string) => void;
}

export default function Searchbar({ setMemberNo }: SearchbarProps) {
  const pathname = usePathname();
  const [localMemberNo, setLocalMemberNo] = useState<string>("");

  // ดึงค่า memberNo จาก localStorage หากมี
  useEffect(() => {
    const storedMemberNo = localStorage.getItem("memberNo");
    if (storedMemberNo) {
      setLocalMemberNo(storedMemberNo); // หากมีค่าที่เก็บไว้ใน localStorage ให้ตั้งค่า
    }
  }, []);

  // เมื่อมีการค้นหา ให้เก็บค่า memberNo ใน localStorage
  const handleSearch = () => {
    if (localMemberNo.trim() === "") {
      alert("Please enter a member number");
      return;
    }

    // เก็บค่าลง localStorage
    localStorage.setItem("memberNo", localMemberNo);
    setMemberNo(localMemberNo); // ส่งค่าไปยัง parent component
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="text-center">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-full rounded-xl flex justify-between items-center px-2 py-2">
          <input
            type="text"
            value={localMemberNo || ""} // ใช้ค่าจาก state สำหรับการแสดงผล
            onChange={(e) => setLocalMemberNo(e.target.value)} // อัพเดตค่าของ input
            placeholder="รหัสสมาชิก"
            className="w-full outline-none bg-gray-200 px-6"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center"
            disabled={!localMemberNo.trim()} // ปิดปุ่มถ้าไม่มีข้อมูลใน input
          >
            <IoSearchSharp />
          </button>
        </div>

        <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl mt-4 md:mt-0">
          <Link
            href="/"
            className="w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center"
          >
            <IoHome />
          </Link>
          <Link
            href="/profile"
            className={`w-1/2 rounded-lg hover:bg-cyan-700 hover:text-white flex justify-center ${
              isActive("/profile") ? "bg-cyan-700 text-white" : ""
            }`}
          >
            <FaUserCircle />
          </Link>
        </div>
      </div>
    </div>
  );
}
