import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";
import { infoPages } from "../info-content";

export const metadata: Metadata = { title: "編集方針", description: infoPages["editorial-policy"].lead };
export default function EditorialPolicyPage() { return <InfoPage pageKey="editorial-policy" />; }
