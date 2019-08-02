import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformNumberedList(
  node: Notion.BlockValue
): Promise<Nast.NumberedList> {
  let nastNode = {
    id: node.id,
    type: 'numbered_list' as 'numbered_list',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformNumberedList