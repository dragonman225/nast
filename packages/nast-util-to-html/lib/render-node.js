'use strict'
const blockMap = require('./block-map')
const {
  renderText,
  renderHeader,
  renderColumnList,
  renderUnorderedList,
  renderOrderedList,
  renderToggle,
  renderToDo,
  renderDivider,
  renderQuote,
  renderCallout,
  renderImage,
  renderBookmark,
  renderCode
} = require('./render-blocks')
const { renderChildren } = require('./render-utils')
const { raiseWarning } = require('./log-utils')

module.exports = {
  renderRoot,
  renderNode
}

/**
 * PseudoBlock: Root.
 * @param {Root} node 
 * @param {String} elemId 
 * @returns {String}
 */
function renderRoot(node, elemId = 'notionast-document') {
  let title = node.data ? node.data.title[0][0] : ''
  return `\
<div id="${elemId}">
  <div id="${node.id}" class="page-title">
    <h1>${title}</h1>
  </div>
  ${renderChildren(node.children, renderNode)}
</div>`
}

function renderNode(node) {
  let html = ''

  switch (node.type) {
    case blockMap.text:
      html = renderText(node, renderNode)
      break
    case blockMap.header:
      html = renderHeader(node, renderNode, 2)
      break
    case blockMap.subHeader:
      html = renderHeader(node, renderNode, 3)
      break
    case blockMap.subSubHeader:
      html = renderHeader(node, renderNode, 4)
      break
    case blockMap.columnList:
      html = renderColumnList(node, renderNode)
      break
    case blockMap.unorderedList:
      html = renderUnorderedList(node, renderNode)
      break
    case blockMap.orderedList:
      html = renderOrderedList(node, renderNode)
      break
    case blockMap.toggle:
      html = renderToggle(node, renderNode)
      break
    case blockMap.toDo:
      html = renderToDo(node, renderNode)
      break
    case blockMap.divider:
      html = renderDivider(node, renderNode)
      break
    case blockMap.quote:
      html = renderQuote(node, renderNode)
      break
    case blockMap.callout:
      html = renderCallout(node, renderNode)
      break
    case blockMap.image:
      html = renderImage(node, renderNode)
      break
    case blockMap.bookmark:
      html = renderBookmark(node, renderNode)
      break
    case blockMap.code:
      html = renderCode(node, renderNode)
      break
    default:
      raiseWarning(`No render function for ${node.type}. Ignored.`)
  }

  return html
}