import type { ReactElement } from "react";
import styles from "./Abstract.module.scss";

const Abstract = (): ReactElement => {
  return (
    <div className={styles.abstract}>
      <img src="/icon.png" alt="kanakanho のアイコン" className={styles.icon} />
      <div className={styles.abstractTextHeader}>
        <h1 className={styles.auther}>柴田青賢</h1>
      </div>
      <div className={styles.articleContainer}>
        <div className={styles.articleBox}>
          <article>webフロント・webXRを中心として開発を活発に行なっています</article>
          <article>
            XR技術に興味があり、MetaQuest3 や VisionPro でのアプリ開発を行っています
          </article>
        </div>
        <div className={styles.articleBox}>
          <article>Adobe illustrator や Figma でのデザインも行っています</article>
          <article>UI・UX を意識したプロダクト開発を重視しています</article>
          <article>プロダクトの目的や意義を重視した開発を大切にしています</article>
        </div>
        <div className={styles.articleBox}>
          <article>現実の生活をコンピュータの持つ情報によって豊かにするのを目的として</article>
          <article>
            複合現実によるデジタル空間と現実空間のシームレスな接続のための研究を行っています
          </article>
        </div>
        <div className={styles.articleBox} />
        <div className={styles.articleBox} />
      </div>
    </div>
  );
};

export default Abstract;
