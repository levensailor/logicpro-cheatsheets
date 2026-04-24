import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Logic Pro Cheat Sheets",
    short_name: "Logic Pro Book",
    description: "A mobile-friendly handbook for recording, mixing, and mastering a band in Logic Pro.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#edf4ff",
    theme_color: "#edf4ff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
