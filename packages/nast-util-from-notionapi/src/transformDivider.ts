/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformDivider(
  node: NotionBlockBasic.Divider
): Promise<NAST.Divider> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "divider",
    color: getBlockColor(node)
  }
}

export default transformDivider