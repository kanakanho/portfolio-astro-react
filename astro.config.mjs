import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
