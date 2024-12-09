'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Thai from "@/dictionary/thai";
import { div } from "framer-motion/client";
import Image from "next/image";
//import { Image } from "@nextui-org/react";

export default function MyForm() {
  const router = useRouter();

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

    router.push(`/profile`);

    // const query = new URLSearchParams(formData).toString();
    // router.push(`/profile?${query}`);
  };

  return (
    <div className="w-full min-h-screen flex items-start">
      <div className="w-full h-screen">
        <img
          alt="page_1"
          src="https://psucoop.psu.ac.th/home/tmp/dbd92aa88a980205c55c0d8ec2a92ffa.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 min-h-screen flex bg-white p-20 flex-col items-center justify-center">
        <div className="mb-5 ">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={50}
            className="flex flex-1 mb-10"
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
          className="bg-blue-500 text-white w-full p-2 mt-5 border border-black rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500"
        >
          {Thai.Next}
        </button>
      </div>
    </div>

    /* <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-slate-300 rounded-2xl shadow-2xl flex w-full max-w-4xl">
          <div className="w-full p-5">
            <div className="py-10 text-2xl font-bold text-black text-left">
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">
                  {Thai.MemberNo}
                </label>
                <input
                  type="text"
                  name="memberNo"
                  value={formData.memberNo}
                  onChange={handleChange}
                  className="w-full max-w-md p-2 rounded-xl border border-gray-300"
                />
              </div>

              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.Name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full max-w-md p-2 rounded-xl border border-gray-300"
                />
              </div>

              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">
                  {Thai.IdNumber}
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="w-full max-w-md p-2 rounded-xl border border-gray-300"
                />
              </div>

              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">
                  {Thai.PhoneNumber}
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full max-w-md p-2 rounded-xl border border-gray-300"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleSubmit}
                className="py-3 px-4 text-2xl font-bold shadow-2xl text-white p-3 pt-2 pb-2 rounded-xl bg-blue-500"
              >
                {Thai.Next}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>  */
  );
}
