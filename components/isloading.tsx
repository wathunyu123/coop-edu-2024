import React from "react";
import { useState, useEffect } from "react";

function IsLoading() {
  return (
    <div className="flex min-h-screen min-w-full items-center justify-center space-x-4">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-blue-300 border-solid rounded-full animate-spin"></div>
        <div className="mt-4 text-lg text-gray-600">กำลังโหลด...</div>
      </div>
    </div>
  );
}

export default IsLoading;
