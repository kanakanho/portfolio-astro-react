import {
  type IconType,
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAstro,
  SiBiome,
  SiC,
  SiCloudflare,
  SiCloudflareworkers,
  SiCss3,
  SiDocker,
  SiFigma,
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
  SiStyledcomponents,
  SiSwift,
  SiTauri,
  SiThreedotjs,
  SiTypescript,
  SiUnity,
  SiVercel,
  SiVite,
  SiXcode,
} from "@icons-pack/react-simple-icons";
import type { ReactElement } from "react";
import styles from "./Icons.module.scss";

const IconMap: {
  [key: string]: {
    [key: string]: {
      name: string;
      icon: IconType;
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
    styledcomponents: {
      name: "Styled Components",
      icon: SiStyledcomponents,
    },
    astro: {
      name: "Astro",
      icon: SiAstro,
    },
    biome: {
      name: "Biome",
      icon: SiBiome,
    },
    prettier: {
      name: "Prettier",
      icon: SiPrettier,
    },
    hono: {
      name: "Hono",
      icon: SiHono,
    },
    tauri: {
      name: "Tauri",
      icon: SiTauri,
    },
    vite: {
      name: "Vite",
      icon: SiVite,
    },
    vercel: {
      name: "Vercel",
      icon: SiVercel,
    },
    cloudflare: {
      name: "Cloudflare",
      icon: SiCloudflare,
    },
    cloudflareworkers: {
      name: "Cloudflare Workers",
      icon: SiCloudflareworkers,
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
    },
    adobeaftereffects: {
      name: "After Effects",
      icon: SiAdobeaftereffects,
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
