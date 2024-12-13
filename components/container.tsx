import React, { ReactNode } from 'react';
import classNames from 'classnames'; // สามารถใช้ classnames เพื่อง่ายต่อการจัดการ class

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex flex-col max-w-7xl min-h-screen mx-auto ">
      {children}
    </div>
  );
}

