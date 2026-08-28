import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
  locale?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image = "/media/og-deeqstudio.jpg",
  absoluteTitle = false,
  locale = "en_BE",
}: PageMetadataOptions): Metadata {
  const canonical = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: canonical,
      locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
