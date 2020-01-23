import { NAST_BLOCK_TYPES } from "../constants"
import { RenderNodes, RenderContext, HTML } from "../interface"

function renderColumnList(
  node: NAST.ColumnList,
  ctx: RenderContext,
  renderChildren: RenderNodes
): HTML {
  const numOfColumns = node.children.length

  let html = `\
<div id="${node.uri}" class="${NAST_BLOCK_TYPES.columnList}"\
 style="display: flex; flex-wrap: wrap;">`
  node.children.forEach((child, i) => {
    html += renderColumn(child, ctx, renderChildren, i === 0, numOfColumns)
  })
  html += "</div>"

  return html
}

function renderColumn(
  node: NAST.Column,
  ctx: RenderContext,
  renderChildren: RenderNodes,
  isFirst: boolean,
  numOfColumns: number
): HTML {
  if (node.type !== NAST_BLOCK_TYPES.column) {
    console.log(`Non-column node in column_list. Block ID: ${node.uri}`)
    return ""
  }

  const columnSpacing = 46
  const margin = isFirst ? "" : `margin-left: ${columnSpacing}px;`
  const columnRatio = node.ratio
  const width = `width: calc((100% - ${columnSpacing * (numOfColumns - 1)}px) * ${columnRatio});`

  const html = `\
<div class="${NAST_BLOCK_TYPES.column}" style="${margin} ${width} word-break: break-word;">
  ${renderChildren(node.children, ctx)}
</div>`

  return html
}

export default renderColumnList