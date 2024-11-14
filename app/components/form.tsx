import Home from "../(root)/page"
export default function My_form() {
    return (
        <div className="flex flexcol items-center justify-center min-h-screen py-2">
            <>
                <title>

                </title>
            </>

            <main className="flex flex-col items-center justify-ceny=ter w-full flex-1 px-20 text-center">
                <div className="bg-slate-300 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl ">
                    <div className="w-3/5 p-5">
                        <div className="py-10 text-2xl font-bold text-black text-left ">
                            <h2 className="pb-5">
                                รหัสสมาชิก
                            </h2>
                            <h2 className="pb-5">
                                ชื่อ - สกุล
                            </h2>
                            <h2 className="pb-5">
                                เลขที่ประชาชน
                            </h2>
                            <h2>
                                เบอร์โทรศัพท์
                            </h2>

                        </div>
                        <a href="/" className="py-10 text-2xl font-bold shadow-2xl text-right ml-72 text-white p-3 pt-2 pb-2 rounded-xl bg-blue-500">
                            Next
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}