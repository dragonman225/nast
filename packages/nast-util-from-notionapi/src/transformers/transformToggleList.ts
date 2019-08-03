import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformToggleList(
  node: Notion.BlockValue
): Promise<Nast.ToggleList> {
  let nastNode = {
    id: node.id,
    type: 'toggle' as 'toggle',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformToggleList