import { HTML } from "../interface"
import { renderSemanticStringArray, renderIconToHTML } from "../util"

function renderPage(
  node: NAST.Page
): HTML {
  return `<a href="${node.uri}">${renderIconToHTML(node.icon)}\
${renderSemanticStringArray(node.title)}</a>`
}

export default renderPage