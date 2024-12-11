import Container from "@/components/container";
import Menu from "@/components/menu";
import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Container children={undefined} />

      {children}
    </main>
  );
}
