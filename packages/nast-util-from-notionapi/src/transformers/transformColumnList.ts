/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor } from './utils'

async function transformColumnList(
  node: Notion.Block
): Promise<Nast.ColumnList> {
  const nastNode = {
    id: node.id,
    type: 'column_list' as 'column_list',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: []
  }
  return nastNode
}

export default transformColumnList