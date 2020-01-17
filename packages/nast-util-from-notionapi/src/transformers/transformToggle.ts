/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from "../nast"

async function transformToggle(
  node: NotionBlockBasic.Toggle
): Promise<NAST.Toggle> {
  return {
    children: [],
    id: node.id,
    type: "toggle",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformToggle