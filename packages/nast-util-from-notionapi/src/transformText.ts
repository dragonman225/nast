/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformText(
  node: NotionBlockBasic.Text
): Promise<NAST.Text> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "text",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : [],
  }
}

export default transformText