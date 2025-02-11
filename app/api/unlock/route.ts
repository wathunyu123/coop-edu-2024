import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

type Unlock = {
  memberNo: String;
  device: string;
  account: string;
};

const readDataFromFile = async (): Promise<Unlock | null> => {
  try {
    const filePath = path.resolve("data/unlock.json");
    const data = await fs.promises.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);

    if (!parsedData || !parsedData.data) {
      throw new Error("Invalid data format: Missing profile information.");
    }
    return parsedData.data;
  } catch (error: unknown) {
    console.error("Error reading data", error);
    if (error instanceof SyntaxError) {
      throw new Error("Error Invalid JSON format in unlock.json");
    }
    throw new Error("Failed to read data");
  }
};

// ฟังก์ชัน GET ที่ใช้ใน API Route
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
    const unlockData = await readDataFromFile();

    if (unlockData?.memberNo !== memberNo) {
      return NextResponse.json({ message: "Data Not Found" }, { status: 404 });
    }

    // ส่งข้อมูลกลับเมื่อพบข้อมูล
    return NextResponse.json(unlockData);
  } catch (error: unknown) {
    // หากเกิดข้อผิดพลาด
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
