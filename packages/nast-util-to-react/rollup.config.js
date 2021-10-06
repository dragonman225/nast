import typescript from "@rollup/plugin-typescript"
import copy from 'rollup-plugin-copy'

const pkg = require("./package.json")

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "cjs"
    }, {
      file: "dist/index.esm.js",
      format: "es"
    }
  ],
  plugins: [typescript(), copy({
    targets: [{ src: 'src/theme.css', dest: 'dist' }]
  })],
  external: [...Object.keys(pkg.dependencies), "react-dom/server"]
}