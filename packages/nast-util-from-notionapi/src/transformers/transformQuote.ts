import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformQuote(
  node: Notion.BlockValue
): Promise<Nast.Quote> {
  let nastNode = {
    id: node.id,
    type: 'quote' as 'quote',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformQuote