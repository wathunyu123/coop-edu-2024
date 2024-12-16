"use client";
import { usePathname } from "next/navigation";

export default function Search() {
  const pathname = usePathname();

  const isActive = (paths: string[]) =>
    paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  return (
    <div className="grid grid-col-12 col-span-4 col-end-9 mx-auto">
      <div className="flex max-w-full bg-white p-3 my-5">search</div>
    </div>
  );
}
