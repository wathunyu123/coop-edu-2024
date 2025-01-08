'use client';

import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Thai from "@/dictionary/thai";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangeEmailPage() {
  const pathname = usePathname();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmailState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [profileImage, setLocalProfileImage] = useState<string>("");

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  const searchParams = useSearchParams();

  const [memberNo, setMemberNo] = useState<string | null>(null);

  useEffect(() => {
    setMemberNo(localStorage.getItem("memberNo"));
  }, []);
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
    } catch (error) {
      setFetchError(
        error instanceof Error ? error : new Error("Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const newDeviceInfo = {
    deviceName: "iPhone 15 Pro Max",
    deviceSerial: "ABC123XYZ456",
    deviceModel: "Apple",
    connectionStatus: "Connected",
    changeDate: "20 Nov 2024",
  };

  return (
    <div
      className={`transition-container ${isFadingOut ? "fade-out" : "fade-in"}`}
    >
      <Navbar>
        <Searchbar setMemberNo={setMemberNo} />{" "}
        <div className="grid md:grid-cols-12 gap-4 min-h-screen">
          <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12  ">
            <div className="text-white flex flex-col md:flex-row w-full h-auto md:h-12 bg-sky-700 my-10 p-6 items-center justify-between rounded-3xl">
              <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 md:gap-0">
                <div className="w-full flex justify-center">
                  <Link
                    href="/changeEM"
                    className={`px-6 py-1 ${
                      isActive("/changeEM")
                        ? "bg-white text-black"
                        : "hover:bg-white hover:text-black"
                    } rounded-xl`}
                  >
                    {Thai.MemberNo}
                  </Link>
                </div>
                <div className="w-full flex justify-center">
                  <Link
                    href="/numberEM"
                    className={`px-6 py-1 ${
                      isActive("/numberEM")
                        ? "bg-white text-black"
                        : "hover:bg-white hover:text-black"
                    } rounded-xl`}
                  >
                    {Thai.NumberEM}
                  </Link>
                </div>
              </div>
            </div>

            {memberNo ? (
              <div className="bg-gray-200 rounded-2xl p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <span className="font-bold">{Thai.DeviceName}:</span>
                    <span>{newDeviceInfo.deviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">{Thai.DeviceSerial}:</span>
                    <span>{newDeviceInfo.deviceSerial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">{Thai.DeviceModel}:</span>
                    <span>{newDeviceInfo.deviceModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">{Thai.ConnectionStatus}:</span>
                    <span>{newDeviceInfo.connectionStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">{Thai.ChangeDate}:</span>
                    <span>{newDeviceInfo.changeDate}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-200 rounded-2xl p-6 text-center text-red-500">
                {Thai.Nodata}
              </div>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}

