import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Delete = {
  coopCode: string;
  membNo: string;
  userId: string;
  devcUniqueUids: string;
  bDelAllMembDevices: number;
};

const readDataFromFile = async (): Promise<any> => {
  try {
    const filePath = path.resolve("data/delete.json");
    const data = await fs.promises.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);

    console.log("Parsed Data:", parsedData);

    if (!parsedData || !parsedData.status || !parsedData.data) {
      throw new Error("Invalid data format or empty data");
    }

    return parsedData.data;
  } catch (error: unknown) {
    console.error("Error reading data:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Invalid JSON format in delete.json");
    }
    throw new Error("Failed to read data");
  }
};

// ฟังก์ชันหลักที่ใช้ในการจัดการคำขอ DELETE
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const membNo = searchParams.get("membNo")?.trim();

  if (!membNo) {
    return NextResponse.json(
      { message: "Member number is required" },
      { status: 400 }
    );
  }

  try {
    const deleteDv = await readDataFromFile();

    const matchingData = deleteDv.membNo === membNo ? deleteDv : null;

    if (!matchingData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(matchingData);
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
