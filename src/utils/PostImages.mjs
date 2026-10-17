// @ts-check
// esa にアップロードした画像・PDF を自前でホスティングするための共通処理
// ビルド前スクリプト (scripts/fetch-post-images.mjs)・remark / rehype プラグイン・content config から使う
// - 本文・frontmatter の画像は assets/post-images から import させ、Astro の画像最適化 (astro:assets) に乗せる
// - それ以外 (PDF、リンク先の画像、変換できなかった HTML 中の画像) は public/post-images からそのまま配信する
import { existsSync } from "node:fs";
import path from "node:path";

/** 記事の markdown を置くディレクトリ */
export const POST_DIR = "src/content/post";
/** 画像を保管するディレクトリ (リポジトリにコミットする) */
export const ARCHIVE_DIR = "assets/post-images";
/** ビルド時にファイルを配置するディレクトリ (public 配下) */
export const PUBLIC_DIR = "public/post-images";
/** 配信時のパス */
export const PUBLIC_PATH = "/post-images";

const ESA_URL_SOURCE =
  "https://(?:img\\.esa\\.io|esa-storage-tokyo\\.s3-ap-northeast-1\\.amazonaws\\.com)/uploads/production/attachments/\\d+/\\d{4}/\\d{2}/\\d{2}/\\d+/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\.([A-Za-z0-9]+)";

/** @returns {RegExp} esa の添付ファイル URL にマッチする正規表現 (g フラグ付き) */
export const esaUrlPattern = () => new RegExp(ESA_URL_SOURCE, "g");

/** Astro の画像最適化で扱える拡張子 */
const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp", "avif", "tiff", "svg"]);

/**
 * @param {string} fileName
 * @returns {boolean} Astro の画像最適化に乗せるファイルか
 */
const isImageFile = (fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).slice(1));

/**
 * @param {string} uuid
 * @param {string} ext
 * @returns {string} 保存時のファイル名
 */
export const toFileName = (uuid, ext) => `${uuid}.${ext.toLowerCase()}`;

/** URL 全体が esa の添付ファイル URL か (クエリ・フラグメントは許容する) */
const ESA_URL_EXACT_PATTERN = new RegExp(`^${ESA_URL_SOURCE}(?:[?#].*)?$`);

/**
 * @param {string} url
 * @returns {boolean} esa の添付ファイル URL か
 */
const isEsaUrl = (url) => ESA_URL_EXACT_PATTERN.test(url);

/**
 * esa の画像 URL を assets/post-images に保管済みのファイル名に変換する
 * @param {string} url
 * @returns {string | undefined} 画像でない・保管されていないときは undefined
 */
const toArchivedImage = (url) => {
  const match = ESA_URL_EXACT_PATTERN.exec(url);
  if (!match) return undefined;
  const fileName = toFileName(match[1], match[2]);
  return isImageFile(fileName) && existsSync(path.join(ARCHIVE_DIR, fileName))
    ? fileName
    : undefined;
};

/**
 * @param {string} fromDir
 * @param {string} fileName
 * @returns {string} fromDir から保管済み画像への相対パス (Astro が import できる形)
 */
const toRelativeImagePath = (fromDir, fileName) => {
  const relative = path
    .relative(fromDir, path.resolve(ARCHIVE_DIR, fileName))
    .split(path.sep)
    .join("/");
  return relative.startsWith(".") ? relative : `./${relative}`;
};

/**
 * frontmatter の画像 URL を content collection の image() で読み込める相対パスに変換する
 * esa の URL で保管されていないものは表示できないので undefined にし、esa 以外の URL はそのまま返す
 * @param {string | null | undefined} url
 * @returns {string | undefined}
 */
export const toPostImagePath = (url) => {
  if (url == null) return undefined;
  const fileName = toArchivedImage(url);
  if (fileName) return toRelativeImagePath(path.resolve(POST_DIR), fileName);
  return isEsaUrl(url) ? undefined : url;
};

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

