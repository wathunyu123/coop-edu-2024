// pages/api/forgot-password.ts
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function ForgotPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { memberNo, preferred_method } = req.query;

    if (!memberNo || !preferred_method) {
      return res.status(400).json({
        status: {
          code: 1,
          description: "MISSING_REQUIRED_FIELDS",
        },
        message: "Member number and preferred method are required.",
      });
    }

    try {
      // โหลดข้อมูลจากไฟล์ JSON
      const filePath = path.join(
        process.cwd(),
        "data",
        "forgot-password-data.json"
      );
      const fileData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(fileData);

      // ค้นหาผู้ใช้จาก memberNo
      if (data.forgot_password_request.memberNo !== memberNo) {
        return res.status(404).json({
          status: {
            code: 2,
            description: "USER_NOT_FOUND",
          },
          message: "User not found.",
        });
      }

      // สร้างคำตอบที่ต้องการส่งกลับ
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

      // ส่งคำตอบกลับเป็น JSON
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error reading the JSON file:", error);
      return res.status(500).json({
        status: {
          code: 3,
          description: "INTERNAL_SERVER_ERROR",
        },
        message: "An error occurred while processing your request.",
      });
    }
  } else {
    return res.status(405).json({
      status: {
        code: 2,
        description: "METHOD_NOT_ALLOWED",
      },
      message: "Only GET method is allowed.",
    });
  }
}
