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
import ErrorPage from "@/components/404popup";
import Searchbar from "@/components/searchbar";

export default function ProfilePage() {
  const pathname = usePathname();
  const { setName: setContextName, setPhoneNumber: setContextPhoneNumber } =
    useUserContext();

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

  // ดึงค่าจาก localStorage เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const storedMemberNo = localStorage.getItem("memberNo");
    if (storedMemberNo) {
      setMemberNo(storedMemberNo);
    }
  }, []);

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

      // Set fetched data to state
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

      // เก็บข้อมูลใน localStorage
      localStorage.setItem("memberNo", data.memberNo);
      localStorage.setItem("name", data.name);
      localStorage.setItem("phoneNumber", data.phoneNumber);
      localStorage.setItem("email", data.email);
      localStorage.setItem("address", data.address);
      localStorage.setItem("profileImage", data.profileImage || "");
    } catch (error) {
      setFetchError(
        error instanceof Error ? error : new Error("Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  // UseEffect to fetch data when memberNo changes
  useEffect(() => {
    if (memberNo) {
      fetchData(memberNo);
    }
  }, [memberNo]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Render loading or error page
  if (fetchError) {
    return <ErrorPage error={fetchError} reset={() => setFetchError(null)} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />{" "}
        {/* Pass the setter for memberNo */}
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="flex flex-col col-start-1 col-span-12 min-h-screen">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row min-w-full min-h-1/2 bg-gray-200 my-10 rounded-3xl p-6 items-center justify-between slide-in">
                <div className="flex w-full items-center justify-center">
                  <div className="w-[200px] h-full p-6">
                    {profileImage ? (
                      <Image
                        src={profileImage || ""}
                        alt="Profile Image"
                        className="w-full h-[200px] p-2"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <FaUserCircle className="w-full h-[200px]" />
                    )}
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
                    <span className="text-gray-500 font-medium">เบอร์โทร:</span>
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
                    <span className="text-gray-500 font-medium">ที่อยู่:</span>
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
    </div>
  );
}
