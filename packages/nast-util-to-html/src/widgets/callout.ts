import { renderBlock, renderSemanticStringArray } from "../util"
import { RenderNodes, RenderContext, HTML } from "../interface"

function renderCallout(
  node: NAST.Callout,
  ctx: RenderContext,
  renderChildren: RenderNodes
): HTML {
  const newCtx: RenderContext = {
    cssClass: ctx.cssClass,
    depthFromRoot: ctx.depthFromRoot + 1,
    numberedListCount: ctx.numberedListCount
  }
  const iconHTML = /^http/.test(node.icon || "")
    ? `<img src="${node.icon}" style="height: 1.5em;">` : node.icon

  const content = `\
<div style="padding-top: 2.5px;">${iconHTML}</div>\
<div style="margin-left: 8px;">\
${renderSemanticStringArray(node.title, false, "")}\
${renderChildren(node.children, newCtx)}\
</div>`

  return renderBlock(node, content)
}

export default renderCallout