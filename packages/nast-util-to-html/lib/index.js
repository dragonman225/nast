'use strict'

const blockMap = require('./block-map')
const {
  renderText,
  renderHeader,
  renderColumnList,
  renderBulletedList,
  renderNumberedList,
  renderToggle,
  renderToDo,
  renderDivider,
  renderQuote,
  renderCallout,
  renderImage,
  renderBookmark,
  renderPage,
} = require('./render-utils')

module.exports = toHTML

function toHTML(tree) {

  return renderNode(tree)

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
    case blockMap.bulletedList:
      html = renderBulletedList(node, renderNode)
      break
    case blockMap.numberedList:
      html = renderNumberedList(node, renderNode)
      break
    case blockMap.toDo:
      html = renderToDo(node, renderNode)
      break
    case blockMap.toggle:
      html = renderToggle(node, renderNode)
      break
    case blockMap.divider:
      html = renderDivider()
      break
    case blockMap.quote:
      html = renderQuote(node, renderNode)
      break
    case blockMap.callout:
      html = renderCallout(node)
      break
    case blockMap.image:
      html = renderImage(node)
      break
    case blockMap.bookmark:
      html = renderBookmark(node, renderNode)
      break
    case blockMap.page:
      html = renderPage(node, renderNode)
      break
    default:
      log(`No implementation for ${node.type}. Ignored.`)
  }

  return html

}

function log() {
  console.log.apply(console, arguments)
}