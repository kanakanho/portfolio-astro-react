// @ts-check
// 記事中の esa の画像・PDF を集めて assets/post-images に保管する
// - assets/post-images になければ esa からダウンロードして保存する (GitHub Actions でコミットされる)
// - public/post-images にも配置する (本文の画像は Astro が assets/post-images から読み込んで最適化するが、
//   リンク先の画像や PDF など最適化できないものはここから配信する)
// - どちらからも取得できなかったものは警告を出す (--strict のときは終了コード 1)
import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  ARCHIVE_DIR,
  POST_DIR,
  PUBLIC_DIR,
  findEsaUrls,
} from "../src/utils/PostImages.mjs";

const STRICT = process.argv.includes("--strict");

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
const listMarkdownFiles = async (dir) => {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name));
};

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param {string} url
 * @returns {Promise<Buffer | null>}
 */
const download = async (url) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    if (attempt > 1) await sleep(1000 * 2 ** (attempt - 2));
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
      if (res.ok) {
        // ログインページなどの HTML が 200 で返ってきた場合は画像として保存しない
        const contentType = res.headers.get("content-type") ?? "";
        if (contentType.startsWith("text/html")) {
          console.warn(`  unexpected content-type ${contentType} ${url}`);
          return null;
        }
        return Buffer.from(await res.arrayBuffer());
      }
      // 403, 404 はリトライしても変わらない
      if (res.status === 403 || res.status === 404) {
        console.warn(`  ${res.status} ${url}`);
        return null;
      }
      console.warn(`  ${res.status} ${url} (attempt ${attempt})`);
    } catch (error) {
      console.warn(`  ${error instanceof Error ? error.message : error} ${url} (attempt ${attempt})`);
    }
  }
  return null;
};

/**
 * items を最大 limit 件ずつ並列に処理する
 * @template T
 * @param {T[]} items
 * @param {number} limit
 * @param {(item: T) => Promise<void>} fn
 * @returns {Promise<void>}
 */
const runWithConcurrency = async (items, limit, fn) => {
  let index = 0;
  const worker = async () => {
    while (index < items.length) {
      await fn(items[index++]);
    }
  };
  await Promise.all(Array.from({ length: limit }, worker));
};

const main = async () => {
  /** @type {Map<string, string>} fileName -> url */
  const targets = new Map();
  for (const file of await listMarkdownFiles(POST_DIR)) {
    for (const { url, fileName } of findEsaUrls(await readFile(file, "utf-8"))) {
      targets.set(fileName, url);
    }
  }

  await mkdir(ARCHIVE_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });

  let archived = 0;
  /** @type {string[]} */
  const downloaded = [];
  /** @type {string[]} */
  const failed = [];

  await runWithConcurrency([...targets], 4, async ([fileName, url]) => {
    const archivePath = path.join(ARCHIVE_DIR, fileName);
    if (!existsSync(archivePath)) {
      const data = await download(url);
      if (data === null) {
        failed.push(url);
        return;
      }
      await writeFile(archivePath, data);
      downloaded.push(fileName);
    } else {
      archived++;
    }
    await copyFile(archivePath, path.join(PUBLIC_DIR, fileName));
  });

  console.log(
    `[post-images] ${targets.size} files: ${archived} from archive, ${downloaded.length} downloaded, ${failed.length} failed`,
  );
  for (const fileName of downloaded) console.log(`  + ${fileName}`);
  if (failed.length > 0) {
    console.warn(
      "[post-images] 以下のファイルを取得できませんでした。esa の URL のまま配信されます。assets/post-images に手動で追加してください",
    );
    for (const url of failed) console.warn(`  ! ${url}`);
    // --strict (GitHub Actions) では失敗として扱い、取得できなかったことに気付けるようにする
    if (STRICT) process.exitCode = 1;
  }
};

await main();
