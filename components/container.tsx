import React, { ReactNode } from 'react';
import classNames from 'classnames'; // สามารถใช้ classnames เพื่อง่ายต่อการจัดการ class

interface ContainerProps {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({ children, className, id, style }) => {
    return (
      <div
        id={id}
        style={style}
        className="flex justify-start items-start m-0 p-0"
      >
        {children}
      </div>
    );
};

export default Container;
