import type { ImageType } from "@/types/Metadata";

export function GetImageType(extension: string): [ImageType | null, "ok" | "error"] {
  switch (extension) {
    case "png":
      return ["image/png", "ok"];
    case "jpg":
    case "jpeg":
      return ["image/jpeg", "ok"];
    case "gif":
      return ["image/gif", "ok"];
    case "svg":
      return ["image/svg+xml", "ok"];
    case "tiff":
      return ["image/tiff", "ok"];
    case "webp":
      return ["image/webp", "ok"];
    default:
      return [null, "error"];
  }
}
