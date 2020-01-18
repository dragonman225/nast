import katex from "katex"
import { renderBlock } from "../util"

function renderEquation(
  node: NAST.Equation
): string {
  const katexOpts = {
    throwOnError: false,
    displayMode: true
  }
  const content = katex.renderToString(node.latex, katexOpts)
  return renderBlock(node, content)
}

export default renderEquation