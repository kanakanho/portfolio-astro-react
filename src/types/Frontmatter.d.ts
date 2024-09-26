export type FrontmatterWork = {
  worksDisplay: boolean;
  worksIsLarge: boolean;
  worksTitle: string;
  worksDescription: string;
  worksImage: string;
};

type Frontmatter = {
  isActive: boolean;
  number: string;
  title: string;
  date: string;
  tags: string[];
  options?: {
    description?: string;
    repository?: string;
    youtube?: string;
    website?: string;
    image?: string;
  };
  works?: FrontmatterWorks;
};

export default Frontmatter;
