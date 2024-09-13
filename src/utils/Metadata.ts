export type Metadata = {
  title: string;
  description: string;
  applicationName: string;
  category: "website" | string;
  authors?: string[];
  keywords?: string[];
  themeColor?: string;
  creater?: string;
  manifest?: string;
  openGraph?: {
    title?: string;
    description?: string;
    siteName?: string;
    url?: string;
    type?: string;
    imageType?:
      | "image/jpeg"
      | "image/gif"
      | "image/png"
      | "image/svg+xml"
      | "image/tiff"
      | "image/webp";
    imageWidth?: number;
    imageHeight?: number;
    image?: string;
    imageAlt?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    site?: string;
    creator?: string;
    description?: string;
    imageType?:
      | "image/jpeg"
      | "image/gif"
      | "image/png"
      | "image/svg+xml"
      | "image/tiff"
      | "image/webp";
    imageWidth?: number;
    imageHeight?: number;
    image?: string;
  };
};

const Metadata: Metadata = {
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

export default Metadata;
