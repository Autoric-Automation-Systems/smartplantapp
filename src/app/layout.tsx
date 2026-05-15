import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import Providers from "./providers";
import infoAPP from "@/lib/infoapp";
import { Metadata } from "next";
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${infoAPP.name}`,
    default: infoAPP.name,
  },
  description: infoAPP.description,
  metadataBase: new URL('https://smartplant.app.br'),
  openGraph: {
    title: infoAPP.name,
    description: infoAPP.description,
    url: infoAPP.url,
    siteName: infoAPP.name,
    images: [{ url: `${infoAPP.url}/images/Opengraph.png` }],
  },

  twitter: {
    card: "summary_large_image",
    site: `@${infoAPP.name}`,
    title: infoAPP.name,
    description: infoAPP.description,
    images: `${infoAPP.url}/images/Opengraph.png`,
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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}