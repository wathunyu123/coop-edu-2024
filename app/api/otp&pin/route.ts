import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

type Pin = {
  memberNo: string;
  pinAttempts: number;
  pinStatus: string;
};

const readDataFromFile = async (): Promise<Pin | null> => {
  try {
    const filePath = path.resolve("data/pin_data.json");
    const data = await fs.promises.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);

    // ตรวจสอบว่า parsedData มี property data ที่เป็น Object
    if (!parsedData || !parsedData.data) {
      throw new Error("Invalid data format: Missing profile information.");
    }

    return parsedData.data; // return ข้อมูลที่อยู่ใน data ซึ่งเป็น Object
  } catch (error: unknown) {
    console.error("Error reading data:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Invalid JSON format in pin_data.json");
    }
    throw new Error("Failed to read data");
  }
};

export async function GET(response: Response) {
  const { searchParams } = new URL(response.url);
  const memberNo = searchParams.get("memberNo")?.trim();

  if (!memberNo) {
    return NextResponse.json(
      { message: "Member number is required" },
      { status: 400 }
    );
  }

  try {
    const pinData = await readDataFromFile();

    // ตรวจสอบว่า memberNo ที่ได้จาก query parameter ตรงกับข้อมูลใน parsedData
    if (pinData?.memberNo !== memberNo) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(pinData);
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
