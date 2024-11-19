import Container from "@/components/container";
import IDbox from "@/components/idnumberbox";
import Menu from "@/components/menu";
import Thai from "@/dictionary/thai";

export default function ChangeEM() {
    return (
        <Container>
            <>
                <IDbox />
                <Menu />
            </>

            <div className="flex items-center mt-5">
                <div className="flex flex-col bg-blue-400 px-36 py-14 mt-1 rounded-2xl">

                    <div className="mb-4">
                        <h1 className="text-white text-lg text-center">
                            {Thai.NumberEM}
                        </h1>
                    </div>


                    <div className="bg-white px-40 py-4 rounded-lg shadow-md -mx-20">

                    </div>
                </div>
            </div>



        </Container>
    );
}