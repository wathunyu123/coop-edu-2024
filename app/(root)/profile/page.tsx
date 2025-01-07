"use client";
import { useState, useEffect } from "react";
import { IoSearchSharp, IoHome } from "react-icons/io5";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";
import Loading from "./loading";
import ErrorPage from "./404"; // Import the Error Page

export default function ProfilePage() {
  const pathname = usePathname();
  const { setName: setContextName, setPhoneNumber: setContextPhoneNumber } =
    useUserContext();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberNo, setMemberNo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmailState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [profileImage, setLocalProfileImage] = useState<string>("");

  // Fetch user data with error handling
  const fetchData = async (memberNo: string) => {
    setIsLoading(true);
    setFetchError(null);

    try {
      if (!memberNo) {
        throw new Error("Member number is required");
      }

      const response = await fetch(
        `http://localhost:3000/api/users?id=${memberNo}`
      );

      if (!response.ok) {
        throw new Error("Users Not Found");
      }

      const data = await response.json();

      if (!data) {
        throw new Error("No data received");
      }

      // Delay to simulate loading
      setTimeout(() => {
        setMemberNo(data.memberNo || "");
        setName(data.name || "");
        setPhoneNumber(data.phoneNumber || "");
        setIdNumber(data.idNumber || "");
        setLastname(data.lastname || "");
        setEmailState(data.email || "");
        setLocalProfileImage(data.profileImage || "");
        setAddress(data.address || "");
        setContextName(data.name);
        setContextPhoneNumber(data.phoneNumber);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setFetchError(
        error instanceof Error ? error : new Error("Unknown error")
      );
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (memberNo) {
      fetchData(memberNo);
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div>
      {/* Handle error state */}
      {fetchError ? (
        <ErrorPage error={fetchError} reset={() => setFetchError(null)} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <Navbar>
          <div className="grid grid-cols-12 gap-4 min-h-screen">
            <div className="flex flex-col col-start-2 col-span-11 min-h-screen">
              <div className="flex-1">
                <div className="text-center">
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-full rounded-xl flex justify-between items-center px-2 py-2 ">
                      <input
                        type="text"
                        value={memberNo || ""}
                        onChange={(e) => setMemberNo(e.target.value)}
                        placeholder="รหัสสมาชิก"
                        className="w-full outline-none bg-gray-200 px-6"
                      />
                      <button
                        onClick={handleSearch}
                        className="flex items-center justify-center"
                      >
                        <IoSearchSharp />
                      </button>
                    </div>

                    <div className="bg-gray-200 shadow-xl max-h-8 w-full md:w-32 rounded-xl flex justify-between items-center py-2 px-2 text-2xl mt-4 md:mt-0 btn-hover-effect">
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

                <div className="flex flex-col md:flex-row min-w-full min-h-1/2 bg-gray-200 my-10 rounded-3xl p-6 items-center justify-between slide-in">
                  <div className="flex w-full items-center justify-center">
                    <div className="w-[200px] h-full p-6">
                      <Image
                        src={profileImage || "/default-profile.png"}
                        alt="Profile Image"
                        className="bg-white w-full h-[200px] p-2 "
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full bg-white p-6 rounded-lg divide-y divide-gray-300">
                    <div className="flex justify-between py-4">
                      <span className="text-gray-500 font-medium">
                        ชื่อ - นามสกุล:
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {name || ""} {lastname || ""}
                      </span>
                    </div>

                    <div className="lg:flex justify-between py-4">
                      <span className="text-gray-500 font-medium">อีเมล:</span>
                      <span className="text-gray-800 font-semibold">
                        {email || ""}
                      </span>
                    </div>

                    <div className="lg:flex justify-between py-4">
                      <span className="text-gray-500 font-medium">
                        เบอร์โทร:
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {phoneNumber || ""}
                      </span>
                    </div>

                    <div className="lg:flex justify-between py-4">
                      <span className="text-gray-500 font-medium">
                        เลขบัตรประชาชน:
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {idNumber || ""}
                      </span>
                    </div>

                    <div className="lg:flex justify-between py-4">
                      <span className="text-gray-500 font-medium">
                        ที่อยู่:
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {address || ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Navbar>
      )}
    </div>
  );
}
