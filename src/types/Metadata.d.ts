export type ImageType =
  | "image/jpeg"
  | "image/gif"
  | "image/png"
  | "image/svg+xml"
  | "image/tiff"
  | "image/webp";

type Metadata = {
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
    imageType?: ImageType;
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
    imageType?: ImageType;
    imageWidth?: number;
    imageHeight?: number;
    image?: string;
  };
};

export default Metadata;
