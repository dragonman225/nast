/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformToggle(
  node: NotionBlockBasic.Toggle
): Promise<NAST.Toggle> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "toggle",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformToggle