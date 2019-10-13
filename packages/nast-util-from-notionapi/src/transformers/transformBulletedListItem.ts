/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformBulletedListItem(
  node: Notion.Block
): Promise<Nast.BulletedListItem> {
  const nastNode = {
    id: node.id,
    type: 'bulleted_list_item' as 'bulleted_list_item',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformBulletedListItem