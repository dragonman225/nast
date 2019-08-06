import { Notion, Nast } from '../../../types/src'

import { getBlockColor } from './utils'

async function transformColumnList(
  node: Notion.BlockValue
): Promise<Nast.ColumnList> {
  let nastNode = {
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