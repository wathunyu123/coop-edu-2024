import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

type Pin = {
  memberNo: string;
  pinAttempts: number;
  pinStatus: string;
};

// ฟังก์ชันอ่านข้อมูลจากไฟล์
const readDataFromFile = (): Pin[] => {
  try {
    const filePath = path.resolve("data/pin_data.json");
    const data = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(data);

    // ตรวจสอบว่า parsedData มีฟิลด์ 'otp&pin' หรือไม่
    if (!Array.isArray(parsedData["otp&pin"])) {
      throw new Error("Invalid data format: Expected an array of otp&pin.");
    }

    // คืนค่า parsedData["otp&pin"]
    return parsedData["otp&pin"];
  } catch (error: unknown) {
    console.error("Error reading pin_data.json", error);
    throw new Error("Failed to read data from pin_data.json");
  }
};

// API handler สำหรับ GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const memberNo = searchParams.get("id");

  if (!memberNo) {
    return NextResponse.json(
      { message: "Member number is required" },
      { status: 400 }
    );
  }

  try {
    const dataPin = readDataFromFile();

    // หาผู้ใช้จาก memberNo
    const pin = dataPin.find((pin) => pin.memberNo === memberNo);

    if (!pin) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(pin);
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
