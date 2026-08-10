import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";
import { infoPages } from "../info-content";

export const metadata: Metadata = { title: "参考資料", description: infoPages.sources.lead };
export default function SourcesPage() { return <InfoPage pageKey="sources" />; }
