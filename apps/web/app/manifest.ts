import type { MetadataRoute } from "next";
import { SAND } from "@/lib/logo";

/**
 * Installable app identity. Colours match the mark (sand ground) and the light page
 * chrome; icons are drawn from the same أ geometry as the favicon and apple-icon.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Uswah",
    short_name: "Uswah",
    description:
      "Practical guidance for real situations, from the original source.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: SAND,
    theme_color: "#faf8f4",
    icons: [
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/512-maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
