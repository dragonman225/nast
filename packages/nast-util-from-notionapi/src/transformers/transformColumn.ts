/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor } from './utils'

async function transformColumn(
  node: Notion.Block
): Promise<Nast.Column> {
  const nastNode = {
    id: node.id,
    type: 'column' as 'column',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    ratio: node.format
      ? node.format.column_ratio
        ? node.format.column_ratio
        : 1
      : 1
  }
  return nastNode
}

export default transformColumn