import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor } from './utils'

async function transformDivider(
  node: Notion.BlockValue
): Promise<Nast.Divider> {
  let nastNode = {
    id: node.id,
    type: 'divider' as 'divider',
    color: getBlockColor(node),
    children: []
  }
  return nastNode
}

export default transformDivider