import type { ImageMetadata } from "astro";

export type FrontmatterWork = {
  worksDisplay?: boolean | null;
  worksIsLarge?: boolean | null;
  worksTitle?: string | null;
  worksDescription?: string | null;
  worksImage?: ImageMetadata | string | null;
};

type Frontmatter = {
  isActive: boolean;
  number: string;
  title: string;
  date: string;
  tags: string[];
  options?: {
    description?: string | null;
    repository?: string | null;
    youtube?: string | null;
    website?: string | null;
    image?: ImageMetadata | string | null;
  };
  works?: FrontmatterWorks;
};

export default Frontmatter;
