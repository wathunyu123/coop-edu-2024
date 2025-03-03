"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/searchbar";
import Menubar from "@/components/menubar";
import Popup from "@/components/popup";
import IsLoading from "@/components/isloading";
import ErrorPage from "@/components/404popup"; // ใช้ ErrorPage เพื่อแสดงข้อผิดพลาด
import PinInfo from "@/components/pininfo";
import { usePathname } from "next/navigation";
import { Accordion, AccordionItem } from "@/components/accordion";
import { AccordionProvider } from "@/contexts/accordioncontext";
import Thai from "@/dictionary/thai";
import UnlockPage from "../unlock/page";

export default function OtpPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false); // สถานะการโหลด
  const [fetchError, setFetchError] = useState<Error | null>(null); // ข้อผิดพลาดจากการดึงข้อมูล
  const [status, setStatus] = useState<string>("normal");
  const [pinAttempts, setPinAttempts] = useState<number>(0);
  const [memberNo, setMemberNo] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const [popupType, setPopupType] = useState<"otp" | "pin" | "editStatus">(
    "otp"
  );

  /* useEffect(() => {
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
 */
  useEffect(() => {
    const savedMemberNo = localStorage.getItem("memberNo");
    if (savedMemberNo) {
      setMemberNo(savedMemberNo);
    }
  }, []);

  useEffect(() => {
    if (!memberNo) return;

    const fetchUserData = async () => {
      setLoading(true); // เริ่มโหลด
      setFetchError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/otp&pin?memberNo=${memberNo}`
        );
        if (!response.ok) throw new Error("Device Not Found");

        const data = await response.json();
        if (!data) throw new Error("No data received");

        setStatus(data.pinStatus);
        setPinAttempts(data.pinAttempts);

        setTimeout(() => {
          setLoading(false); // เสร็จสิ้นการโหลด
        }, 1500); // ปรับเวลาได้ตามต้องการ
      } catch (error) {
        setFetchError(
          error instanceof Error ? error : new Error("Unknown error")
        );
        setLoading(false); // เสร็จสิ้นการโหลดเมื่อมีข้อผิดพลาด
      }
    };

    fetchUserData();
  }, [memberNo]);

  const resetPinAttempts = () => {
    setPinAttempts(0);
    localStorage.setItem("pinAttempts", "0");
  };

  const handleSetAppMembNo = (memberNo: string) => {
    setMemberNo(memberNo);
  };

  const getStatusMessage = (status: string) => {
    const statusMessages: Record<
      string,
      { message: string; bgColorClass: string; textColor: string }
    > = {
      normal: {
        message: "สถานะปกติ",
        bgColorClass: "bg-green-500",
        textColor: "text-white",
      },
      locked: {
        message: "บัญชีถูกล็อค",
        bgColorClass: "bg-red-500",
        textColor: "text-white",
      },
      error: {
        message: "สถานะผิดพลาด",
        bgColorClass: "bg-red-500",
        textColor: "text-white",
      },
      pending: {
        message: "สถานะรอดำเนินการ",
        bgColorClass: "bg-yellow-500",
        textColor: "text-white",
      },
    };

    return (
      statusMessages[status] || {
        message: "สถานะไม่รู้จัก",
        bgColorClass: "bg-gray-500",
        textColor: "text-white",
      }
    );
  };

  const handleClosePopup = () => setIsPopupOpen(false);

  const toggleAccordion = (
    id: string,
    mode: "normal" | "special" = "normal"
  ) => {
    setOpenItems((prevOpenItems: Set<string>) => {
      const newOpenItems = new Set(prevOpenItems);

      if (mode === "normal") {
        // ถ้ากดที่ item ที่ยังไม่เปิด จะเปิด และถ้าเปิดอันใหม่แล้วจะปิดอันเก่าด้วย
        if (newOpenItems.has(id)) {
          newOpenItems.delete(id); // ถ้ากดที่อันที่เปิดอยู่แล้วจะปิด
        } else {
          // ในกรณีนี้ เมื่อเปิด item ใหม่ จะทำการปิด item อื่น ๆ ที่เปิดอยู่แล้ว
          // ลบอันอื่นออกจาก set แล้วเปิดอันใหม่
          newOpenItems.clear(); // ลบอันที่เปิดอยู่ทั้งหมด
          newOpenItems.add(id); // เปิดแค่ item ที่เลือก
        }
      } else if (mode === "special") {
        // ในโหมด "special" ทำงานได้เหมือนกับโหมดปกติ หรือสามารถกำหนดพฤติกรรมเพิ่มเติมได้
        if (newOpenItems.has(id)) {
          newOpenItems.delete(id); // ถ้ากดที่อันที่เปิดอยู่แล้วจะปิด
        } else {
          newOpenItems.add(id); // ถ้ากดที่อันที่ปิดอยู่จะเปิด
        }
      }

      return newOpenItems;
    });
  };

  if (fetchError) {
    return (
      <div className="min-h-screen">
        <Navbar>
          <Searchbar
            setMemberNo={setMemberNo}
            setAppMembNo={handleSetAppMembNo}
          />
          <Menubar />
          <div className="grid grid-cols-12 gap-4 min-h-screen">
            <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
              <ErrorPage error={fetchError} reset={() => setFetchError(null)} />
            </div>
          </div>
        </Navbar>
      </div>
    );
  }

  const { message, bgColorClass, textColor } = getStatusMessage(status);

  return (
    <AccordionProvider>
      <Navbar>
        <Searchbar
          setMemberNo={setMemberNo}
          setAppMembNo={handleSetAppMembNo}
        />
        <Menubar />

        <div className="bg-gray-300 p-6 my-5 rounded-2xl w-full">
          <Accordion>
            <AccordionItem
              title={Thai.MobileApp}
              id="3"
              type="fade"
              isOpen={openItems.has("3")}
              toggleAccordion={() => toggleAccordion("3", "normal")}
            >
              <div className="w-full">
                <div className="grid grid-cols-12 gap-4 h-auto">
                  <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12 ">
                    {loading ? (
                      <IsLoading />
                    ) : (
                      <Suspense fallback={<IsLoading />}>
                        <PinInfo
                          pinAttempts={pinAttempts}
                          status={status}
                          resetPinAttempts={resetPinAttempts}
                        />
                      </Suspense>
                    )}

                    {/* Popup Component */}
                    <Popup
                      isOpen={isPopupOpen}
                      onClose={handleClosePopup}
                      type={popupType}
                      status={status}
                      phoneNumber=""
                      deviceStatus="someDeviceStatus"
                      accountStatus="someAccountStatus"
                    />
                  </div>
                </div>

                {isPopupOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50"></div>
                )}
              </div>
            </AccordionItem>
            <AccordionItem
              title={Thai.unlock}
              id="4"
              type="fade"
              isOpen={openItems.has("4")}
              toggleAccordion={() => toggleAccordion("4", "normal")}
            >
              <div>
                <UnlockPage />
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </Navbar>
    </AccordionProvider>
  );
}
