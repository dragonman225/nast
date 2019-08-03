import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle, getBlockIcon } from './utils'

async function transformCallout(
  node: Notion.BlockValue
): Promise<Nast.Callout> {
  let nastNode = {
    id: node.id,
    type: 'callout' as 'callout',
    color: getBlockColor(node),
    children: [],
    icon: getBlockIcon(node),
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformCallout