import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformBulletedList(
  node: Notion.BlockValue
): Promise<Nast.BulletedList> {
  let nastNode = {
    id: node.id,
    type: 'bulleted_list' as 'bulleted_list',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformBulletedList