import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'
import blockMap from '../block-map'

async function transformHeading(
  node: Notion.BlockValue
): Promise<Nast.Heading> {
  let depth
  switch (node.type) {
    case blockMap.header:
      depth = 1
      break
    case blockMap.subHeader:
      depth = 2
      break
    default:
      depth = 3
  }

  let nastNode = {
    id: node.id,
    type: 'heading' as 'heading',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node),
    depth
  }
  return nastNode
}

export default transformHeading