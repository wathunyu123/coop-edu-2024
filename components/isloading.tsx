import React, { useState, useEffect } from "react";

interface IsLoadingProps {
  message?: string;
}

function IsLoading({ message = "กำลังโหลด" }: IsLoadingProps) {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [dots, setDots] = useState<string>("");

  // Change the dots in the message every 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(true);
    });

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.length < 3 ? prevDots + "." : "";
      });
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  if (!showLoading) {
    return null; // Show nothing until the delay is finished
  }

  return (
    <div className="flex min-h-[600px] min-w-full items-center justify-center space-x-4">
      <div className="flex flex-col items-center justify-center space-y-4 h-2/3">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="text-lg text-gray-600">
          {message}
          <span className="font-semibold text-blue-500">{dots}</span>
        </div>
      </div>
    </div>
  );
}

export default IsLoading;
