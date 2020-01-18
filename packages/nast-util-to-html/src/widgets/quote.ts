import { renderBlock, renderSemanticStringArray } from "../util"
import { RenderNodes, RenderContext } from "../interface"

function renderQuote(
  node: NAST.Quote,
  ctx: RenderContext,
  renderChildren: RenderNodes
): string {
  const newCtx: RenderContext = {
    cssClass: ctx.cssClass,
    depthFromRoot: ctx.depthFromRoot + 1,
    numberedListCount: ctx.numberedListCount
  }
  const content = `\
<blockquote>
  ${renderSemanticStringArray(node.title, false, "")}
  ${renderChildren(node.children, newCtx)}
</blockquote>`
  return renderBlock(node, content)
}

export default renderQuote