// esa が出力する <img> だけを扱う (esa からの記事は増えないので、出力の形式はこれ以上変わらない)
const IMG_TAG_PATTERN = /<img\b[^>]*>/gi;
const ATTRIBUTE_PATTERN = /([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

/** @type {Record<string, string>} */
const HTML_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'" };

/**
 * @param {string} tag
 * @returns {Record<string, string>} 属性名 (小文字) と値
 */
const parseAttributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(ATTRIBUTE_PATTERN)].map((match) => [
      match[1].toLowerCase(),
      (match[2] ?? match[3]).replace(
        /&(amp|lt|gt|quot|#39);/g,
        (entity, name) => HTML_ENTITIES[name] ?? entity,
      ),
    ]),
  );

/**
 * esa が出力する <img> を markdown の画像ノードに変換する
 * Astro の画像最適化は markdown の画像記法にしか効かないため
 * @param {string} tag
 * @param {string} fromDir
 * @returns {any} 保管済みの esa の画像でないときは元の HTML のノード
 */
const imgTagToNode = (tag, fromDir) => {
  const { src, alt, title, width, height, ...rest } = parseAttributes(tag);
  const fileName = src ? toArchivedImage(src) : undefined;
  if (!fileName) return { type: "html", value: tag };

  // 高さは Astro が縦横比から計算するので渡さない
  /** @type {Record<string, unknown>} */
  const hProperties = { ...rest };
  const displayWidth = Number(width);
  if (displayWidth > 0 && !fileName.endsWith(".svg")) {
    hProperties.width = Math.round(displayWidth);
  }

  return {
    type: "image",
    url: toRelativeImagePath(fromDir, fileName),
    alt: alt ?? "",
    title: title ?? null,
    data: { hProperties },
  };
};

/**
 * 本文中の esa の画像を assets/post-images の相対パスに書き換え、Astro の画像最適化に乗せる remark プラグイン
 * Astro が画像を集める処理より前に動く必要があるため remark の段階で書き換える
 * @returns {(tree: any, file: { path?: string }) => void}
 */
export const remarkPostImages = () => (tree, file) => {
  if (typeof file.path !== "string") return;
  const fromDir = path.dirname(file.path);

  /** @param {any} node */
  const visit = (node) => {
    // 参照形式 ([id]: url) の定義はリンクと共有されることがあるので書き換えない
    if (node.type === "image" && typeof node.url === "string") {
      const fileName = toArchivedImage(node.url);
      if (fileName) node.url = toRelativeImagePath(fromDir, fileName);
    }
    if (!node.children) return;
    node.children = node.children.flatMap(
      /** @param {any} child */
      (child) => {
        if (child.type === "html") {
          /** @type {string[] | null} */
          const tags = child.value.match(IMG_TAG_PATTERN);
          const onlyImages = tags && child.value.replace(IMG_TAG_PATTERN, "").trim() === "";
          return onlyImages ? tags.map((tag) => imgTagToNode(tag, fromDir)) : [child];
        }
        visit(child);
        return [child];
      },
    );
  };
  visit(tree);
};

/**
 * hast のプロパティ名を HTML の属性名に変換する
 * className は class に、dataFoo / ariaLabel は data-foo / aria-label に、それ以外は小文字にする
 * (HTML の属性名は大文字・小文字を区別しない)
 * @param {string} key
 * @returns {string}
 */
const toAttributeName = (key) => {
  if (key === "className") return "class";
  if (key === "htmlFor") return "for";
  if (/^(data|aria)[A-Z]/.test(key)) {
    return key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
  }
  return key.toLowerCase();
};

/**
 * markdown を HTML に変換した後の要素の属性 (src, href など) の esa の URL を置き換える rehype プラグイン
 * remark で画像ノードにできなかったもの (PDF、リンク先の画像など) が対象
 * @returns {(tree: any) => void}
 */
export const rehypePostImages = () => (tree) => {
  /** @param {any} node */
  const visit = (node) => {
    // Astro は最適化する画像のプロパティをそのまま属性として出力するので、
    // hast のプロパティ名 (className など) を HTML の属性名 (class など) に戻しておく
    if (node.type === "element" && node.tagName === "img" && node.properties) {
      node.properties = Object.fromEntries(
        Object.entries(node.properties).map(([key, value]) => [
          toAttributeName(key),
          Array.isArray(value) ? value.join(key === "srcSet" ? ", " : " ") : value,
        ]),
      );
    }
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
