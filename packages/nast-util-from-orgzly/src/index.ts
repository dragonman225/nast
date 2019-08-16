import { Nast } from '../../types/src'

import { parse } from 'orga'
import visit from 'unist-util-visit'

function orgStringToNast(str: string): Nast.Page {
  let ast = parse(str)
  visit(ast, transformNode)
  return ast
}

function transformNode(node) {

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
      node.text = [[node.children[0].value]]
      node.children = [] // There should be no other section in paragraph
      break
    case 'section':
      node.type = 'toggle'
      node.text = [[node.children[0].children[0].value]] // Use headline as title.
      node.children.shift() // Remove headline
      break
    case 'list':
      if (node.ordered) {
        node.type = 'numbered_list'
      } else {
        node.type = 'bulleted_list'
      }
      break
    case 'list.item':
      if (node.parent.ordered) {
        node.type = 'numbered_list_item'
      } else {
        node.type = 'bulleted_list_item'
      }
      node.text = [[ node.children[0].value ]]
      node.children = []
      break
    default:
      console.log(`Unsupported type ${node.type}`)
      console.log(node)
  }

  if (node.level) delete node.level
  delete node.parent

}

export {
  orgStringToNast
}