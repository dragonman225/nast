import { CSS } from "../constants"
import { renderColor, renderSemanticStringArray } from "../util"

function renderHeading(node: NAST.Heading): string {
  const blockColorClass = node.color ? renderColor(node.color) : ""
  const textHTML = renderSemanticStringArray(node.title)
  let content = ""

  if (node.depth < 6 && node.depth > 0) {
    content = `<h${node.depth + 1} id="${node.uri}">${textHTML}</h${node.depth + 1}>`
  } else {
    content = `<h6>${textHTML}</h6>`
  }

  const html = `\
<div class="${CSS.blockClass} ${blockColorClass}">${content}</div>`

  return html
}

export default renderHeading