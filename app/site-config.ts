export const siteConfig = {
  name: "おなら研究所",
  description: "おなら・放屁・腸内ガスの疑問を、科学・医学・生活の視点から整理する専門メディア。",
  url: "https://onara-lab.com",
  isPublicRelease: true,
  updatedAt: "2026-08-15",
} as const;

export const releaseLabel = siteConfig.isPublicRelease ? "公開中" : "暫定公開準備中";
