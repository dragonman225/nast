'use strict'
const blockMap = require('./block-map')
const colorMap = require('./color-map')
const {
  renderChildren,
  renderBlock,
  renderTitle,
  getBlockColor
} = require('./render-utils')
const { raiseWarning } = require('./log-utils')
const blockClass = 'block'
const blockIndent = 'block--indent'

module.exports = {
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
}

/**
 * Block: PlainText
 * @param {PlainText} node 
 * @param {Function} renderNext 
 * @returns {String} 
 */
function renderText(node, renderNext) {
  let blockColor = getBlockColor(node)

  let content = `\
<div class="${blockClass} ${blockColor}">
  ${renderTitle(node.data ? node.data.title : [])}
</div>`

  let childrenContent = ''
  if (node.children.length > 0) {
    childrenContent = `\
<div class="${blockIndent}">
  ${renderChildren(node.children, renderNext)}
</div>`
  }

  return content + childrenContent
}

/**
 * Block: Heading
 * @param {Heading} node 
 * @param {Function} renderNext 
 * @param {Number} level 
 * @returns {String} 
 */
function renderHeader(node, renderNext, level) {
  let blockColor = getBlockColor(node)

  let content
  switch (level) {
    case 1:
      content = `<h1>${renderTitle(node.data ? node.data.title : [])}</h1>`
      break
    case 2:
      content = `<h2>${renderTitle(node.data ? node.data.title : [])}</h2>`
      break
    case 3:
      content = `<h3>${renderTitle(node.data ? node.data.title : [])}</h3>`
      break
    default:
      content = `<h4>${renderTitle(node.data ? node.data.title : [])}</h4>`
  }

  let html = `\
<div class="${blockClass} ${blockColor}">
  ${content}
</div>`

  return html
}

/**
 * HiddenBlock: ColumnList
 * @param {ColumnList} node 
 * @param {Function} renderNext 
 * @returns {String} 
 */
function renderColumnList(node, renderNext) {
  let numOfColumns = node.children.length
  let columnArrHTML = node.children.map((column, i) => {
    return renderColumn(column, renderNext, i === 0, numOfColumns)
  })

  let html = `\
<div class="${blockMap.columnList}" style="display: flex; flex-wrap: wrap;">
  ${columnArrHTML.join('')}
</div>`

  return html
}

/**
 * HiddenBlock: Column
 * @param {Column} node 
 * @param {Function} renderNext 
 * @param {Boolean} isFirst 
 * @param {Number} numOfColumns 
 * @returns {String}
 */
