import type Metadata from "@/types/Metadata";

const DefaultMetadata: Metadata = {
  title: "kanakanho's Portfolio",
  description: "kanakanho のポートフォリオサイトです",
  applicationName: "kanakanho's Portfolio",
  authors: ["kanakanho"],
  keywords: ["kanakanho", "プロフィール", "愛知工業大学"],
  category: "website",
  openGraph: {
    title: "kanakanho's Portfolio",
    description: "kanakanho のポートフォリオサイトです",
    siteName: "kanakanho's Portfolio",
    url: "https://kanakanho.dev",
    type: "website",
    imageAlt: "kanakanho's icon",
    image: "/icon.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Shiba_ao_",
    creator: "@Shiba_ao_",
    description: "kanakanho のポートフォリオサイトです",
    imageType: "image/png",
    image: "/icon.png",
  },
};

export default DefaultMetadata;
