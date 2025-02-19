import { NextRequest, NextResponse } from "next/server";
import fs from "fs"; // ใช้สำหรับการอ่าน/เขียนไฟล์

// ฟังก์ชันที่ใช้ในการอ่านข้อมูลจากไฟล์
const readDataFromFile = async (filePath: string) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data); // คืนค่าข้อมูลในรูปแบบ Object
  } catch (error) {
    console.error("Error reading data:", error);
    throw new Error("Failed to read data");
  }
};

// ฟังก์ชันที่ใช้ในการเขียนข้อมูลกลับไปที่ไฟล์
const writeDataToFile = async (filePath: string, data: any) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2)); // เขียนข้อมูลในรูปแบบ JSON ที่มีการจัดรูปแบบ
  } catch (error) {
    console.error("Error writing data:", error);
    throw new Error("Failed to write data");
  }
};

// ฟังก์ชันสำหรับการลบข้อมูล
export const DELETE = async (req: NextRequest) => {
  const membNo = req.nextUrl.searchParams.get("membNo"); // ดึงค่าจาก query string

  if (!membNo) {
    return NextResponse.json(
      { message: "membNo is required" },
      { status: 400 }
    );
  }

  try {
    // ระบุ path ของไฟล์ JSON ที่ต้องการแก้ไข
    const filePath = `./data/login_devices.json`;
    console.log(`Attempting to read file from: ${filePath}`);

    // อ่านข้อมูลจากไฟล์
    const data = await readDataFromFile(filePath);

    // ตรวจสอบว่า `byMembNo` เป็น array หรือไม่
    if (!Array.isArray(data.data.devices.byMembNo)) {
      return NextResponse.json(
        { message: "Data format is not as expected" },
        { status: 400 }
      );
    }

    // กรองข้อมูลใน `byMembNo` โดยลบข้อมูลที่ตรงกับ `appMembNo`
    const filteredData = data.data.devices.byMembNo.filter(
      (item: any) => item.appMembNo !== membNo
    );

    // หากไม่มีข้อมูลที่ตรงกับ `appMembNo` ที่ต้องการลบ
    if (data.data.devices.byMembNo.length === filteredData.length) {
      return NextResponse.json(
        { message: "No matching data found to delete" },
        { status: 404 }
      );
    }

    // อัพเดตข้อมูลใน `byMembNo` ด้วยข้อมูลที่กรอง
    data.data.devices.byMembNo = filteredData;

    // เขียนข้อมูลที่เหลือกลับไปยังไฟล์
    await writeDataToFile(filePath, data);

    return NextResponse.json(
      { message: "Data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing DELETE request:", error);
    const errorMessage = (error as any).message || "Failed to process request";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
