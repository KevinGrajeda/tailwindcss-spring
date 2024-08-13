import tailwindcss from "tailwindcss";
import postcss from "postcss";
import minify from "@csstools/postcss-minify";
import springPlugin from "../src/index.js";

const TAILWIND_BASE = "@tailwind utilities;";

export function generatePluginCSS(options = {}) {
  const { inline = "", content = "" } = options;

  return postcss([
    minify(),
    tailwindcss({
      plugins: [springPlugin],
      content: [{ raw: content }],
    }),
  ])
    .process(`${TAILWIND_BASE} ${inline}`, {
      from: undefined,
    })
    .then((result) => result.css);
}
