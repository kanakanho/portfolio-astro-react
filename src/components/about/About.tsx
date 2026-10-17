import type { ReactElement } from "react";
import styles from "./About.module.scss";
import Abstract from "./abstract/Abstract";

const About = (): ReactElement => {
  return (
    <main className={styles.aboutContainer}>
      <Abstract />
    </main>
  );
};

export default About;