function renderColumn(node, renderNext, isFirst, numOfColumns) {
  if (node.type !== blockMap.column) {
    raiseWarning(`Non-column node in column_list. Block ID: ${node['raw_value'].id}`)
    return ''
  }

  let columnSpacing = 46
  let margin = isFirst ? '' : `margin-left: ${columnSpacing}px;`
  let columnRatio = node['raw_value'].format['column_ratio']
  let width = `width: calc((100% - ${columnSpacing * (numOfColumns - 1)}px) * ${columnRatio});`

  let html = `\
<div class="${blockMap.column}" style="${margin} ${width} word-break: break-word;">
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

/**
 * PseudoBlock: UnorderedList
 * @param {UnorderedList} node 
 * @param {Function} renderNext 
 * @returns {String}
 */
function renderUnorderedList(node, renderNext) {
  let listItemsHTML = node.children.map(listItem => {
    return renderListItem(listItem, renderNext)
  })
  let html = `\
<ul>
  ${listItemsHTML.join('')}
</ul>`
  return html
}

/**
 * PseudoBlock: OrderedList
 * @param {OrderedList} node 
 * @param {Function} renderNext 
 * @returns {String}
 */
function renderOrderedList(node, renderNext) {
  let listItemsHTML = node.children.map(listItem => {
    return renderListItem(listItem, renderNext)
  })
  let html = `\
<ol>
  ${listItemsHTML.join('')}
</ol>`
  return html
}

/**
 * Block: ListItem
 * @param {ListItem} node 
 * @param {Function} renderNext 
 * @returns {String}
 */
function renderListItem(node, renderNext) {
  let content = renderTitle(node.data ? node.data.title : [])

  let childrenContent = ''
  if (node.children.length > 0) {
    childrenContent = `\
<div class="${blockIndent}">
  ${renderChildren(node.children, renderNext)}
</div>`
  }

  /**
   * Without ul, some content become out of container.
   * But ul has its own indent padding, so we don't need the indent class.
   */
  let html = `\
<li>
  ${renderBlock(node, content)}
  ${renderChildren(node.children, renderNext)}
</li>`

  return html
}

/**
 * Block: ToggleList
 * @param {ToggleList} node 
 * @param {Function} renderNext 
 * @returns {String}
 */
function renderToggle(node, renderNext) {
  let content = renderTitle(node.data ? node.data.title : [])
  let block = renderBlock(node, content, '', 'summary')
  let html = `\
<details>
  ${block}
  <div class="${blockIndent}">
    ${renderChildren(node.children, renderNext)}
  </div>
</details>`
  return html
}

/**
 * Block: ToDoList
 * !!! This function should be re-written once new AST has been ready.
 * @param {ToDoList} node 
 * @param {Function} renderNext 
 * @returns {String}
 */
function renderToDo(node, renderNext) {
  let unCheckedIconHTML = '<div style="margin-right: 4px; width: 24px; flex-grow: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: calc(1.5em + 3px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s;"><div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"><svg viewBox="0 0 16 16" style="width: 100%; height: 100%; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden;"><path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path></svg></div></div></div>'
  let checkedIconHTML = '<div style="margin-right: 4px; width: 24px; flex-grow: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: calc(1.5em + 3px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s; background: rgb(46, 170, 220);"><div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"><svg viewBox="0 0 14 14" style="width: 12px; height: 12px; display: block; fill: white; flex-shrink: 0; backface-visibility: hidden;"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg></div></div></div>'
  let checked = node.data.checked ? (node.data.checked[0][0] === 'Yes' ? true : false) : false

  let content = `\
<div style="display: flex; align-items: flex-start;">
  ${checked ? checkedIconHTML : unCheckedIconHTML}
  <div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column; justify-content: center; padding-top: 2px; padding-bottom: 2px; min-height: calc(1.5em + 3px); ${checked ? 'opacity: 0.375;' : ''}">
    ${checked ? '<s>' : ''}${renderTitle(node.data ? node.data.title : [])}${checked ? '</s>' : ''}
  </div>
</div>`

  let childrenContent = ''
  if (node.children.length > 0) {
    childrenContent = `\
<div class="${blockIndent}">
  ${renderChildren(node.children, renderNext)}
</div>`
  }

  let html = `\
${renderBlock(node, content)}
${childrenContent}`

  return html
}

/**
 * Block: Divider
 * @param {Divider} node
 * @returns {String}
 */
function renderDivider(node) {
  let content = '\
<div style="width: 100%; border: 1px solid rgba(55, 53, 47, 0.09);"></div>'
  return renderBlock(node, content)
}

/**
 * Block: Quote
 * @param {Quote} node 
 * @returns {String}
 */
function renderQuote(node) {
  let content = `\
<blockquote>
  ${renderTitle(node.data ? node.data.title : [])}
</blockquote>`
  return renderBlock(node, content)
}

/**
 * Block: Callout
 * @param {Callout} node 
 * @returns {String}
 */
function renderCallout(node) {
  let pageIcon
  if (node['raw_value'].format) {
    pageIcon = node['raw_value'].format['page_icon']
      ? node['raw_value'].format['page_icon'] : ''
  }

  let content = `\
<div>
  ${pageIcon}
</div>
<div style="margin: 3px 0; margin-left: 8px;">
  ${renderTitle(node.data ? node.data.title : [])}
</div>`

  return renderBlock(node, content, colorMap.yellowBg)
}

/**
 * Block: Image
 * @param {Image} node
 * @returns {String} 
 */
function renderImage(node) {
  let width = node['raw_value'].format['block_width']
  let source = node.data.source[0][0]

  let content = `\
<div style="width: ${width}px; margin: 0.5em auto; max-width: 100%;">
  <img src="${source}" style="width: 100%; object-fit: cover;">
</div>`

  return renderBlock(node, content)
}

/**
 * Block: WebBookmark
 * !!! This should be replaced with more efficient implementation.
 * @param {WebBookmark} node
 * @returns {String} 
 */
function renderBookmark(node) {
  let title = node.data.title ? node.data.title[0][0] : ''
  let description = node.data.description ? node.data.description[0][0] : ''
  let link = node.data.link[0][0]
  let iconURL
  let coverURL

  if (node['raw_value'].format) {
    iconURL = node['raw_value'].format['bookmark_icon']
      ? node['raw_value'].format['bookmark_icon'] : undefined
    coverURL = node['raw_value'].format['bookmark_cover']
      ? node['raw_value'].format['bookmark_cover'] : undefined
  }

  let iconImg = iconURL ? `<img src="${iconURL}" style="width: 16px; height: 16px; min-width: 16px; margin-right: 4px;">` : ''
  let coverImg = coverURL ? `<img src="${coverURL}" style="display: block; object-fit: cover; border-radius: 1px; width: 100%; height: 100%;">` : ''

  let content = `\
<div style="display: flex;">
  <div style="display: flex; text-align: left; overflow: hidden; border: 1px solid rgba(55, 53, 47, 0.16); border-radius: 0.7rem; position: relative; flex-grow: 1; color: rgb(55, 53, 47);">
    <div style="min-height: 1rem; overflow: hidden; text-align: left; width: 100%;">
      <a href="${link}" target="_blank" rel="noopener noreferrer" style="display: block; color: inherit; text-decoration: none;">
        <div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; width: 100%; display: block; padding: 1rem;">
          <div style="font-size: 14px; overflow: hidden;">${title}</div>
          <div style="font-size: 12px; display: flex; overflow: hidden;">
            <div style="min-width: 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${link}</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>`
  return renderBlock(node, content)
}

/**
 * Block: Code
 * @param {Code} node 
 * @returns {String}
 */
function renderCode(node) {
  let content = `\
<pre>
  <code>
${renderTitle(node.data ? node.data.title : [])}
  </code>
</pre>`
  return renderBlock(node, content)
}