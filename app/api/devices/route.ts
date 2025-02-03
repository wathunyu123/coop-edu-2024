import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Device = {
  appMembNo: string;
  appCoopCode: string;
  devcUniqueUid: string;
  devcPlatform: string;
  devcPlatformVer: string;
  devcModel: string;
  devcManufacturer: string;
  devcSerialNo: string;
  devcIsVirtual: string;
  devcFcmId: string;
  devcRegDate: string | object;
  devcLastUsed: string | null;
  devcCountUsed: number;
  devcUsageStatus: string;
  devcPriority: string;
  devcPubKey: string;
  sevrPvtKey: string;
};

const readDataFromFile = async (): Promise<any> => {
  try {
    const filePath = path.resolve("data/login_devices.json");

    const data = await fs.promises.readFile(filePath, "utf8");
    const parsedData = JSON.parse(data);

    if (
      !parsedData.data ||
      !parsedData.data.devices ||
      !parsedData.data.devices.byMembNo ||
      !parsedData.data.devices.byId
    ) {
      throw new Error("Invalid data format: Missing devices or byMembNo.");
    }

    return parsedData.data.devices;
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
      { error: "appMembNo is required" },
      { status: 400 }
    );
  }

  try {
    const devices = await readDataFromFile();

    const device = devices.byMembNo.find(
      (d: Device) => d.appMembNo === appMemberNo
    );

    if (!device) {
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
