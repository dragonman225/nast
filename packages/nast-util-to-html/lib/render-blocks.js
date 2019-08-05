'use strict'
const katex = require('katex')

const blockMap = require('./block-map')
const colorMap = require('./color-map')
const {
  renderChildren,
  renderBlock,
  renderTitle,
  renderColor
} = require('./render-utils')
const { raiseWarning } = require('./log-utils')

const blockClass = 'block'
const blockIndent = 'block--indent'

module.exports = {
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
}

/**
 * Block: PlainText
 * @param {PlainText} node 
 * @param {Function} renderNext 
 * @returns {String} 
 */
function renderText(node, renderNext) {
  let blockColorClass = node.color ? renderColor(node.color) : ''

  let content = `\
<div class="${blockClass} ${blockClass}--${blockMap.text} ${blockColorClass}">
  ${renderTitle(node.text)}
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
function renderHeading(node) {
  let blockColorClass = node.color ? renderColor(node.color) : ''
  let textHTML = renderTitle(node.text)
  let content = ''

  if (node.depth < 6 && node.depth > 0) {
    content = `<h${node.depth + 1}>${textHTML}</h${node.depth + 1}>`
  } else {
    content = `<h6>${textHTML}</h6>`
  }

  let html = `\
<div class="${blockClass} ${blockColorClass}">
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
  let columnRatio = node.ratio
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
  let content = renderTitle(node.text)

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

/**
 * Block: ToggleList
 * @param {ToggleList} node 
 * @param {Function} renderNext 
 * @returns {String}
 */
function renderToggle(node, renderNext) {
  let content = renderTitle(node.text)
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
  let unCheckedIconHTML = '<div style="margin-right: 4px; width: 24px; flex-grow: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: calc(1.5em + 6px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s;"><div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"><svg viewBox="0 0 16 16" style="width: 100%; height: 100%; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden;"><path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path></svg></div></div></div>'
  let checkedIconHTML = '<div style="margin-right: 4px; width: 24px; flex-grow: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: calc(1.5em + 6px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s; background: rgb(46, 170, 220);"><div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"><svg viewBox="0 0 14 14" style="width: 12px; height: 12px; display: block; fill: white; flex-shrink: 0; backface-visibility: hidden;"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg></div></div></div>'
  let checked = node.checked

  let content = `\
<div style="display: flex; align-items: flex-start;">
  ${checked ? checkedIconHTML : unCheckedIconHTML}
  <div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column; justify-content: center; padding-top: 2px; padding-bottom: 2px; min-height: calc(1.5em + 6px); ${checked ? 'opacity: 0.375;' : ''}">
    ${checked ? '<s>' : ''}${renderTitle(node.text)}${checked ? '</s>' : ''}
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
  ${renderTitle(node.text)}
</blockquote>`
  return renderBlock(node, content)
}

/**
 * Block: Callout
 * @param {Callout} node 
 * @returns {String}
 */
function renderCallout(node) {

  let content = `\
<div>
  ${node.icon ? node.icon : ''}
</div>
<div style="margin-left: 8px;">
  ${renderTitle(node.text)}
</div>`

  return renderBlock(node, content, colorMap.yellowBg)
}

/**
 * Block: Image
 * @param {Image} node
 * @returns {String} 
 */
function renderImage(node) {
  let width = node.fullWidth ? '100%' : `${node.width}px`
  let source = node.source

  let content = `\
<div style="width: ${width}; margin: 0.5em auto; max-width: 100%;">
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
  let title = node.title ? node.title : ''
  let link = node.link

  let content = `\
<div style="display: flex;">
  <div style="display: flex; text-align: left; overflow: hidden; border: 1px solid rgba(55, 53, 47, 0.16); border-radius: 0.7rem; position: relative; flex-grow: 1; color: rgb(55, 53, 47);">
    <div style="min-height: 1rem; overflow: hidden; text-align: left; width: 100%;">
      <a href="${link}" target="_blank" rel="noopener noreferrer" style="display: block; color: inherit; text-decoration: none;">
        <div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; width: 100%; display: block; padding: 16px;">
          <div style="font-size: 14px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${title}</div>
          <div style="font-size: 12px; display: flex; overflow: hidden; padding-top: 3px;">
            <div style="font-size: 12px; min-width: 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${link}</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>`
  return renderBlock(node, content)
}

/**
 * Block: Video
 * @param {Nast.Embed} node
 * @returns {String}
 */
function renderEmbed(node) {
  let width = node.fullWidth ? '100%' : `${node.width}px`
  let source = node.source
  let aspectRatio = node.aspectRatio * 100

  let iframeSandbox = 'allow-scripts allow-popups allow-forms allow-same-origin'
  let iframeStyle = 'position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px; pointer-events: auto; background-color: rgb(247, 246, 245);'

  let content = `\
<div style="width: ${width};">
  <div style="position: relative; min-height: 100px; height: 0; padding-bottom: ${aspectRatio}%;">
    <iframe src="${source}" frameborder="0" sandbox="${iframeSandbox}" allowfullscreen style="${iframeStyle}"></iframe>
  </div>
</div>`

  return renderBlock(node, content)
}

/**
 * Block: Audio
 * @param {Nast.Audio} node 
 * @returns {string}
 */
function renderAudio(node) {
  let content = `\
<audio controls>
  <source src="${node.source}">
</audio>
  `
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
${renderTitle(node.text, true, node.language)}
  </code>
</pre>`
  return renderBlock(node, content)
}

function renderEquation(node) {
  let katexOpts = {
    throwOnError: false,
    displayMode: true
  }
  let content = katex.renderToString(node.latex, katexOpts)
  return renderBlock(node, content)
}