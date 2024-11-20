import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Menu from "@/components/menu";
import Thai from "@/dictionary/thai";

export default function OTP() {
    return (

        <Container>
            <IDbox />
            <Menu />
            <Container className="flex flex-col items-start justify-start">

                <div className="bg-gray-200 w-full px-6 py-10 mt-5 rounded-2xl">
                    <div className="flex flex-col items-start gap-5 mx-3 my-2">
                        <div className="flex flex-col w-auto max-w-4xl bg-blue-400 px-16 py-2 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-4">{Thai.Status}</h1>
                            <div className="bg-white px-10 py-1 rounded-lg shadow-md">
                                {Thai.Notify_status}
                            </div>
                        </div>

                        <div className="flex flex-col w-auto max-w-4xl bg-blue-400 px-16 py-2 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-4">{Thai.Status}</h1>
                            <div className="bg-white px-10 py-1 rounded-lg shadow-md">
                                {Thai.Notify_status}
                            </div>
                        </div>

                        <div className="flex flex-col w-auto max-w-4xl bg-blue-400 px-16 py-2 rounded-2xl text-center">
                            <h1 className="text-white text-lg mb-4">{Thai.Status}</h1>
                            <div className="bg-white px-10 py-1 rounded-lg shadow-md">
                                {Thai.Notify_status}
                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </Container>
    )
}