import { CSS, NAST_BLOCK_TYPES } from "../constants"
import { renderColor, renderSemanticStringArray } from "../util"
import { RenderNodes, RenderContext, HTML } from "../interface"

function renderText(
  node: NAST.Text,
  ctx: RenderContext,
  renderChildren: RenderNodes
): HTML {
  const blockColorClass = node.color ? renderColor(node.color) : ""

  const content = `\
<div class="${CSS.blockClass} ${CSS.blockClass}--${NAST_BLOCK_TYPES.text} ${blockColorClass}">\
${renderSemanticStringArray(node.title, false, "")}\
</div>`

  let childrenContent = ""
  if (node.children.length > 0) {
    childrenContent = `\
<div class="${CSS.blockIndentClass}">\
${renderChildren(node.children, ctx)}\
</div>`
  }

  return content + childrenContent
}

export default renderText