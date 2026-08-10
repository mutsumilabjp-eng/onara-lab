import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";
import { infoPages } from "../info-content";

export const metadata: Metadata = { title: "免責事項", description: infoPages.disclaimer.lead };
export default function DisclaimerPage() { return <InfoPage pageKey="disclaimer" />; }
