import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ประเภทของข้อมูลที่ใช้
type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  idNumber: string;
  memberNo: string;
  address: string;
};

const readDataFromFile = (): User[] => {
  try {
    const filePath = path.resolve("data/db.json");
    const data = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData.users)) {
      throw new Error("Invalid data format: Expected an array of users.");
    }

    return parsedData.users; // ดึงข้อมูลจาก users
  } catch (error: unknown) {
    console.error("Error reading db.json:", error);
    throw new Error("Failed to read data from db.json");
  }
};

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
    // อ่านข้อมูลจาก db.json
    const dataUser = readDataFromFile();

    // ค้นหาผู้ใช้ตาม memberNo
    const user = dataUser.find((user) => user.memberNo === memberNo);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ส่งข้อมูลผู้ใช้กลับไป
    return NextResponse.json(user);
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

/* export async function POST(request: Request) {
  try {
    const newUser = await request.json();

    if (!newUser.name || !newUser.lastname || !newUser.email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const dataUser = readDataFromFile();
    const newId = dataUser.length + 1;
    const createdUser = { id: newId, ...newUser };

    dataUser.push(createdUser);
    writeDataToFile(dataUser); // เขียนข้อมูลที่อัปเดตกลับไปยังไฟล์ db.json

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error processing POST request:", error);
      return NextResponse.json(
        { message: error.message || "Failed to create user" },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { message: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
 */
