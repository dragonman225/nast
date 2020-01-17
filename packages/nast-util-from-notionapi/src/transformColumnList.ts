/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformColumnList(
  node: NotionBlockBasic.ColumnList
): Promise<NAST.ColumnList> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "column_list",
    color: getBlockColor(node)
  }
}

export default transformColumnList