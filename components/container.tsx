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
            className={classNames('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
        >
            {children}
        </div>
    );
};

export default Container;
