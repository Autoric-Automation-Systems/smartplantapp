import { Hero } from "./sections/Hero";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import { Modules } from "./sections/Modules";
import { Integrations } from "./sections/Integrations";
import { Trends } from "./sections/Trends";
import { Mobile } from "./sections/Mobile";

export const metadata: Metadata = {
  title: "Home",
  description: infoAPP.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <Mobile />
      <Trends />
      <Modules />
      <Integrations />
    </>
  )
}
