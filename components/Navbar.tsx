import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    return (
        <header className="px-5 py-2 bg-blue-200 shadow-sm font-work-sans">
            <nav className="flex items-center justify-between font-bold">

                <Link href="/" className="ml-10">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>
                <Link href="/" className="hover:bg-white rounded-md ml-96 p-1">
                    <h1>Home</h1>
                </Link>

                <Link href="/check_status" className="hover:bg-white rounded-md mr-96 p-1">
                    <h1>ตรวจสอบสถานะ</h1>
                </Link>
                <Link href="/check_status" className="mr-10 ">
                    <h1><FaUserCircle /></h1>
                </Link>

            </nav>
        </header>
    )
}

export default Navbar