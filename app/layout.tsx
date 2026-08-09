import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "おなら研究所｜確認用",
  description: "おなら・放屁・腸内ガスの疑問を調べる専門メディアの確認版。",
  robots: { index: false, follow: false },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
