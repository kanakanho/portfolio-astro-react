import {
  type IconType as ReactSimpleIconsIconType,
  SiAstro,
  SiBiome,
  SiC,
  SiCloudflare,
  SiCloudflarepages,
  SiCloudflareworkers,
  SiCss3,
  SiDocker,
  SiEslint,
  SiFigma,
  SiFirebase,
  SiGin,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGo,
  SiHono,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiMarkdown,
  SiMinio,
  SiMiro,
  SiNeo4j,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPrettier,
  SiPwa,
  SiPython,
  SiReact,
  SiSass,
  SiScipy,
  SiStorybook,
  SiStyledcomponents,
  SiSupabase,
  SiSwift,
  SiTauri,
  SiThreedotjs,
  SiTypescript,
  SiTypst,
  SiUnity,
  SiVercel,
  SiVite,
  SiXcode,
} from "@icons-pack/react-simple-icons";
import type { ReactElement } from "react";
import type { IconType as ReactIconsIconType } from "react-icons/lib/iconBase";
import { SiAdobeaftereffects, SiAdobeillustrator } from "react-icons/si";
import styles from "./Icons.module.scss";

const IconMap: {
  [key: string]: {
    [key: string]: {
      name: string;
      icon: ReactSimpleIconsIconType | ReactIconsIconType;
      color?: string;
    };
  };
} = {
  frontend: {
    html5: {
      name: "HTML5",
      icon: SiHtml5,
    },
    css3: {
      name: "CSS3",
      icon: SiCss3,
    },
    sass: {
      name: "Sass",
      icon: SiSass,
    },
    javascript: {
      name: "JavaScript",
      icon: SiJavascript,
    },
    typescript: {
      name: "TypeScript",
      icon: SiTypescript,
    },
    nodedotjs: {
      name: "Node.js",
      icon: SiNodedotjs,
    },
    react: {
      name: "React",
      icon: SiReact,
    },
    nextdotjs: {
      name: "Next.js",
      icon: SiNextdotjs,
    },
    hono: {
      name: "Hono",
      icon: SiHono,
    },
    astro: {
      name: "Astro",
      icon: SiAstro,
    },
    vite: {
      name: "Vite",
      icon: SiVite,
    },
    tauri: {
      name: "Tauri",
      icon: SiTauri,
    },
    biome: {
      name: "Biome",
      icon: SiBiome,
    },
    eslint: {
      name: "ESLint",
      icon: SiEslint,
    },
    prettier: {
      name: "Prettier",
      icon: SiPrettier,
    },
    storybook: {
      name: "Storybook",
      icon: SiStorybook,
    },
    vercel: {
      name: "Vercel",
      icon: SiVercel,
    },
    cloudflare: {
      name: "Cloudflare",
      icon: SiCloudflare,
    },
    cloudflarepages: {
      name: "Cloudflare Pages",
      icon: SiCloudflarepages,
    },
    cloudflareworkers: {
      name: "Cloudflare Workers",
      icon: SiCloudflareworkers,
    },
    supabase: {
      name: "Supabase",
      icon: SiSupabase,
    },
    firebase: {
      name: "Firebase",
      icon: SiFirebase,
    },
    netlify: {
      name: "Netlify",
      icon: SiNetlify,
    },
    styledcomponents: {
      name: "Styled Components",
      icon: SiStyledcomponents,
    },
    threedotjs: {
      name: "Three.js",
      icon: SiThreedotjs,
    },
    pwa: {
      name: "PWA",
      icon: SiPwa,
    },
  },
  design: {
    adobeillustrator: {
      name: "Illustrator",
      icon: SiAdobeillustrator,
      color: "#FF9A00",
    },
    adobeaftereffects: {
      name: "After Effects",
      icon: SiAdobeaftereffects,
      color: "#9999FF",
    },
  },
  xr: {
    unity: {
      name: "Unity",
      icon: SiUnity,
      color: "#000000",
    },
    swift: {
      name: "Swift",
      icon: SiSwift,
    },
    xcode: {
      name: "Xcode",
      icon: SiXcode,
    },
  },
  devOps: {
    figma: {
      name: "Figma",
      icon: SiFigma,
    },
    miro: {
      name: "Miro",
      icon: SiMiro,
    },
    git: {
      name: "Git",
      icon: SiGit,
    },
    github: {
      name: "GitHub",
      icon: SiGithub,
    },
    githubactions: {
      name: "GitHub Actions",
      icon: SiGithubactions,
    },
  },
  backend: {
    go: {
      name: "Go",
      icon: SiGo,
    },
    gin: {
      name: "Gin",
      icon: SiGin,
    },
    docker: {
      name: "Docker",
      icon: SiDocker,
    },
    postgresql: {
      name: "PostgreSQL",
      icon: SiPostgresql,
    },
    minio: {
      name: "Minio",
      icon: SiMinio,
    },
    neo4j: {
      name: "Neo4j",
      icon: SiNeo4j,
    },
  },
  dataScience: {
    python: {
      name: "Python",
      icon: SiPython,
    },
    jupyter: {
      name: "Jupyter",
      icon: SiJupyter,
    },
    numpy: {
      name: "NumPy",
      icon: SiNumpy,
    },
    pandas: {
      name: "Pandas",
      icon: SiPandas,
    },
    scipy: {
      name: "SciPy",
      icon: SiScipy,
    },
  },
  another: {
    markdown: {
      name: "Markdown",
      icon: SiMarkdown,
    },
    typst: {
      name: "Typst",
      icon: SiTypst,
    },
    c: {
      name: "C/C#",
      icon: SiC,
    },
  },
};

const Icons = (): ReactElement => {
  return (
    <div className={styles.iconsContainer}>
      <h1>技術スタック</h1>
      {Object.keys(IconMap).map((category: string) => (
        <div key={category} className={styles.iconCategoryContainer}>
          <h2>{category}</h2>
          <div className={styles.iconCategory}>
            {Object.keys(IconMap[category]).map((key: string) => {
              const { name, icon: IconComponent, color } = IconMap[category][key];
              if (IconComponent === SiAdobeaftereffects || IconComponent === SiAdobeillustrator) {
                return (
                  <div key={key} className={styles.iconBox}>
                    <IconComponent fill={color ?? "default"} size={48} className={styles.icon} />
                    <p className={styles.iconName}>{name}</p>
                  </div>
                );
              }
              return (
                <div key={key} className={styles.iconBox}>
                  <IconComponent color={color ?? "default"} size={48} className={styles.icon} />
                  <p className={styles.iconName}>{name}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Icons;
