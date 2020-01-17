import katex from "katex"
import { renderBlock } from "../render-utils"

function renderEquation(
  node: NAST.Equation
): string {
  let katexOpts = {
    throwOnError: false,
    displayMode: true
  }
  let content = katex.renderToString(node.latex, katexOpts)
  return renderBlock(node, content)
}

export default renderEquation