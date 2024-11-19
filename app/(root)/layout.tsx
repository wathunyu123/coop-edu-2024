import Navbar from "@/components/navbar"
import Container from "@/components/container"
import Menu from "@/components/menu"


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="font-work-sans">
            <Navbar />
            <Container children={undefined} />


            {children}
        </main>

    )
}

