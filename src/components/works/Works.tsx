import type { ReactElement } from "react";
import type Frontmatter from "@/types/Frontmatter";
import Imgs from "./imgs/Imgs";
import styles from "./Works.module.scss";

type Props = {
  frontmatters: Frontmatter[];
};

const Works = ({ frontmatters }: Props): ReactElement => {
  return (
    <main className={styles.worksContainer}>
      <div className={styles.worksHeader}>
        <h2 className={styles.worksTitle}>Works</h2>
        <p>event & products</p>
      </div>
      <Imgs frontmatters={frontmatters} />
    </main>
  );
};

export default Works;
