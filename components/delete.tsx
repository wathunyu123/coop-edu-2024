import React, { ReactNode } from "react";
import { AccordionItem } from "@/components/accordion";
import { AccordionProvider } from "@/contexts/accordioncontext";
import { Accordion } from "@/components/accordion";
import ProfileImage from "@/components/profileimage"; // นำเข้า ProfileImage
import Thai from "@/dictionary/thai";
import Menucheng from "./menucheng";

interface IsAccordionProps {
  children: ReactNode;
  memberNo: string; // รับ memberNo จากพ่อแม่คอมโพเนนต์
}

export default function IsAccordion({ children, memberNo }: IsAccordionProps) {
  return (
    <AccordionProvider>
      <Accordion>
        <AccordionItem title={Thai.ProfileImage} id="2" type="fade">
          <ProfileImage memberNo={memberNo} />
        </AccordionItem>

        <AccordionItem title={Thai.Data} id="1" type="fade">
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
