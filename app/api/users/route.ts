import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// กำหนดประเภทข้อมูลของ User
type User = {
  memberNo: string;
  memberName: string;
  memberNameEng: string;
  department: string;
  unit: string;
  jobPosition: string;
  salary: string;
  positionAllowance: string;
  otherIncome: string;
  cardId: string;
  birthDate: string;
  age: string;
  permanentAddress: string;
  presentAddress: string;
  mastTel: string;
  mastMobile: string;
  telephone: string;
  email: string;
  memberDate: string;
  memberType: string;
  memberPeriod: string;
  memberStatus: string;
  resignDate: string;
  share: string;
  cumulativeInt: string;
  shareMonthlyAmount: string;
  monthlyBillingType: string;
  dividendPaidType: string;
};

const readDataFromFile = async (): Promise<any> => {
  try {
    const filePath = path.resolve("data/profile.json");

    const data = await fs.promises.readFile(filePath, "utf8");

    const parsedData = JSON.parse(data);

    if (!parsedData.data || !parsedData.data.profile) {
      throw new Error("Invalid data format: Missing profile information.");
    }

    return parsedData.data.profile;
  } catch (error: unknown) {
    console.error("Error reading data:", error);
    throw new Error("Failed to read data");
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const memberNo = searchParams.get("memberNo");

  if (!memberNo) {
    return NextResponse.json(
      { message: "Member number is required" },
      { status: 400 }
    );
  }

  try {
    const user = await readDataFromFile();

    if (user.memberNo !== memberNo) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

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
