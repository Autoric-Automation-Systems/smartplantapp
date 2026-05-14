import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PopupWidget } from "./components/PopupWidget";
import infoAPP from "@/lib/infoapp";

export const metadata: Metadata = {
  title: `${infoAPP.name}`,
  description: infoAPP.description,
  metadataBase: new URL('https://smartplant.app.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
  },
  robots: {
    follow: true,
    index: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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

