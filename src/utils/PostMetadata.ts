import type Frontmatter from "@/types/Frontmatter";
import type Metadata from "@/types/Metadata";
import DefaultMetadata from "@/utils/DefaultMetadata";
import { GetImageType } from "@/utils/GetImageType";

export function GetPostMetadata(frontmatter: Frontmatter): Metadata {
  const [extension, imageTypeError] = GetImageType(
    frontmatter.options?.image?.split(".").pop() as string,
  );

  // 自前でホスティングしている画像はパスのみなので OGP 用に絶対 URL にする
  const ogImage = frontmatter.options?.image
    ? new URL(frontmatter.options.image, DefaultMetadata.openGraph?.url).href
    : undefined;

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
