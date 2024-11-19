import Container from "./container"
import Thai from "@/dictionary/thai"
import Menu from "./menu"
import { LiaSearchPlusSolid } from "react-icons/lia"

export default function IDbox() {
    return (
        <Container>

            <div className='flex justify-start mt-16 mb-5'>
                <h1 className="">{Thai.MemberNo}</h1>
            </div>

            <div>
                <input type="text" className="w-full max-w-md p-2 rounded-xl border border-gray-200 bg-gray-200" />
            </div>

            <div className="flex justify-center -mt-10 -ml-64 pl-10">
                <a>
                    <LiaSearchPlusSolid size={40} />
                </a>
            </div>

        </Container>
    )
}