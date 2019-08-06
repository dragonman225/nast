import { Notion, Nast } from '../../../types/src'

import { getBlockColor, getBlockTitle } from './utils'

async function transformQuote(
  node: Notion.BlockValue
): Promise<Nast.Quote> {
  let nastNode = {
    id: node.id,
    type: 'quote' as 'quote',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformQuote