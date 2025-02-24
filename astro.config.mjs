import { defineConfig, sharpImageService } from "astro/config";
import { readFileSync } from "node:fs";
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
  integrations: [compressor(), mdx()],
  image: {
    service: sharpImageService()
  },
  site: "https://willcoquillette.com",
  vite: {
    plugins: [rawFonts([".ttf", ".woff"]), tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}