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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-screen max-w-full px-4">
      <div className="text-center col-span-1 md:col-span-12 lg:col-span-12">
        <div className="bg-gray-200 rounded-2xl mb-6 p-8 w-full shadow-xl">
          <div className="flex flex-col space-y-6 mx-7 py-5 ">
            {[
              { label: Thai.Device_Id, value: appMembNo },
              { label: Thai.Device_Type, value: appCoopCode },
              { label: Thai.Brand, value: devcUniqueUid },
              { label: Thai.DeviceModel, value: devcPlatform },
              { label: Thai.DeviceSerial, value: devcPlatformVer },
              { label: Thai.Device_Status, value: devcModel },
              { label: Thai.DevcManufacturer, value: devcManufacturer },
              { label: Thai.DevcSerialNo, value: devcSerialNo },
              { label: Thai.DevcIsVirtual, value: devcIsVirtual },
              { label: Thai.DevcFcmId, value: devcFcmId },
              { label: Thai.DevcRegDate, value: devcRegDate },
              { label: Thai.DevcLastUsed, value: devcLastUsed },
              { label: Thai.DevcCountUsed, value: devcCountUsed },
              { label: Thai.DevcUsageStatus, value: devcUsageStatus },
              { label: Thai.DevcPriority, value: devcPriority },
              { label: Thai.DevcPubKey, value: devcPubKey },
              { label: Thai.SevrPvtKey, value: sevrPvtKey },
            ].map(({ label, value }, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between items-center space-y-4"
              >
                <div className="w-full md:w-1/2 flex justify-start">
                  <span className="font-semibold text-lg text-gray-800 divide divide-x-2">
                    {label || "Label"}:
                  </span>
                </div>
                <div className="w-full md:w-1/2 flex justify-start md:justify-end">
                  <span className="w-full md:text-end text-gray-600 line-clamp-4 text-start">
                    {value || "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
