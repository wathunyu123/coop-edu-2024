import { useState } from "react";
import { ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prve) => !prve);
  };

  return (
    <div>
      <div
        onClick={toggleAccordion}
        className="cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 rounded-xl my-2"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50 outline outline-none rounded-xl">
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ children }: { children: ReactNode }) => {
  return <div className="w-full max-w-xl mx-auto">{children}</div>;
};

export { Accordion, AccordionItem };
