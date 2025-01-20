"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  memberNo: string;
  setMemberNo: (memberNo: string) => void;
  name: string;
  setName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

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

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
