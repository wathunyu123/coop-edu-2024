import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const readDataFromFile = async (): Promise<any> => {
  try {
    const filePath = path.join(process.cwd(), "data/photo.json");

    console.log("Attempting to read file:", filePath);

    const data = await fs.promises.readFile(filePath, "utf8");
    console.log("File data read successfully:", data);

    const parsedData = JSON.parse(data);

    if (!parsedData.data || !parsedData.data.base64) {
      throw new Error("Invalid data format: Missing base64 image data.");
    }

    return parsedData.data.base64;
  } catch (error: unknown) {
    console.error("Error reading data:", error);
    throw new Error("Failed to read data");
  }
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const memberNo = searchParams.get("memberNo");

  if (!memberNo) {
    return NextResponse.json(
      { message: "Member number is required" },
      { status: 400 }
    );
  }

  try {
    const photoBase64 = await readDataFromFile();

    if (!photoBase64) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ photo: photoBase64 });
  } catch (error: unknown) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
