import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";
import { infoPages } from "../info-content";

export const metadata: Metadata = { title: "プライバシーポリシー", description: infoPages.privacy.lead };
export default function PrivacyPage() { return <InfoPage pageKey="privacy" />; }
