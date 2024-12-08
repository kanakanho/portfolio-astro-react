import type { ImageType } from "@/types/Metadata";

export function GetImageType(extension: string): [ImageType | null, boolean] {
  switch (extension) {
    case "png":
      return ["image/png", true];
    case "jpg":
    case "jpeg":
      return ["image/jpeg", true];
    case "gif":
      return ["image/gif", true];
    case "svg":
      return ["image/svg+xml", true];
    case "tiff":
      return ["image/tiff", true];
    case "webp":
      return ["image/webp", true];
    default:
      return [null, false];
  }
}
