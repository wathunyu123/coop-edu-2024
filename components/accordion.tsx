import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { useAccordionContext } from "@/contexts/accordioncontext";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  id: string;
  type: "slide" | "fade";
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  id,
  type,
}) => {
  const { openAccordionId, setOpenAccordionId } = useAccordionContext(); // ใช้ context
  const isOpen = openAccordionId === id; // ตรวจสอบว่า Accordion นี้เปิดอยู่หรือไม่

  // toggleAccordion ใช้ setOpenAccordionId เพื่อกำหนดว่า Accordion นี้จะเปิดหรือปิด
  const toggleAccordion = () => {
    if (isOpen) {
      setOpenAccordionId(null); // ปิด Accordion ถ้าเปิดอยู่
    } else {
      setOpenAccordionId(id); // เปิด Accordion
    }
  };

  const slideTransition = {
    opacity: { duration: 0.4, ease: "easeInOut" },
    translateY: { duration: 0.4, ease: "easeInOut" },
  };

  const fadeTransition = {
    opacity: { duration: 0.4, ease: "easeInOut" },
    maxHeight: { duration: 0.6, ease: "easeInOut" },
  };

  return (
    <div className="w-full h-auto brounded-2xl">
      <div className="cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 rounded-xl my-2 flex justify-between">
        <h3 className="text-lg flex items-center font-semibold">{title}</h3>
        <div className="cursor-pointer" onClick={toggleAccordion}>
          <motion.svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
              fill="#000000"
            ></path>
          </motion.svg>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="flex py-4 my-8 bg-gray-50 outline outline-none rounded-xl"
          initial={
            type === "fade"
              ? { opacity: 0, maxHeight: 0 }
              : { opacity: 0, translateY: -20 }
          }
          animate={
            isOpen
              ? type === "slide"
                ? { opacity: 1, translateY: 0 }
                : { opacity: 1, maxHeight: "1500px" }
              : { opacity: 0 }
          }
          transition={type === "slide" ? slideTransition : fadeTransition}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export const Accordion = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
