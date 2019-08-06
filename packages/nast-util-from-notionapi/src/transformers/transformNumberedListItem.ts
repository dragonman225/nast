import { Notion, Nast } from '../../../types/src'

import { getBlockColor, getBlockTitle } from './utils'

async function transformNumberedListItem(
  node: Notion.BlockValue
): Promise<Nast.NumberedListItem> {
  let nastNode = {
    id: node.id,
    type: 'numbered_list_item' as 'numbered_list_item',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformNumberedListItem