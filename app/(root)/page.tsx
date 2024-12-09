import { UserProvider } from "@/contexts/UserContext"; // นำเข้า UserProvider
import MyForm from "@/components/form";

export default function Home() {
  return (
    <UserProvider>
      {" "}
      {/* ให้ Provider ครอบคลุมแอปพลิเคชัน */}
      <MyForm />
    </UserProvider>
  );
}
