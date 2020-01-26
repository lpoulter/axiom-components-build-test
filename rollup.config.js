import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import svg from "rollup-plugin-svg";

export default {
  input: "src/index.js",
  output: {
    file: "./dist/index.js",
    format: "cjs"
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // only transpile our source code
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/react/index.js": [
          "Component",
          "PureComponent",
          "Fragment",
          "Children",
          "createElement",
          "cloneElement",
          "findComponent",
          "isValidElement"
        ],
        "node_modules/react-dom/index.js": ["findDOMNode"],
        "node_modules/@brandwatch/axiom-utils/dist/index.js": [
          "findComponent",
          "isComponent",
          "svgDefineOnce"
        ],
        "node_modules/@brandwatch/axiom-formatting/dist/index.js": [
          "mediumDate"
        ]
      }
    }),
    svg(),
    resolve(),
    postcss({
      plugins: []
    }),
    json(),
    terser()
  ]
};
