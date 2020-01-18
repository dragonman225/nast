import { CSS } from "../constants"
import { renderBlock, renderSemanticStringArray } from "../util"
import { HTML, RenderContext, RenderNodes } from "../interface"

function renderToggle(
  node: NAST.Toggle,
  ctx: RenderContext,
  renderChildren: RenderNodes
): HTML {
  const content = renderSemanticStringArray(node.title, false, "")
  const block = renderBlock(node, content, "summary")
  const html = `\
<details>
  ${block}
  <div class="${CSS.blockIndentClass}">
    ${renderChildren(node.children, ctx)}
  </div>
</details>`
  return html
}

export default renderToggle