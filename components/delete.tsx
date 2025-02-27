// pages/delete.tsx
import { AccordionItem } from "@/components/accordion";
import Menucheng from "@/components/menucheng";
import Thai from "@/dictionary/thai"; // import ค่า Thai.More จากไฟล์ dictionary
import { AccordionProvider } from "@/contexts/accordioncontext";
import { Accordion } from "@/components/accordion";
import { ReactNode } from "react";

interface IsAccordionProps {
  children: ReactNode;
}

export default function IsAccordion({ children }: IsAccordionProps) {
  return (
    <AccordionProvider>
      <Accordion>
        <AccordionItem title={Thai.More} id="1" type="fade">
          <div className="flex flex-col py-6 min-w-full ">
            <div className="divide-y divide-slate-500 px-6">
              <div className="py-3">
                <Menucheng />
              </div>
              {children}
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </AccordionProvider>
  );
}
