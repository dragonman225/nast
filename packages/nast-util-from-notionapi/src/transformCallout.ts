/** Import scripts. */
import { getBlockUri, getBlockColor, getBlockIcon } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformCallout(
  node: NotionBlockBasic.Callout
): Promise<NAST.Callout> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "callout",
    color: getBlockColor(node),
    icon: getBlockIcon(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformCallout