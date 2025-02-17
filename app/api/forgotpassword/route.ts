import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// สำหรับ HTTP GET method
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const memberNo = searchParams.get("memberNo");
  const preferred_method = searchParams.get("preferred_method");

  if (
    !memberNo ||
    !preferred_method ||
    typeof memberNo !== "string" ||
    typeof preferred_method !== "string"
  ) {
    return NextResponse.json(
      {
        status: {
          code: 1,
          description: "MISSING_REQUIRED_FIELDS",
        },
        message: "Member number and preferred method are required.",
      },
      { status: 400 }
    );
  }

  try {
    const filePath = path.resolve(process.cwd(), "data/forgotpassword.json");

    // อ่านไฟล์ JSON
    const fileData = fs.readFileSync(filePath, "utf-8");

    let data;
    try {
      data = JSON.parse(fileData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return NextResponse.json(
        {
          status: {
            code: 3,
            description: "INTERNAL_SERVER_ERROR",
          },
          message: "An error occurred while parsing the JSON file.",
        },
        { status: 500 }
      );
    }

    // ตรวจสอบว่า memberNo ตรงกันหรือไม่
    if (data.forgot_password_request.memberNo !== memberNo) {
      return NextResponse.json(
        {
          status: {
            code: 2,
            description: "USER_NOT_FOUND",
          },
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // สร้างข้อมูลที่ต้องการตอบกลับ
    const response = {
      status: {
        code: 0,
        description: "QUERY_NEWPASSWORD_SUCCESS",
      },
      forgot_password_request: {
        memberNo,
        preferred_method,
        request_date: data.forgot_password_request.request_date,
      },
      response: {
        memberNo,
        status: "success",
        message:
          "If this email/phone is associated with an account, a password reset link has been sent.",
        preferred_method,
        sent_to:
          preferred_method === "sms"
            ? data.response.sent_to
            : "your-email@example.com",
        response_date: data.response.response_date,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error reading the JSON file:", error);
    return NextResponse.json(
      {
        status: {
          code: 3,
          description: "INTERNAL_SERVER_ERROR",
        },
        message: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
