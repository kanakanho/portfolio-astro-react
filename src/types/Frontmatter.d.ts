import type { ImageMetadata } from "astro";

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
};

export default Frontmatter;
