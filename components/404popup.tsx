// components/ErrorPage.tsx

import React from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative z-10 transform transition-all duration-300 ease-in-out translate-y-0 opacity-100">
        <h2 className="text-xl font-semibold text-red-600">ข้อผิดพลาด</h2>
        <p className="text-gray-700 mt-4">
          {error.message || "เกิดข้อผิดพลาดบางประการ กรุณาลองใหม่อีกครั้ง."}
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            กลับ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
