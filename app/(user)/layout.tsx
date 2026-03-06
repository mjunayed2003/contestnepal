// app/(user)/layout.tsx
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
        {children}
      <Footer />
    </>
  );
}