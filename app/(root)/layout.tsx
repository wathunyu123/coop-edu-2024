import Navbar from "@/components/navbar"
import Container from "@/components/container"


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="font-work-sans">
            <Navbar />
            <Container children={undefined} />


            {children}
        </main>

    )
}

