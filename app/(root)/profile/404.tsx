// app/404.tsx หรือ pages/404.tsx
import React from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <div className="error-page flex flex-col gap-16 items-center justify-center min-h-screen">
      <div className="flex gap-2 divide-red-950 divide-x-2">
        <h1 className="font-san text-6xl text-red-600">404</h1>
        <h1 className="font-semibold text-6xl text-red-600">{error.message}</h1>
      </div>
      <button
        onClick={reset}
        className="btn-retry p-3 w-[100px] h-[50px] outline outline-red-700 rounded-lg hover:text-red-700  "
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
