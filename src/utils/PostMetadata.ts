import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type Frontmatter from "@/types/Frontmatter";
import type Metadata from "@/types/Metadata";
import DefaultMetadata from "@/utils/DefaultMetadata";
import { GetImageType } from "@/utils/GetImageType";

/** OGP 画像として配信する形式 (それ以外は png に変換する) */
const OGP_FORMATS = ["png", "jpg", "jpeg", "webp", "gif"] as const;

/** OGP 画像の絶対 URL と拡張子 */
async function getOgpImage(
  image: ImageMetadata | string | null | undefined,
): Promise<{ url: string; extension: string } | undefined> {
  if (image == null) {
    return undefined;
  }

  if (typeof image === "string") {
    return {
      url: new URL(image, DefaultMetadata.openGraph?.url).href,
      extension: image.split(".").pop() ?? "",
    };
  }

  const format = OGP_FORMATS.find((format) => format === image.format) ?? "png";
  const optimized = await getImage({ src: image, width: 1200, format });
  return { url: new URL(optimized.src, DefaultMetadata.openGraph?.url).href, extension: format };
}

export async function GetPostMetadata(frontmatter: Frontmatter): Promise<Metadata> {
  const ogpImage = await getOgpImage(frontmatter.options?.image);
  const [extension, imageTypeError] = GetImageType(ogpImage?.extension ?? "");

  const ogImage = ogpImage?.url;

  return {
    ...DefaultMetadata,
    title: frontmatter.title,
    description:
      `${frontmatter.options?.description} -${DefaultMetadata.title}` ||
      DefaultMetadata.description,
    openGraph: {
      ...DefaultMetadata.openGraph,
      title: frontmatter.title,
      description:
        `${frontmatter.options?.description} -${DefaultMetadata.title}` ||
        DefaultMetadata.openGraph?.description,
      url: `${DefaultMetadata.openGraph?.url}/posts/id/${frontmatter.number}`,
      image: ogImage || DefaultMetadata.openGraph?.image,
      imageAlt: `記事【${frontmatter.title}】のタイトル画像`,
    },
    twitter: {
      ...DefaultMetadata.twitter,
      card: imageTypeError ? "summary_large_image" : "summary",
      description:
        `${frontmatter.options?.description}  -${DefaultMetadata.title}` ||
        DefaultMetadata.twitter?.description,
      image: imageTypeError
        ? ogImage || DefaultMetadata.twitter?.image
        : DefaultMetadata.twitter?.image,
      imageType: imageTypeError
        ? extension || DefaultMetadata.twitter?.imageType
        : DefaultMetadata.twitter?.imageType,
    },
  };
}
