import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoHome, IoSearchSharp } from "react-icons/io5";

interface SearchbarProps {
  setMemberNo: (memberNo: string) => void;
}

export default function Searchbar({ setMemberNo }: SearchbarProps) {
  const pathname = usePathname();
  const [memberNo, setLocalMemberNo] = useState<string>("");

  // Function to check if the current path is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleSearch = () => {
    if (memberNo.trim() === "") {
      alert("Please enter a member number");
      return; // Don't proceed if memberNo is empty
    }
    setMemberNo(memberNo);
  };

  return (
    <div className="text-center">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-full rounded-xl flex justify-between items-center px-2 py-2">
          <input
            type="text"
            value={memberNo}
            onChange={(e) => setLocalMemberNo(e.target.value)}
            placeholder="รหัสสมาชิก"
            className="w-full outline-none bg-gray-200 px-6"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center"
            disabled={!memberNo.trim()} // Disable when memberNo is empty
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
