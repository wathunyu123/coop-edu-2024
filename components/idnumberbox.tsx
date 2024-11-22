import Container from "./container";
import Thai from "@/dictionary/thai";
import Menu from "./menu";
import { LiaSearchPlusSolid } from "react-icons/lia";

export default function IDbox() {
    return (
        <Container>

            <div className="flex justify-start mt-10 mb-5">
                <h1 className="text-2xl font-semibold text-gray-800">{Thai.MemberNo}</h1>
            </div>


            <div className="relative">
                <input
                    type="text"
                    className="w-full max-w-md p-4 rounded-lg border border-gray-300 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter Member Number"
                />

                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
                    <LiaSearchPlusSolid size={30} className="text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out" />
                </div>
            </div>



        </Container>
    );
}
