import type { ReactElement } from "react";
import styles from "./Abstract.module.scss";

const Abstract = (): ReactElement => {
  return (
    <div className={styles.abstract}>
      <img src="/headshot.jpeg" alt="Headshot" className={styles.headshot} />
      <div className={styles.abstractTextHeader}>
        <h1 className={styles.auther}>柴田青賢</h1>
        <p className={styles.university}>愛知工業大学 情報科学部 情報科学科 学部2年 梶研究室</p>
      </div>
      <div className={styles.articleContainer}>
        <div className={styles.articleBox}>
          <article>情報系のエンジニアを目指している大学生です</article>
          <article>webフロントを中心とした開発を活発に行なっています</article>
          <article>XR技術に興味があり、MetaQuest や VisionPro でのアプリ開発を行っています</article>
          <article>UI・UX を意識したプロダクト開発を重視しています</article>
          <article>Adobe illustrator や Figma でのデザインも行っています</article>
        </div>
        <div className={styles.articleBox}>
          <article>
            研究室では以下の4つを軸に複合現実技術の一般化に向けた研究に取り組んでいます
          </article>
          <article className={styles.listItem}>
            PLATEAUをはじめとしたオープンな地理データによる仮想空間の実現
          </article>
          <article className={styles.listItem}>
            位置推定（屋外や屋内といったロケーションや、駅や学校、オフィスといった環境に左右されないもの）の実現
          </article>
          <article className={styles.listItem}>それらの合成によるデジタルツインの実現</article>
          <article className={styles.listItem}>
            その仮想世界と現実空間のシームレスな接続の実現
          </article>
        </div>
      </div>
    </div>
  );
};

export default Abstract;
