/** Import scripts. */
import { getBlockColor, getBlockIcon } from "./utils"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from "../nast"

async function transformCallout(
  node: NotionBlockBasic.Callout
): Promise<NAST.Callout> {
  return {
    children: [],
    id: node.id,
    type: "callout",
    color: getBlockColor(node),
    icon: getBlockIcon(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformCallout