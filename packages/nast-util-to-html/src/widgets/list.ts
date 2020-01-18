import { RenderContext, RenderNodes } from "../interface"
import { renderBlock, renderSemanticStringArray } from "../util"

function renderList(
  node: NAST.BulletedList | NAST.NumberedList,
  ctx: RenderContext,
  renderChildren: RenderNodes
): string {
  const content = renderSemanticStringArray(node.title, false, "")

  /**
   * Without ul, some content become out of container.
   * But ul has its own indent padding, so we do not need the indent class.
   */
  const html = `\
<li>
  <div id="${node.uri}">
    ${renderBlock(node, content)}
  </div>
  ${renderChildren(node.children, ctx)}
</li>`

  return html
}

export default renderList