import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";
import { infoPages } from "../info-content";

export const metadata: Metadata = { title: "お問い合わせ", description: infoPages.contact.lead };
export default function ContactPage() { return <InfoPage pageKey="contact" />; }
