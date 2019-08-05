'use strict'
const blockMap = require('./block-map')
const {
  renderText,
  renderHeading,
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
  renderEmbed,
  renderAudio,
  renderCode,
  renderEquation
} = require('./render-blocks')
const { renderChildren } = require('./render-utils')
const { raiseWarning } = require('./log-utils')

module.exports = {
  renderRoot,
  renderNode
}

/**
 * Render NAST to HTML with given root node.
 * @param {Root} node 
 * @param {String} elemId 
 * @returns {String}
 */
function renderRoot(node, elemClass = 'nast-document') {
  /**
   * The root node can be any type of block, if it's a "page" block it 
   * will be treated specially.
   */
  if (node.type === 'page') {
    let title = node.title
    let icon = node.icon ? node.icon : ''
    let cover = node.cover ? node.cover : '#'
    let fullWidth = typeof node.fullWidth !== 'undefined'
      ? node.fullWidth : false

    let containerClass = fullWidth
      ? `${elemClass}-full` : `${elemClass}`

    return `\
<div class="${containerClass}">
  <img src="${cover}">
  <div id="${node.id}" class="page-title">
    <div class="page-icon">${icon}</div>
    <h1>${title}</h1>
  </div>
  ${renderChildren(node.children, renderNode)}
</div>`
  } else {
    return `\
<div class="${elemClass}">
  ${renderNode(node)}
</div>`
  }
}

function renderNode(node) {
  let html = ''

  switch (node.type) {
    case blockMap.text:
      html = renderText(node, renderNode)
      break
    case blockMap.heading:
      html = renderHeading(node, renderNode)
      break
    case blockMap.columnList:
      html = renderColumnList(node, renderNode)
      break
    case blockMap._unorderedList:
      html = renderUnorderedList(node, renderNode)
      break
    case blockMap._orderedList:
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
    case blockMap.embed:
    case blockMap.video:
      html = renderEmbed(node, renderNode)
      break
    case blockMap.audio:
      html = renderAudio(node, renderNode)
      break
    case blockMap.code:
      html = renderCode(node, renderNode)
      break
    case blockMap.equation:
      html = renderEquation(node, renderNode)
      break
    default:
      raiseWarning(`No render function for ${node.type}. Ignored.`)
  }

  return html
}