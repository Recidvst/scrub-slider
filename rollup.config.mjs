import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import uglify from "rollup-plugin-uglify-es";
import scss from "rollup-plugin-scss";
import typescript from "@rollup/plugin-typescript";

const folder = "dist";

export default {
  input: "src/js/scrub.ts",
  output: [
    {
      file: `${folder}/scrub.cjs.js`,
      format: "cjs",
    },
    {
      file: `${folder}/scrub.esm.js`,
      format: "esm",
    },
    {
      name: "Scrub",
      file: `${folder}/scrub.umd.js`,
      format: "umd",
    },
    {
      name: "Scrub",
      file: `${folder}/scrub.iife.js`,
      format: "iife",
    },
  ],
  plugins: [
    resolve(),
    eslint({
      include: ["**/*.js", "**/*.ts"],
    }),
    typescript(),
    scss({ fileName: `scrub.css` }),
    babel({
      exclude: "node_modules/**",
    }),
    uglify(),
  ],
};
