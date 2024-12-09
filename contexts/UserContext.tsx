"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// กำหนดประเภทของข้อมูล context
interface UserContextType {
  memberNo: string;
  setMemberNo: (memberNo: string) => void;
  name: string;
  setName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

// สร้าง Context โดยตั้งค่าเป็น undefined เพื่อให้ใช้ในกรณีที่ไม่มี UserProvider
const UserContext = createContext<UserContextType | undefined>(undefined);

// สร้าง UserProvider สำหรับการจัดการ Context ให้สามารถใช้งานในแอปพลิเคชัน
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [memberNo, setMemberNo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        memberNo,
        setMemberNo,
        name,
        setName,
        phoneNumber,
        setPhoneNumber,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook เพื่อดึงข้อมูลจาก UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
