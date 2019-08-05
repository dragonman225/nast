import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformBulletedListItem(
  node: Notion.BlockValue
): Promise<Nast.BulletedListItem> {
  let nastNode = {
    id: node.id,
    type: 'bulleted_list_item' as 'bulleted_list_item',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformBulletedListItem