/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"
import * as NAST from "../nast"

async function transformCode(
  node: NotionBlockMedia.Code
): Promise<NAST.Code> {
  return {
    children: [],
    id: node.id,
    type: "code",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : [],
    language: node.properties
      ? node.properties.language
        ? node.properties.language[0][0] : undefined
      : undefined,
    wrap: (typeof node.format !== "undefined"
      && typeof node.format.code_wrap !== "undefined")
      ? node.format.code_wrap : false
  }
}

export default transformCode