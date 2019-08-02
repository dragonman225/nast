import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformText(
  node: Notion.BlockValue
): Promise<Nast.Text> {
  let nastNode = {
    id: node.id,
    type: 'text' as 'text',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformText