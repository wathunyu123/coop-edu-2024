'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";
import Thai from "@/dictionary/thai";
import { div } from "framer-motion/client";
import Image from "next/image";
//import { Image } from "@nextui-org/react";

export default function MyForm() {
  const router = useRouter();
  const { setMemberNo, setName, setPhoneNumber } = useUserContext();
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [formData, setFormData] = useState({
    memberNo: "",
    name: "",
    lastname: "",
    idNumber: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("memberNo", formData.memberNo);
    localStorage.setItem("name", formData.name);
    localStorage.setItem("lastname", formData.lastname);
    localStorage.setItem("idNumber", formData.idNumber);
    localStorage.setItem("phoneNumber", formData.phoneNumber);

    setMemberNo(formData.memberNo);
    setName(formData.name);
    setPhoneNumber(formData.phoneNumber);

    router.push(`/profile`);
  };

  return (
    <div
      className={`transition-container ${isFadingOut ? "fade-out" : "fade-in"}`}
    >
      <div className="grid grid-cols-12 gap-4 w-full min-h-screen">
        <form
          className="flex items-center justify-center col-start-1 col-end-13 "
          onSubmit={handleSubmit}
        >
          <div className="lg:flex justify-between items-center p-6 w-full h-4/5 bg-slate-300 rounded-3xl">
            <div className="max-w-full max-h-[77%] p-4 ">
              <img
                src="https://psucoop.psu.ac.th/home/tmp/dbd92aa88a980205c55c0d8ec2a92ffa.jpg"
                alt="page"
                className=" object-cover"
              />
            </div>

            <div className="p-4 lg:flex flex-col items-center justify-center">
              <div className="flex flex-col lg:flex-row w-full gap-4">
                <input
                  type="string"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ชื่อ"
                  className="border border-black rounded-md text-center p-2 flex-1 text-black "
                />
                <input
                  type="string"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                  className="border border-black rounded-md text-center p-2 flex-1 text-black"
                />
              </div>

              <div className="flex flex-col w-full mt-5">
                <input
                  type="number"
                  name="memberNo"
                  value={formData.memberNo}
                  onChange={handleChange}
                  placeholder="เลขสมาชิก"
                  className="border border-black rounded-md text-center p-2 flex-1 text-black"
                />
              </div>

              <div className="flex flex-col w-full mt-5">
                <input
                  type="number"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="เลชบัตรประชาชน"
                  className="border border-black rounded-md text-center p-2 flex-1 text-black"
                />
              </div>

              <div className="flex flex-col w-full mt-5">
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="เบอร์โทรศัพท์"
                  className="border border-black rounded-md text-center p-2 text-black"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white w-full p-2 mt-5 rounded-md hover:bg-blue-950 hover:text-white"
              >
                {Thai.Next}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
{
  /* <div className="w-full min-h-screen flex flex-col lg:flex-row items-start ">
      <div className="w-full lg:h-screen">
        <img
          alt="page_1"
          src="https://psucoop.psu.ac.th/home/tmp/dbd92aa88a980205c55c0d8ec2a92ffa.jpg"
          className="lg:w-full lg:h-full object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 min-h-screen flex bg-white p-20 flex-col items-center justify-center">
        <div className="mb-5 ">
          <img
            alt="logo"
            src="https://psucoop.psu.ac.th/home/images/contact-us/logo.png"
            className="flex flex-1 mb-10 object-cover"
          />
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <input
            type="string"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ชื่อ"
            className="border border-black rounded-md text-center p-2 flex-1 text-black "
          />
          <input
            type="string"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="นามสกุล"
            className="border border-black rounded-md text-center p-2 flex-1 text-black"
          />
        </div>

        <div className="flex flex-col w-full mt-5">
          <input
            type="number"
            name="memberNo"
            value={formData.memberNo}
            onChange={handleChange}
            placeholder="เลขสมาชิก"
            className="border border-black rounded-md text-center p-2 flex-1 text-black"
          />
        </div>

        <div className="flex flex-col w-full mt-5">
          <input
            type="number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="เลชบัตรประชาชน"
            className="border border-black rounded-md text-center p-2 flex-1 text-black"
          />
        </div>

        <div className="flex flex-col w-full mt-5">
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์"
            className="border border-black rounded-md text-center p-2 text-black"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full p-2 mt-5 border border-black rounded-md hover:bg-blue-950 hover:text-white hover:border-white"
        >
          {Thai.Next}
        </button>
      </div>
    </div> */
}