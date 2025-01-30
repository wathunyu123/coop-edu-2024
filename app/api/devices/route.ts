import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Device = {
  appMemberNo: string;
  appCoopDode: string;
  devcUniqueUid: string;
  devcPlatform: string;
  devcPlatformVer: string;
  devcModel: string;
  devcManufacturer: string;
  devcSerialNo: string;
  devcIsVirtual: string;
  devcFcmId: string;
  devcRegDate: string;
  devcLastUsed: string;
  devcCountUsed: string;
  devcUsageStatus: string;
  devcPriority: string;
  devcPubKey: string;
  sevrPvtKey: string;
};

const readDataFromFile = async (): Promise<any> => {
  try {
    const filePath = path.resolve("data/loing_devices.json");

    const data = await fs.promises.readFile(filePath, "utf8");

    const parsedData = JSON.parse(data);

    if (!parsedData.data || !parsedData.data.device) {
      throw new Error("Invalid data format: Missing profile information.");
    }
    return parsedData.data.device;
  } catch (error: unknown) {
    console.error("Error reading data:", error);
    throw new Error("Failed to read data");
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appMemberNo = searchParams.get("appMemberNo");

  if (!appMemberNo) {
    return NextResponse.json(
      { error: "appMemberNo is required" },
      { status: 400 }
    );
  }

  try {
    const device = await readDataFromFile();

    if (device.appMemberNo !== appMemberNo) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    return NextResponse.json(device);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
