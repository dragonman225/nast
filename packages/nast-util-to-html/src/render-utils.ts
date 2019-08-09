import { Nast, Notion } from '../../types/src'

import blockMap from './block-map'
import colorMap from './color-map'
import renderCode from './render-utils-prismjs'
import { convertNotionURLToLocalLink } from './notion-utils'
import { raiseWarning } from './log-utils'
import { CSS } from './constants'

/**
 * Render children nodes.
 * @param {*} nodeArray - Children nodes to render.
 * @param {*} renderNext - Render controller that will assign a node to 
 * a corresponding render function when iterating through nodeArray.
 * @returns {String} HTML.
 */
function renderChildren(
  nodeArray: Nast.Block[],
  renderNext: Function
): string {
  let childrenHTMLArr = nodeArray.map(node => {
    /** PseudoBlock does not have id! */
    let html = `\
<div ${node.id ? `id="${node.id}"` : ''}>
  ${renderNext(node)}
</div>`
    return html
  })
  return childrenHTMLArr.join('')
}

/**
 * Render a block.
 * @param {Block} node 
 * @param {String} contentHTML
 * @returns {String} 
 */
function renderBlock(
  node: Nast.Block,
  contentHTML: string,
  tag: string = 'div'
): string {
  let blockColorClass = node.color ? renderColor(node.color) : ''
  let html = `\
<${tag} class="${CSS.blockClass} ${CSS.blockClass}--${node.type} ${blockColorClass}">
  ${contentHTML}
</${tag}>`
  return html
}

/**
 * Render styled strings.
 * @param {StyledString[]} titleTokens
 * @returns {String} HTML
 */
function renderTitle(
  titleTokens: Notion.StyledString[] = [],
  isCode?: boolean,
  lang?: string
): string {
  let textArr = titleTokens.map(token => {
    let text = token[0]
    if (isCode) {
      text = renderCode(text, lang)
    } else {
      text = escapeString(text)
    }
    let textStyles = token[1]
    let html = text
    if (textStyles) {
      html = styleToHTML(text, textStyles)
    }
    return html
  })

  let html = `\
<span>${textArr.join('')}</span>`
  return html
}

/**
 * Render a styled string.
 * @param {String} text 
 * @param {TextStyle[]} styles 
 * @returns {String} HTML
 */
function styleToHTML(
  text: string,
  styles: Notion.TextStyle[]
): string {
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
        let color = styles[i][1] as string
        html = `<span class="${renderColor(color)}">${html}</span>`
        break
      /* Inline Mention User */
      case 'u':
        html = `<span class="color-mention">@user_id:${styles[i][1]}</span>`
        break
      /* Inline Mention Page */
      case 'p':
        html = `<span class="color-mention">@page_id:${styles[i][1]}</span>`
        break
      /* Inline Mention Date */
      case 'd':
        let date = styles[i][1] as Notion.InlineDate
        html = `<span class="color-mention">@${date.start_date}</span>`
        break
      /* Comment */
      case 'm':
        html = `<span class="color-comment">${html}</span>`
        break
      default:
        raiseWarning(`Unsupported style: ${styles[i][0]}`)
    }
  }

  return html
}

/**
 * Map color string in NAST to another string that is intended to use
 * as a CSS class.
 * @param {String} str 
 * @returns {String}
 */
function renderColor(
  str: string
): string {
  const colorPrefix = CSS.colorClassPrefix
  const colorBgPrefix = CSS.bgColorClassPrefix
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

/**
 * Escape special characters in a string.
 * @param {String} str 
 * @returns {String}
 */
function escapeString(
  str: string
): string {
  let character, escapedString = ''

  for (let i = 0; i < str.length; ++i) {
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

/**
 * Add BulletedList and NumberedList helper blocks to the tree, 
 * so it's easier to render.
 * @param treeRoot 
 */
function preRenderTransform(
  treeRoot: Nast.Block
): Nast.Block {
  let newChildren = []
  let children = treeRoot.children
  let list, prevState = 0

  /**
   * State
   * normal: 0, bulleted: 1, numbered: 2
   */

  for (let i = 0; i < children.length; ++i) {
    let block = children[i]
    /**
     * Fill helper blocks with dummy property values to make 
     * the new tree meet the NAST spec.
     */
    let dummyBlock = {
      id: '',
      createdTime: 0,
      lastEditedTime: 0
    }

    if (block.children.length !== 0) {
      block = preRenderTransform(block)
    }

    if (block.type === blockMap.bulletedListItem) {
      if (prevState === 1) {
        if (list != null) list.children.push(block)
        else raiseWarning(`preRenderTransform panic:\
 Push child ${block.id} to undefined list`)
      } else {
        list = {
          type: blockMap.bulletedList,
          children: [block],
          ...dummyBlock
        }
        newChildren.push(list)
      }
      prevState = 1
    } else if (block.type === blockMap.numberedListItem) {
      if (prevState === 2) {
        if (list != null) list.children.push(block)
        else raiseWarning(`preRenderTransform panic:\
 Push child ${block.id} to undefined list`)
      } else {
        list = {
          type: blockMap.numberedList,
          children: [block],
          ...dummyBlock
        }
        newChildren.push(list)
      }
      prevState = 2
    } else {
      newChildren.push(block)
      prevState = 0
    }
  }

  let newTree = { ...treeRoot }
  newTree.children = newChildren
  return newTree
}

export {
  renderChildren,
  renderBlock,
  renderTitle,
  renderColor,
  escapeString,
  preRenderTransform
}