import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";
import { infoPages } from "../info-content";

export const metadata: Metadata = { title: "サイトについて", description: infoPages.about.lead };
export default function AboutPage() { return <InfoPage pageKey="about" />; }
