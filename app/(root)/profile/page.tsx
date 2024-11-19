import Container from "@/components/container";
import React from "react";
import Thai from "@/dictionary/thai";
import { LiaSearchPlusSolid } from "react-icons/lia";
import Menu from "@/components/menu";
import Link from "next/link";
import IDbox from "@/components/idnumberbox";
import Image from "next/image";

export default function Profile() { // เปลี่ยนชื่อฟังก์ชันเป็นตัวพิมพ์ใหญ่
    return (
        <Container>
            <div>
                <IDbox />
                <Menu />
            </div>

            <div className="flex bg-gray-200 px-52 py-72 mt-10 rounded-2xl justify-between items-center">
                <div className="-my-32">
                    <div className="bg-white px-24 py-28 ">
                        <Image src="" alt=""></Image>
                    </div>
                </div>

                <div className="flex flex-col items-center -my-32 ">
                    <div className="bg-white px-52 py-3 mb-5">

                    </div>
                    <div className="bg-white px-52 py-3 mb-5">

                    </div>
                    <div className="bg-white px-52 py-3 mb-5">

                    </div>
                    <div className="bg-white px-52 py-3 mb-5">

                    </div>
                    <div className="bg-white px-52 py-3 mb-5">

                    </div>
                    <div className="bg-white px-52 py-3 mb-5">

                    </div>
                </div>

            </div>
        </Container>
    );
}
