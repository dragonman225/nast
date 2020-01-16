import { NAST_BLOCK_TYPES } from '../constants'
import { renderChildren, renderBlock, renderTitle } from '../render-utils'

function renderList(
  node: NAST.Block,
  renderNext: Function
): string {
  if (node.type === NAST_BLOCK_TYPES.bulletedList)
    return renderBulletedList(node, renderNext)
  else (node.type === NAST_BLOCK_TYPES.numberedList)
    return renderNumberedList(node, renderNext)
}

function renderBulletedList(
  node: NAST.Block,
  renderNext: Function
): string {
  let listItemsHTML = node.children.map(listItem => {
    return renderListItem(listItem as NAST.BulletedList, renderNext)
  })
  let html = `\
<ul>
  ${listItemsHTML.join('')}
</ul>`
  return html
}

function renderNumberedList(
  node: NAST.Block,
  renderNext: Function
): string {
  let listItemsHTML = node.children.map(listItem => {
    return renderListItem(listItem as NAST.NumberedList, renderNext)
  })
  let html = `\
<ol>
  ${listItemsHTML.join('')}
</ol>`
  return html
}

function renderListItem(
  node: NAST.BulletedList | NAST.NumberedList,
  renderNext: Function
): string {
  let content = renderTitle(node.title, false, '')

  /**
   * Without ul, some content become out of container.
   * But ul has its own indent padding, so we don't need the indent class.
   */
  let html = `\
<li>
  <div id="${node.id}">
    ${renderBlock(node, content)}
  </div>
  ${renderChildren(node.children, renderNext)}
</li>`

  return html
}

export default renderList