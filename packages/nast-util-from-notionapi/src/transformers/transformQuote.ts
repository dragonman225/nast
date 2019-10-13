/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformQuote(
  node: Notion.Block
): Promise<Nast.Quote> {
  const nastNode = {
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