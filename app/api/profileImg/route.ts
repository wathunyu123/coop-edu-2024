import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ฟังก์ชันสำหรับอ่านข้อมูลจากไฟล์
const readDataFromFile = async (): Promise<any> => {
  try {
    const filePath = path.resolve("data/photo.json");

    const data = await fs.promises.readFile(filePath, "utf8");

    const parsedData = JSON.parse(data);

    // ตรวจสอบว่า parsedData มีข้อมูลในรูปแบบที่ถูกต้อง
    if (!parsedData.data || !parsedData.data.base64) {
      throw new Error("Invalid data format: Missing base64 image data.");
    }

    return parsedData.data.base64; // ส่งคืนค่า base64 ของรูปภาพ
  } catch (error: unknown) {
    console.error("Error reading data:", error);
    throw new Error("Failed to read data");
  }
};

// ฟังก์ชันสำหรับจัดการการตอบกลับของ HTTP GET
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const memberNo = searchParams.get("memberNo");

  // เช็คว่า memberNo ถูกส่งมาหรือไม่
  if (!memberNo) {
    return NextResponse.json(
      { message: "Member number is required" },
      { status: 400 }
    );
  }

  try {
    // อ่านข้อมูลจากไฟล์
    const photoBase64 = await readDataFromFile();

    // ตรวจสอบว่า memberNo ตรงกับที่ต้องการหรือไม่ (ในกรณีนี้ไม่ได้ใช้ memberNo ใน JSON)
    if (!photoBase64) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ส่งข้อมูลรูปภาพที่แปลงเป็น base64 กลับไป
    return NextResponse.json({ photo: photoBase64 });
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
