import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import Providers from "./providers";
import infoAPP from "@/lib/infoapp";
import { Metadata } from "next";
const outfit = Outfit({ subsets: ["latin"] });

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