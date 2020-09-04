/** Import scripts. */
import { parse } from 'orga'
import visit from 'unist-util-visit'

/** Import types. */
import * as NAST from "nast-types"

function orgStringToNast(str: string): NAST.Page {
  let ast = parse(str)
  visit(ast, transformNode)
  return ast as unknown as NAST.Page
}

function transformNode(node, index) {

  /** Populate general props */
  if (!node.children) node.children = []
  node.id = ''
  node.createdTime = 0
  node.lastEditedTime = 0

  switch (node.type) {
    case 'root':
      node.type = 'page'
      delete node.meta
      break
    case 'paragraph':
      node.type = 'text'
      node.title = [[node.children[0].value]]
      node.children = [] // There should be no other section in paragraph
      break
    case 'section':
      node.type = 'toggle'
      node.title = [[node.children[0].children[0].value]] // Use headline as title.
      node.children.shift() // Remove headline
      break
    case 'list': {
      const transformedChildren = []
      for (let i = 0; i < node.children.length; i++) {
        const childNode = node.children[i]
        if (node.ordered) {
          childNode.type = 'numbered_list'
        } else {
          childNode.type = 'bulleted_list'
        }
        childNode.title = [[childNode.children[0] ? childNode.children[0].value : '']]
        childNode.children = []
        delete childNode.parent
        transformedChildren.push(childNode)
      }
      node.parent.children.splice(index, 1, ...transformedChildren)
      break
    }
    default: {
      if ((node.type !== 'numbered_list') || (node.type !== 'bulleted_list')) {
        console.log(`Unsupported type ${node.type}`)
        console.log(node)
      }
    }
  }

  if (node.level) delete node.level
  delete node.parent

}

export {
  orgStringToNast
}