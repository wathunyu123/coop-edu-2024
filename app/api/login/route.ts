import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// ฟังก์ชันที่ใช้ดึงข้อมูลโปรไฟล์จากไฟล์ JSON
const getProfileFromFile = async () => {
  const filePath = path.join(process.cwd(), "data", "profile.json");
  const data = await fs.promises.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  return parsedData.data.profile;
};

export async function POST(req: Request) {
  try {
    // รับข้อมูลจากผู้ใช้
    const { memberNo, password } = await req.json();
    console.log("Request data:", memberNo, password);

    if (!memberNo || !password) {
      return NextResponse.json(
        { message: "กรุณากรอกชื่อผู้ใช้และเลขสมาชิก" },
        { status: 400 }
      );
    }

    // ดึงข้อมูลโปรไฟล์จากไฟล์ JSON
    const profile = await getProfileFromFile();
    console.log("Profile loaded from file:", profile);

    // กำหนดรหัสผ่านที่ต้องการ (ไม่ต้องเปลี่ยนใน profile.json)
    const correctPassword = "1234"; // กำหนดรหัสผ่านที่ต้องการตรงนี้

    // เปรียบเทียบเลขสมาชิกและรหัสผ่าน
    if (profile.memberNo === memberNo && password === correctPassword) {
      const secretKey = process.env.JWT_SECRET_KEY;
      console.log("Secret Key:", secretKey); // แสดงค่า JWT_SECRET_KEY
      if (!secretKey) {
        throw new Error("JWT_SECRET_KEY is not defined");
      }

      // สร้าง JWT Token
      const token = jwt.sign(
        { memberName: profile.memberName, memberNo: profile.memberNo },
        secretKey,
        { expiresIn: "1h" }
      );

      // ส่งผลลัพธ์กลับไป
      return NextResponse.json(
        {
          status: { code: 0, description: "LOGIN_FOR_STAFF_SUCCESS" },
          data: { token },
        },
        { status: 200 }
      );
    } else {
      // ถ้าผู้ใช้ไม่พบ หรือรหัสผ่านไม่ถูกต้อง
      return NextResponse.json(
        { message: "ชื่อผู้ใช้หรือเลขสมาชิกไม่ถูกต้อง" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการล็อกอิน", error: errorMessage },
      { status: 500 }
    );
  }
}
