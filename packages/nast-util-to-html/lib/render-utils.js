const colorMap = require('./color-map')
const blockMap = require('./block-map')
const { raiseWarning } = require('./log-utils')
const { convertNotionURLToLocalLink } = require('./notion-utils')

module.exports = {
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
  renderPage
}

function renderText(node, renderNext) {
  let blockColor = getBlockColor(node)

  let html = `
  <div class="block ${blockColor}" style="padding: 3px 2px;">
    <div>${renderTitle(node.data ? node.data.title : [])}</div>
    <div class="indent">
      ${renderChildren(node.children, renderNext)}
    </div>
  </div>
  `

  return html
}

function renderHeader(node, renderNext, level) {
  switch (level) {
    case 1:
      return `<h1>${renderTitle(node.data ? node.data.title : [])}</h1>`
    case 2:
      return `<h2>${renderTitle(node.data ? node.data.title : [])}</h2>`
    case 3:
      return `<h3>${renderTitle(node.data ? node.data.title : [])}</h3>`
    default:
      return `<h4>${renderTitle(node.data ? node.data.title : [])}</h4>`
  }
}

function renderColumnList(node, renderNext) {
  let numOfColumns = node.children.length
  let columnArrHTML = node.children.map((column, i) => renderColumn(column, renderNext, i === 0, numOfColumns))
  let html = `
  <div class="${blockMap.columnList}" style="display: flex; flex-wrap: wrap;">
    ${columnArrHTML.join('')}
  </div>`
  return html
}

function renderColumn(node, renderNext, isFirst, numOfColumns) {

  if (node.type !== blockMap.column) {
    raiseWarning(`Non-column node in column_list. Block ID: ${node['raw_value'].id}`)
    return ''
  }

  let columnSpacing = 46
  let margin = isFirst ? '' : `margin-left: ${columnSpacing}px;`
  let columnRatio = node['raw_value'].format['column_ratio']
  let width = `width: calc((100% - ${columnSpacing * (numOfColumns - 1)}px) * ${columnRatio});`
  let html =`
  <div class="${blockMap.column}" style="${margin} ${width} word-break: break-word;">
    ${renderChildren(node.children, renderNext)}
  </div>`

  return html
}

function renderBulletedList(node, renderNext) {
  let html = `
  <ul>
    <li>
      <div>${renderTitle(node.data ? node.data.title : [])}</div>
      ${renderChildren(node.children, renderNext)}
    </li>
  </ul>`
  return html
}

function renderNumberedList(node, renderNext) {
  let html = `\
  <ol>
    <li>
      <div>${renderTitle(node.data ? node.data.title : [])}</div>
      ${renderChildren(node.children, renderNext)}
    </li>
  </ol>
  `
  return html
}

function renderToggle(node, renderNext) {
  let html = `\
  <details>
    <summary>${renderTitle(node.data ? node.data.title : [])}</summary>
    <div>${renderChildren(node.children, renderNext)}</div>
  </details>
  `
  return html
}

function renderToDo(node, renderNext) {
  let childrenHTMLArr = node.children.map(child => `<div>${renderNext(child)}</div>`)
  let unCheckedIconHTML = '<div style="margin-right: 4px; width: 24px; flex-grow: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: calc((1.5em + 3px) + 3px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s;"><div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"><svg viewBox="0 0 16 16" style="width: 100%; height: 100%; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden;"><path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path></svg></div></div></div>'
  let checkedIconHTML = '<div style="margin-right: 4px; width: 24px; flex-grow: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: calc((1.5em + 3px) + 3px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s; background: rgb(46, 170, 220);"><div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"><svg viewBox="0 0 14 14" style="width: 12px; height: 12px; display: block; fill: white; flex-shrink: 0; backface-visibility: hidden;"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg></div></div></div>'
  let checked = node.data.checked ? (node.data.checked[0][0] === 'Yes' ? true : false) : false
  let html = `\
  <div>
    <div style="display: flex; align-items: flex-start;">
      ${checked ? checkedIconHTML : unCheckedIconHTML}
      <div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column; justify-content: center; padding-top: 2px; padding-bottom: 2px; ${checked ? 'opacity: 0.375;' : ''}">
        ${checked ? '<s>' : ''}${renderTitle(node.data ? node.data.title : [])}${checked ? '</s>' : ''}
      </div>
    </div>
    <div class="indent">${childrenHTMLArr.join('')}</div>
  </div>
  `
  return html
}

