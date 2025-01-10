import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

// กำหนดประเภทข้อมูล Device
type Device = {
  device_id: string;
  device_type: string;
  brand: string;
  model: string;
  serial_number: string;
  status: string;
};

type DeviceChange = {
  memberNo: string;
  new_device: Device;
};

// ฟังก์ชันสำหรับอ่านข้อมูลจากไฟล์ JSON และแปลงเป็นอาเรย์ของ DeviceChange
const readDataFromFile = (): { memberNo: string; new_device: Device }[] => {
  try {
    const filePath = path.join(process.cwd(), "data/device.json"); // ใช้ process.cwd() แทน __dirname ใน Next.js
    const rawData = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(rawData);

    // ตรวจสอบว่า parsedData มีรูปแบบที่ถูกต้อง
    if (!Array.isArray(parsedData.device_changes)) {
      console.error("Invalid data format in file");
      return [];
    }

    return parsedData.device_changes;
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return []; // คืนค่าอาเรย์ว่างในกรณีที่มีข้อผิดพลาด
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const memberNo = searchParams.get("id");

  console.log("Received memberNo:", memberNo); // ตรวจสอบค่าที่ได้รับจาก query string

  if (!memberNo) {
    return NextResponse.json(
      { message: "Member number is required" },
      { status: 400 }
    );
  }

  try {
    const dataDeviceChanges = readDataFromFile();
    console.log("dataDeviceChanges:", dataDeviceChanges); // ตรวจสอบข้อมูล

    if (!Array.isArray(dataDeviceChanges)) {
      return NextResponse.json(
        { message: "Invalid data format in file" },
        { status: 500 }
      );
    }

    // ใช้ trim() เพื่อลบช่องว่างจาก memberNo ทั้งใน URL และใน JSON
    const deviceChange = dataDeviceChanges.find(
      (change) => change.memberNo.trim() === memberNo.trim()
    );

    console.log("Found deviceChange:", deviceChange); // ตรวจสอบค่าที่พบ

    if (!deviceChange) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(deviceChange.new_device);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
