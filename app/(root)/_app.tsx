import { UserProvider } from "@/contexts/UserContext"; // นำเข้าจาก context ที่สร้าง
import React from "react";
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