function renderDivider() {
  let html = `
  <div class="${blockMap.divider}" style="width: 100%; border: 1px solid rgba(55, 53, 47, 0.09); margin: 7px 0;"></div>`
  return html
}

function renderQuote(node) {
  let html = `\
  <blockquote>
    ${renderTitle(node.data ? node.data.title : [])}
  </blockquote>
  `
  return html
}

function renderCallout(node) {
  let blockColor = getBlockColor(node, colorMap.yellowBg)
  let pageIcon

  if (node['raw_value'].format) {
    pageIcon = node['raw_value'].format['page_icon']
      ? node['raw_value'].format['page_icon'] : ''
  }

  let html = `\
  <div class="${blockColor}" style="display: flex; border-radius: 5px; padding: 0.5em 13px;">
    <div>
      ${pageIcon}
    </div>
    <div style="margin-left: 8px;">
      ${renderTitle(node.data ? node.data.title : [])}
    </div>
  </div>
  `

  return html
}

function renderImage(node) {
  let width = node['raw_value'].format['block_width']
  let source = node.data.source[0][0]

  let html = `\
  <div style="width: ${width}px; margin: 0.5em auto; max-width: 100%;">
    <img src="${source}" style="width: 100%; object-fit: cover;">
  </div>
  `

  return html
}

function renderBookmark(node) {
  let title = node.data.title ? node.data.title[0][0] : ''
  let description = node.data.description ? node.data.description[0][0] : ''
  let link = node.data.link[0][0]
  let iconURL = void 0
  let coverURL = void 0

  if (node['raw_value'].format) {
    iconURL = node['raw_value'].format['bookmark_icon']
      ? node['raw_value'].format['bookmark_icon'] : void 0
    coverURL = node['raw_value'].format['bookmark_cover']
      ? node['raw_value'].format['bookmark_cover'] : void 0
  }

  let iconImg = iconURL ? `<img src="${iconURL}" style="width: 16px; height: 16px; min-width: 16px; margin-right: 4px;">` : ''
  let coverImg = coverURL ? `<img src="${coverURL}" style="display: block; object-fit: cover; border-radius: 1px; width: 100%; height: 100%;">` : ''

  let html = `\
  <div class="${blockMap.bookmark}" style="margin: 8px 0;">
    <div style="display: flex;">
      <div style="display: flex; text-align: left; overflow: hidden; border: 1px solid rgba(55, 53, 47, 0.16); border-radius: 0.7rem; position: relative; flex-grow: 1; color: rgb(55, 53, 47);">
        <div style="min-height: 1rem; overflow: hidden; text-align: left;">
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
    </div>
  </div>
  `
  return html
}

function renderChildren(nodeArray, renderNext) {
  let childrenHTMLArr = nodeArray.map(node => {
    let blockColor = getBlockColor(node)
    let html = `
    <div id="${node.id}" class="block ${blockColor}">
      ${renderNext(node)}
    </div>
    `
    return html
  })
  return childrenHTMLArr.join('')
}

function renderTitle(titleTokens) {

  let textArr = titleTokens.map(token => {
    let text = escapeString(token[0])
    let textStyles = token[1]
    let html = text
    if (textStyles) {
      html = styleToHTML(text, textStyles)
    }
    return html
  })

  let html = `\
  <span>
    ${textArr.join('')}
  </span>
  `

  return html

}

