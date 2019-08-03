import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor } from './utils'

async function transformColumn(
  node: Notion.BlockValue
): Promise<Nast.Column> {
  let nastNode = {
    id: node.id,
    type: 'column' as 'column',
    color: getBlockColor(node),
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