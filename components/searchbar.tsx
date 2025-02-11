import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoHome, IoSearchSharp } from "react-icons/io5";

interface SearchbarProps {
  setMemberNo: (memberNo: string) => void;
  setAppMembNo: (appMembNo: string) => void; // ฟังก์ชันใหม่สำหรับ appMembNo
}

export default function Searchbar({
  setMemberNo,
  setAppMembNo,
}: SearchbarProps) {
  const pathname = usePathname();
  const [localMemberNo, setLocalMemberNo] = useState<string>("");

  // ดึงค่า memberNo และ appMembNo จาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const storedMemberNo = localStorage.getItem("memberNo");
    const storedAppMembNo = localStorage.getItem("appMembNo");

    if (storedMemberNo) {
      setLocalMemberNo(storedMemberNo); // หากมีค่าที่เก็บไว้ใน localStorage ให้ตั้งค่า
    }

    // ถ้ามี appMembNo ใน localStorage ก็ควรตั้งค่า appMembNo ด้วย
    if (storedAppMembNo) {
      setAppMembNo(storedAppMembNo);
    }
  }, [setAppMembNo]);

  // เมื่อมีการค้นหา ให้เก็บค่า memberNo และ appMembNo ใน localStorage
  const handleSearch = () => {
    if (localMemberNo.trim() === "") {
      alert("Please enter a member number");
      return;
    }

    // เก็บค่าลง localStorage
    localStorage.setItem("memberNo", localMemberNo);
    localStorage.setItem("appMembNo", localMemberNo); // เก็บค่าของ appMembNo ด้วย
    setMemberNo(localMemberNo); // ส่งค่า memberNo ไปยัง parent component
    setAppMembNo(localMemberNo); // ส่งค่า appMembNo ไปยัง parent component
  };

  // ฟังก์ชันตรวจสอบการกดปุ่ม Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log("Key pressed:", e.key); // ดูว่ามีการกดปุ่มอะไร
    if (e.key === "Enter") {
      handleSearch(); // เรียกฟังก์ชัน handleSearch เมื่อกด Enter
    }
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
            value={localMemberNo || ""}
            onChange={(e) => setLocalMemberNo(e.target.value)}
            onKeyDown={handleKeyDown} // เพิ่มการจับเหตุการณ์เมื่อกด Enter
            placeholder="รหัสสมาชิก"
            className="w-full outline-none bg-gray-200 px-6"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center"
            disabled={!localMemberNo.trim()}
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
