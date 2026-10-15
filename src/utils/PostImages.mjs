// @ts-check
// esa にアップロードした画像・PDF を自前でホスティングするための共通処理
// ビルド前スクリプト (scripts/fetch-post-images.mjs)・rehype プラグイン・content config から使う
import { existsSync } from "node:fs";
import path from "node:path";

/** 画像を保管するディレクトリ (リポジトリにコミットする) */
export const ARCHIVE_DIR = "assets/post-images";
/** ビルド時に画像を配置するディレクトリ (public 配下) */
export const PUBLIC_DIR = "public/post-images";
/** 配信時のパス */
export const PUBLIC_PATH = "/post-images";

const ESA_URL_SOURCE =
  "https://(?:img\\.esa\\.io|esa-storage-tokyo\\.s3-ap-northeast-1\\.amazonaws\\.com)/uploads/production/attachments/\\d+/\\d{4}/\\d{2}/\\d{2}/\\d+/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\.([A-Za-z0-9]+)";

/** @returns {RegExp} esa の添付ファイル URL にマッチする正規表現 (g フラグ付き) */
export const esaUrlPattern = () => new RegExp(ESA_URL_SOURCE, "g");

/**
 * @param {string} uuid
 * @param {string} ext
 * @returns {string} 保存時のファイル名
 */
export const toFileName = (uuid, ext) => `${uuid}.${ext.toLowerCase()}`;

/**
 * 文字列中の esa の URL を自前ホスティングのパスに置き換える
 * `#toolbar=0` などのフラグメントはそのまま残る
 * public/post-images に配置できなかったファイルは元の URL のままにする
 * @param {string} text
 * @returns {string}
 */
export const replaceEsaUrls = (text) =>
  text.replace(esaUrlPattern(), (url, uuid, ext) => {
    const fileName = toFileName(uuid, ext);
    return existsSync(path.join(PUBLIC_DIR, fileName)) ? `${PUBLIC_PATH}/${fileName}` : url;
  });

/**
 * 文字列中の esa の URL を列挙する
 * @param {string} text
 * @returns {{ url: string, fileName: string }[]}
 */
export const findEsaUrls = (text) =>
  [...text.matchAll(esaUrlPattern())].map((match) => ({
    url: match[0],
    fileName: toFileName(match[1], match[2]),
  }));

/**
 * markdown を HTML に変換した後の要素の属性 (src, href など) の esa の URL を置き換える rehype プラグイン
 * @returns {(tree: any) => void}
 */
export const rehypePostImages = () => (tree) => {
  /** @param {any} node */
  const visit = (node) => {
    if (node.type === "element" && node.properties) {
      for (const [key, value] of Object.entries(node.properties)) {
        // srcSet などのカンマ・スペース区切りの属性は配列になっている
        if (typeof value === "string") {
          node.properties[key] = replaceEsaUrls(value);
        } else if (Array.isArray(value)) {
          node.properties[key] = value.map((item) =>
            typeof item === "string" ? replaceEsaUrls(item) : item,
          );
        }
      }
    }
    if (node.type === "raw" && typeof node.value === "string") {
      node.value = replaceEsaUrls(node.value);
    }
    for (const child of node.children ?? []) {
      visit(child);
    }
  };
  visit(tree);
};
