/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformNumberedListItem(
  node: Notion.Block
): Promise<Nast.NumberedListItem> {
  const nastNode = {
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