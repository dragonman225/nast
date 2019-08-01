import * as Notion from './types/api'
import * as Nast from './types/nast'

function transformRoot(node: Notion.BlockValue): Nast.Root {
  let newNode: Nast.Root = {
    type: 'root',
    children: []
  }
  return newNode
}

function transformCollection(node: Notion.BlockValue): Nast.Collection {
  let newNode: Nast.Collection = {
  }
  return newNode
}

export {
  transformRoot,
  transformCollection
}