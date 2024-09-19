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
  works?: {
    worksDisplay: boolean;
    worksTitle: string;
    worksDescription: string;
    worksImage: string;
  };
};

export default Frontmatter;
