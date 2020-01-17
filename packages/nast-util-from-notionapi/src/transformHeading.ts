/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformHeading(
  node: NotionBlockBasic.Header | NotionBlockBasic.SubHeader
    | NotionBlockBasic.SubSubHeader
): Promise<NAST.Heading> {
  let depth
  switch (node.type) {
    case "header":
      depth = 1
      break
    case "sub_header":
      depth = 2
      break
    default:
      depth = 3
  }

  return {
    children: [],
    uri: getBlockUri(node),
    type: "heading",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : [],
    depth
  }
}

export default transformHeading