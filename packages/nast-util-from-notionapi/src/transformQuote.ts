/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformQuote(
  node: NotionBlockBasic.Quote
): Promise<NAST.Quote> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "quote",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformQuote