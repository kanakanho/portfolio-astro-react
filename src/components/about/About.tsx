import type { ReactElement } from "react";
import styles from "./About.module.scss";
import Abstract from "./abstract/Abstract";
import Icons from "./icons/Icons";

const About = (): ReactElement => {
  return (
    <main className={styles.aboutContainer}>
      <Abstract />
      <Icons />
    </main>
  );
};

export default About;
