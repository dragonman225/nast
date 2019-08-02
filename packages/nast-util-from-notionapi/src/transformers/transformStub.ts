import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor } from './utils'

async function transformStub(
  node: Notion.BlockValue
): Promise<Nast.Block> {
  let nastNode = {
    id: node.id,
    type: node.type,
    color: getBlockColor(node),
    children: []
  }
  return nastNode
}

export default transformStub