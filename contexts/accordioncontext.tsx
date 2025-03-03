import React, { createContext, useContext, useState, ReactNode } from "react";

interface AccordionContextType {
  openAccordionId: string | null; // ใช้ id หรือ null สำหรับเก็บรายการที่เปิดอยู่
  setOpenAccordionId: (id: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export const AccordionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ openAccordionId, setOpenAccordionId }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = (): AccordionContextType => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "useAccordionContext must be used within an AccordionProvider"
    );
  }
  return context;
};
