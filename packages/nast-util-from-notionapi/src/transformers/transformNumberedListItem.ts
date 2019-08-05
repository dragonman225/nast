import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformNumberedListItem(
  node: Notion.BlockValue
): Promise<Nast.NumberedListItem> {
  let nastNode = {
    id: node.id,
    type: 'numbered_list_item' as 'numbered_list_item',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformNumberedListItem