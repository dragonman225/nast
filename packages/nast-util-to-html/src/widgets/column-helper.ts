import { NAST_BLOCK_TYPES } from "../constants"
import { raiseWarning } from "../log-utils"
import { renderChildren } from "../render-utils"

function renderColumnList(
  node: NAST.ColumnList,
  renderNext: Function
) {
  let numOfColumns = node.children.length
  let columnArrHTML = node.children.map((column, i) => {
    return renderColumn(column as NAST.Column, renderNext, i === 0, numOfColumns)
  })

  let html = `\
<div class="${NAST_BLOCK_TYPES.columnList}" style="display: flex; flex-wrap: wrap;">
  ${columnArrHTML.join("")}
</div>`

  return html
}

function renderColumn(
  node: NAST.Column,
  renderNext: Function,
  isFirst: boolean,
  numOfColumns: number
) {
  if (node.type !== NAST_BLOCK_TYPES.column) {
    raiseWarning(`Non-column node in column_list. Block ID: ${node.id}`)
    return ""
  }

  let columnSpacing = 46
  let margin = isFirst ? "" : `margin-left: ${columnSpacing}px;`
  let columnRatio = node.ratio
  let width = `width: calc((100% - ${columnSpacing * (numOfColumns - 1)}px) * ${columnRatio});`

  let html = `\
<div class="${NAST_BLOCK_TYPES.column}" style="${margin} ${width} word-break: break-word;">
  ${renderChildren(node.children, renderNext)}
</div>`

  /** Experiment: Simpler way, but not working well with nested ColumnList */
  //   let html = `\
  // <div class="${blockMap.column}" style="flex-grow: ${columnRatio};">
  //   ${renderChildren(node.children, renderNext)}
  // </div>
  //   `

  return html
}

export default renderColumnList