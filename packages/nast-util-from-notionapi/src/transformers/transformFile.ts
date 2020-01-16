/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"
import * as NAST from "../nast"

async function transformFile(
  node: NotionBlockMedia.File
): Promise<NAST.File> {
  return {
    children: [],
    id: node.id,
    type: "file",
    color: getBlockColor(node)
  }
}

export default transformFile