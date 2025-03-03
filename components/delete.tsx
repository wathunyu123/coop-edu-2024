"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { AccordionItem } from "@/components/accordion";
import { AccordionProvider } from "@/contexts/accordioncontext";
import { Accordion } from "@/components/accordion";
import ProfileImage from "@/components/profileimage";
import Thai from "@/dictionary/thai";
import Menucheng from "./menucheng";

interface IsAccordionProps {
  children: ReactNode;
  memberNo: string;
}

export default function IsAccordion({ children, memberNo }: IsAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedState = localStorage.getItem("accordionState");
    if (savedState) {
      setOpenItems(new Set(JSON.parse(savedState)));
    }
  }, []);

  // บันทึกสถานะของ openItems ใน localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    if (openItems.size > 0) {
      localStorage.setItem(
        "accordionState",
        JSON.stringify(Array.from(openItems))
      );
    } else {
      localStorage.removeItem("accordionState"); // ลบข้อมูลเมื่อไม่มีการเปิด Accordion
    }
  }, [openItems]);

  const toggleAccordion = (
    id: string,
    mode: "normal" | "special" = "normal"
  ) => {
    setOpenItems((prevOpenItems: Set<string>) => {
      const newOpenItems = new Set(prevOpenItems);

      // การทำงานของ toggle
      if (mode === "normal") {
        // ถ้าเปิดอยู่แล้วให้ปิด, ถ้ายังปิดอยู่ให้เปิดและปิดรายการอื่นๆ
        if (newOpenItems.has(id)) {
          newOpenItems.delete(id);
        } else {
          newOpenItems.clear(); // ลบการเปิดรายการทั้งหมด
          newOpenItems.add(id); // เพิ่มรายการที่เลือกให้เปิด
        }
      } else if (mode === "special") {
        // ถ้าเปิดอยู่แล้วให้ปิด, ถ้ายังปิดอยู่ให้เปิด โดยไม่ลบรายการอื่นๆ
        if (newOpenItems.has(id)) {
          newOpenItems.delete(id);
        } else {
          newOpenItems.add(id);
        }
      }

      return newOpenItems;
    });
  };

  return (
    <AccordionProvider>
      <Accordion>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="h-auto w-full md:w-2/5">
            <AccordionItem
              title={Thai.ProfileImage}
              id="2"
              type="fade"
              isOpen={openItems.has("2")} // เช็คว่า item นี้เปิดหรือไม่
              toggleAccordion={() => toggleAccordion("2", "special")} // ส่งฟังก์ชัน toggle
            >
              <ProfileImage memberNo={memberNo} />
            </AccordionItem>
          </div>
          <div className="h-auto w-full md:w-3/4">
            <AccordionItem
              title={Thai.Data}
              id="1"
              type="fade"
              isOpen={openItems.has("1")} // เช็คว่า item นี้เปิดหรือไม่
              toggleAccordion={() => toggleAccordion("1", "special")} // ส่งฟังก์ชัน toggle
            >
              <div className="flex flex-col py-6 min-w-full">
                <div className="divide-y divide-slate-500 px-6">
                  <div className="py-3">
                    <Menucheng />
                  </div>
                  {children}
                </div>
              </div>
            </AccordionItem>
          </div>
        </div>
      </Accordion>
    </AccordionProvider>
  );
}