function renderPage(node, renderNext) {
  let html = `\
  <div>
    <h1>${node.data.title[0][0]}</h1>
    <div>
      ${renderChildren(node.children, renderNext)}
    </div>
  </div>`
  return html
}

function styleToHTML(text, styles) {

  let html = text

  for (let i = styles.length - 1; i >= 0; --i) {
    switch (styles[i][0]) {
      /* Bold */
      case 'b':
        html = `<strong>${html}</strong>`
        break
      /* Italic */
      case 'i':
        html = `<em>${html}</em>`
        break
      /* Strike */
      case 's':
        html = `<del>${html}</del>`
        break
      /* Link */
      case 'a':
        html = `<a href="${convertNotionURLToLocalLink(styles[i][1])}">${html}</a>`
        break
      /* Inline Code */
      case 'c':
        html = `<code>${html}</code>`
        break
      /* Color or Background Color */
      case 'h':
        html = `<span class="${renderColor(styles[i][1])}">${html}</span>`
        break
      /* Inline Mention User */
      case 'u':
        html = `<span>@user_id:${styles[i][1]}</span>`
        break
      /* Inline Mention Page */
      case 'p':
        html = `<span>@page_id:${styles[i][1]}</span>`
        break
      /* Inline Mention Date */
      case 'd':
        html = `<span>@${styles[i][1].start_date}</span>`
        break
      /* Comment */
      case 'm':
        html = `<span style="background: rgba(255,212,0,0.14); border-bottom: 2px solid rgb(255, 212, 0);">${html}</span>`
        break
      default:
        console.log(`Unsupported style: ${styles[i][0]}`)
    }
  }

  return html

}

function getBlockColor(node, defaultColor = '') {
  let blockColor

  if (node['raw_value'].format) {
    blockColor = node['raw_value'].format['block_color']
      ? node['raw_value'].format['block_color'] : defaultColor
  } else {
    blockColor = defaultColor
  }

  blockColor = renderColor(blockColor)

  return blockColor
}

function renderColor(str) {
  const colorPrefix = 'color-'
  const colorBgPrefix = 'background-'
  switch (str) {
    case colorMap.gray:
      return colorPrefix + 'gray'
    case colorMap.brown:
      return colorPrefix + 'brown'
    case colorMap.orange:
      return colorPrefix + 'orange'
    case colorMap.yellow:
      return colorPrefix + 'yellow'
    case colorMap.green:
      return colorPrefix + 'green'
    case colorMap.blue:
      return colorPrefix + 'blue'
    case colorMap.purple:
      return colorPrefix + 'purple'
    case colorMap.pink:
      return colorPrefix + 'pink'
    case colorMap.red:
      return colorPrefix + 'red'
    case colorMap.grayBg:
      return colorBgPrefix + 'gray'
    case colorMap.brownBg:
      return colorBgPrefix + 'brown'
    case colorMap.orangeBg:
      return colorBgPrefix + 'orange'
    case colorMap.yellowBg:
      return colorBgPrefix + 'yellow'
    case colorMap.greenBg:
      return colorBgPrefix + 'green'
    case colorMap.blueBg:
      return colorBgPrefix + 'blue'
    case colorMap.purpleBg:
      return colorBgPrefix + 'purple'
    case colorMap.pinkBg:
      return colorBgPrefix + 'pink'
    case colorMap.redBg:
      return colorBgPrefix + 'red'
    default:
      return str
  }
}

function escapeString(str) {
  let character, escapedString = ''

  for (let i = 0; i < str.length; i += 1) {
    character = str.charAt(i)
    switch (character) {
      case '<':
        escapedString += '&lt;'
        break
      case '>':
        escapedString += '&gt;'
        break
      case '&':
        escapedString += '&amp;'
        break
      case '/':
        escapedString += '&#x2F;'
        break
      case '"':
        escapedString += '&quot;'
        break
      case '\'':
        escapedString += '&#x27;'
        break
      default:
        escapedString += character
    }
  }

  return escapedString
}
