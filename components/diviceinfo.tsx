// components/DeviceInfo.tsx
import Thai from "@/dictionary/thai";
import React from "react";

type DeviceInfoProps = {
  device_id: string;
  device_type: string;
  brand: string;
  model: string;
  serial_number: string;
  status: string;
  change_date: string;
};

const DeviceInfo: React.FC<DeviceInfoProps> = ({
  device_id,
  device_type,
  brand,
  model,
  serial_number,
  status,
  change_date,
}) => (
  <div className="bg-gray-200 rounded-2xl p-6">
    <div className="flex flex-col space-y-4 mx-10 py-5 ">
      <div className="flex justify-between">
        <span className="font-bold">
          {Thai.Device_Id} {":"}
        </span>
        <span>{device_id || "N/A"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">
          {Thai.Device_Type} {":"}
        </span>
        <span>{device_type || "N/A"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">
          {Thai.Brand} {":"}
        </span>
        <span>{brand || "N/A"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">
          {Thai.DeviceModel} {":"}
        </span>
        <span>{model || "N/A"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">
          {Thai.DeviceSerial} {":"}
        </span>
        <span>{serial_number || "N/A"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">
          {Thai.Device_Status} {":"}
        </span>
        <span>{status || "N/A"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">
          {Thai.ChangeDate} {":"}
        </span>
        <span>{change_date || "N/A"}</span>
      </div>
    </div>
  </div>
);

export default DeviceInfo;
