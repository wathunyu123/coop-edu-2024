import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "./accordion";
import Button from "./button";
import Thai from "@/dictionary/thai";
import Menubar from "./menubar";
import Menucheng from "./menucheng";

export default function Delete() {
  const [data, setData] = useState<any>(null); // สร้าง state สำหรับเก็บข้อมูลที่ได้รับจาก API
  const [loading, setLoading] = useState<boolean>(false); // สร้าง state สำหรับสถานะการโหลดข้อมูล
  const [error, setError] = useState<string>(""); // สร้าง state สำหรับจัดการข้อผิดพลาด
  const [membNo, setMembNo] = useState<string>("22115"); // สมมุติว่า membNo เป็นค่าเริ่มต้นที่คุณสามารถกำหนดเอง
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false); // สถานะการลบข้อมูลสำเร็จ

  // ฟังก์ชันสำหรับเรียก API
  const fetchData = async () => {
    setLoading(true); // ตั้งค่า loading เป็น true ก่อนที่ API จะเริ่มโหลด
    setError(""); // รีเซ็ตข้อผิดพลาดก่อน
    try {
      const response = await fetch(
        `http://localhost:3000/api/deleteDev?membNo=${membNo}`, // ใช้ URL ที่ถูกต้อง
        {
          method: "DELETE", // ระบุว่าใช้ HTTP method เป็น DELETE
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
      const result = await response.json();
      setData(result); // ตั้งค่าข้อมูลที่ได้รับจาก API
      setDeleteSuccess(true); // การลบข้อมูลสำเร็จ
      setTimeout(() => {
        setDeleteSuccess(false); // รีเซ็ตสถานะการลบข้อมูลสำเร็จหลังจากแสดงผล 3 วินาที
      }, 3000);
    } catch (error: any) {
      setError(error.message); // ตั้งค่า error message ถ้ามีข้อผิดพลาด
    } finally {
      setLoading(false); // ตั้งค่า loading เป็น false เมื่อโหลดข้อมูลเสร็จ
    }
  };

  const handleClick = () => {
    fetchData(); // เรียก API เมื่อกดปุ่ม
  };

  return (
    <div className="w-full h-auto p-6 bg-gray-300 mt-10 rounded-2xl ">
      <Accordion>
        <AccordionItem title="Item 1">
          <Menucheng />
        </AccordionItem>
        <AccordionItem title="Item 2">
          <Button onClick={handleClick} variant="danger" size="medium">
            {Thai.Delete}
          </Button>

          {/* แสดงสถานะการโหลด */}
          {loading && <div>Loading...</div>}

          {/* แสดงข้อความเมื่อการลบสำเร็จ */}
          {deleteSuccess && (
            <div className="text-green-500">ลบข้อมูลสำเร็จ!</div>
          )}

          {/* แสดงข้อผิดพลาดถ้ามี */}
          {error && <div className="text-red-500">Error: {error}</div>}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
