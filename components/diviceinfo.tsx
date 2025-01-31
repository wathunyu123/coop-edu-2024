// components/DeviceInfo.tsx
import Thai from "@/dictionary/thai";
import { usePathname } from "next/navigation";
import React from "react";

type DeviceInfoProps = {
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
  devcRegDate: string;
  devcLastUsed: string;
  devcCountUsed: string;
  devcUsageStatus: string;
  devcPriority: string;
  devcPubKey: string;
  sevrPvtKey: string;
};

const DeviceInfo: React.FC<DeviceInfoProps> = ({
  appMembNo,
  appCoopCode,
  devcUniqueUid,
  devcPlatform,
  devcPlatformVer,
  devcModel,
  devcManufacturer,
  devcSerialNo,
  devcIsVirtual,
  devcFcmId,
  devcRegDate,
  devcLastUsed,
  devcCountUsed,
  devcUsageStatus,
  devcPriority,
  devcPubKey,
  sevrPvtKey,
}) => {
  const pathname = usePathname();
  return (
    <div className="grid md:grid-cols-12 gap-4 min-h-screen max-w-full">
      <div className="text-center col-start-1 col-span-12 lg:col-start-1 lg:col-span-12">
        <div className="bg-gray-200 rounded-2xl p-6">
          <div className="flex flex-col space-y-4 mx-10 py-5">
            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.Device_Id || "Device Id"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{appMembNo || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.Device_Type || "Device Type"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{appCoopCode || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.Brand || "Brand"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcUniqueUid || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DeviceModel || "Device Model"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcPlatform || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DeviceSerial || "Device Serial"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">
                  {devcPlatformVer || "-"}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.Device_Status || "Device Status"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcModel || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcManufacturer || "Manufacturer"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">
                  {devcManufacturer || "-"}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcSerialNo || "Serial Number"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcSerialNo || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcIsVirtual || "Is Virtual"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcIsVirtual || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcFcmId || "FCM Id"}:
                </span>
              </div>
              <div className="text-ellipsis overflow-hidden whitespace-nowrap h-10 flex justify-end w-1/2">
                <span className="flex flex-col justify-start w-full max-h-24 overflow-auto text-end">
                  {devcFcmId || "-"}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcRegDate || "Registration Date"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcRegDate || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcLastUsed || "Last Used"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcLastUsed || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcCountUsed || "Count Used"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcCountUsed || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcUsageStatus || "Usage Status"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">
                  {devcUsageStatus || "-"}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcPriority || "Priority"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcPriority || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start">
                <span className="font-bold w-full text-start">
                  {Thai.DevcPubKey || "Public Key"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{devcPubKey || "-"}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-start ">
                <span className="font-bold w-full text-start">
                  {Thai.SevrPvtKey || "Private Key"}:
                </span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="w-full text-end">{sevrPvtKey || "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
