import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor } from './utils'

async function transformColumnList(
  node: Notion.BlockValue
): Promise<Nast.ColumnList> {
  let nastNode = {
    id: node.id,
    type: 'column_list' as 'column_list',
    color: getBlockColor(node),
    children: []
  }
  return nastNode
}

export default transformColumnList