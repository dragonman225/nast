/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from "../nast"

async function transformColumn(
  node: NotionBlockBasic.Column
): Promise<NAST.Column> {
  return {
    children: [],
    id: node.id,
    type: "column",
    color: getBlockColor(node),
    ratio: node.format
      ? node.format.column_ratio || 1 : 1
  }
}

export default transformColumn