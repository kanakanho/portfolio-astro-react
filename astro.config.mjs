import { unified } from "@astrojs/markdown-remark";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";
// @ts-check
import { defineConfig } from "astro/config";
import { rehypePostImages, remarkPostImages } from "./src/utils/PostImages.mjs";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    react(),
    expressiveCode(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkPostImages],
      rehypePlugins: [rehypePostImages],
    }),
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
      defaultColor: false,
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
});
