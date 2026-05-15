import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import infoAPP from "@/lib/infoapp";

export const metadata: Metadata = {
  title: `${infoAPP.name}`,
  description: infoAPP.description,
  metadataBase: new URL('https://smartplant.app.br'),
  openGraph: {
    title: infoAPP.name,
    description: infoAPP.description,
    url: infoAPP.url,
    siteName: infoAPP.name,
    images: [
      {
        url: `${infoAPP.url}/images/Opengraph.png`,
        width: 1200,
        height: 630,
        alt: infoAPP.name,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: infoAPP.name,
    description: infoAPP.description,
    images: [`${infoAPP.url}/images/Opengraph.png`],
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
    </>
  );
}

