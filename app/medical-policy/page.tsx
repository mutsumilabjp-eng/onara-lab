import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";
import { infoPages } from "../info-content";

export const metadata: Metadata = { title: "医療情報の扱い", description: infoPages["medical-policy"].lead };
export default function MedicalPolicyPage() { return <InfoPage pageKey="medical-policy" />; }
