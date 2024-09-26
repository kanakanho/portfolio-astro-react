import type Frontmatter from "@/types/Frontmatter";
import type { ReactElement } from "react";
import styles from "./Imgs.module.scss";

type Props = {
  frontmatters: Frontmatter[];
};

const Imgs = ({ frontmatters }: Props): ReactElement => {
  return (
    <div className={styles.imgsContainer}>
      {frontmatters.map((frontmatter, index) => (
        <a
          key={index}
          className={`${styles.workImage} ${index % 3 === 0 ? styles.workImageEven : styles.workImageOdd}`}
          href={
            frontmatter.options?.website !== undefined
              ? frontmatter.options.website
              : `/posts/id/${frontmatter.number}`
          }
          target={frontmatter.options?.website !== undefined ? "_blank" : ""}
          rel={frontmatter.options?.website !== undefined ? "noopener noreferrer" : ""}
        >
          <img src={frontmatter.works.worksImage} alt={frontmatter.works.worksTitle} />
          <div className={styles.texts}>
            <p>{frontmatter.works.worksTitle}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Imgs;
