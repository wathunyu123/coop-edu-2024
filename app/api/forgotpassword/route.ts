import { NextResponse } from "next/server";

// กำหนดประเภทของข้อมูลใน users โดยใช้ Record<string, { contact: string }>
const users: Record<string, { contact: string }> = {
  "22115": { contact: "0812345678" },
  "123": { contact: "0898765432" },
  // เพิ่มสมาชิกอื่นๆ
};

export async function POST(req: Request) {
  const { memberNo, preferredMethod } = await req.json();

  console.log("memberNo:", memberNo);
  console.log("preferredMethod:", preferredMethod);

  if (!memberNo || !preferredMethod) {
    return NextResponse.json(
      { status: "error", message: "Missing required parameters" },
      { status: 400 }
    );
  }

  const user = users[memberNo];
  if (!user) {
    return NextResponse.json(
      { status: "error", message: "User not found" },
      { status: 404 }
    );
  }

  const newPassword = memberNo;

  if (preferredMethod === "screen") {
    return NextResponse.json({
      status: "success",

      message: `รหัสผ่านคือ: ${newPassword}`,
    });
  } else if (preferredMethod === "sms") {
    return NextResponse.json({
      status: "success",
      message: "รหัสผ่านถูกส่งไปยัง SMS เรียบร้อย",
    });
  } else {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid preferred method or missing contact information.",
      },
      { status: 400 }
    );
  }
}
