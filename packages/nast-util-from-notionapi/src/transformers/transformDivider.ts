/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from "../nast"

async function transformDivider(
  node: NotionBlockBasic.Divider
): Promise<NAST.Divider> {
  return {
    children: [],
    id: node.id,
    type: "divider",
    color: getBlockColor(node)
  }
}

export default transformDivider