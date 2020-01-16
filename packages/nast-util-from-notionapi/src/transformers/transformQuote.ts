/** Import scripts. */
import { getBlockColor } from './utils'

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from '../nast'

async function transformQuote(
  node: NotionBlockBasic.Quote
): Promise<NAST.Quote> {
  return {
    children: [],
    id: node.id,
    type: 'quote',
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformQuote