import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PopupWidget } from "./components/PopupWidget";
import infoAPP from "@/lib/infoapp";

export const metadata: Metadata = {
  title: `${infoAPP.name}`,
  description: infoAPP.description,
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
      {/*<PopupWidget /> */}
    </>
  );
}

