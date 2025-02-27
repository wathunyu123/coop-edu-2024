import React, { createContext, useContext, useState, useEffect } from "react";

interface AccordionContextType {
  openAccordionId: string | null;
  setOpenAccordionId: (id: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

interface AccordionProviderProps {
  children: React.ReactNode;
}

export const AccordionProvider: React.FC<AccordionProviderProps> = ({
  children,
}) => {
  // สร้าง state เพื่อเก็บสถานะว่า code รันใน client-side หรือไม่
  const [isClient, setIsClient] = useState<boolean>(false);

  const [openAccordionId, setOpenAccordionIdState] = useState<string | null>(
    null
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedAccordionId = localStorage.getItem("openAccordionId");
      setOpenAccordionIdState(storedAccordionId);
    }
  }, [isClient]);

  useEffect(() => {
    if (openAccordionId && isClient) {
      localStorage.setItem("openAccordionId", openAccordionId);
    }
  }, [openAccordionId, isClient]);

  const setOpenAccordionId = (id: string | null) => {
    setOpenAccordionIdState(id);
  };

  return (
    <AccordionContext.Provider value={{ openAccordionId, setOpenAccordionId }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "useAccordionContext must be used within an AccordionProvider"
    );
  }
  return context;
};
