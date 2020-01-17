/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from "../nast"

async function transformText(
  node: NotionBlockBasic.Text
): Promise<NAST.Text> {
  return {
    children: [],
    id: node.id,
    type: "text",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : [],
  }
}

export default transformText