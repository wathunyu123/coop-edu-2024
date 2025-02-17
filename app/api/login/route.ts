import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// ฟังก์ชันสำหรับดึงข้อมูลจากไฟล์ profile.json
const getProfileFromFile = async () => {
  const filePath = path.join(process.cwd(), "data", "profile.json"); // ใช้ path ที่สัมพันธ์กับ root ของโปรเจกต์
  const data = await fs.promises.readFile(filePath, "utf-8"); // อ่านไฟล์ profile.json
  const parsedData = JSON.parse(data); // แปลงข้อมูลจาก JSON เป็นอ็อบเจกต์
  return parsedData.data.profile; // คืนค่าข้อมูลโปรไฟล์
};

export async function POST(req: Request) {
  try {
    const { memberName, memberNo } = await req.json(); // รับข้อมูลจาก request
    console.log("Request data:", memberName, memberNo); // แสดงข้อมูลที่ได้รับจากผู้ใช้

    // ตรวจสอบว่าได้รับข้อมูลครบถ้วนหรือไม่
    if (!memberName || !memberNo) {
      return NextResponse.json(
        { message: "กรุณากรอกชื่อผู้ใช้และเลขสมาชิก" },
        { status: 400 }
      );
    }

    // ดึงข้อมูลผู้ใช้จากไฟล์ JSON
    const profile = await getProfileFromFile();
    console.log("Profile loaded from file:", profile); // แสดงข้อมูลที่ดึงมา

    // ตรวจสอบการจับคู่ชื่อและเลขสมาชิก
    if (profile.memberName === memberName && profile.memberNo === memberNo) {
      // ตรวจสอบว่า JWT_SECRET_KEY ถูกกำหนดหรือไม่
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
      // ถ้าผู้ใช้ไม่พบ
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
