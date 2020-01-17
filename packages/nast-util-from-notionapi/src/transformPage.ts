/** Import scripts. */
import { getBlockUri, getBlockColor, getBlockIcon, convertImageUrl } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformPage(
  node: NotionBlockBasic.Page
): Promise<NAST.Page> {
  const format = node.format || {}
  return {
    children: [],
    uri: getBlockUri(node),
    type: "page",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : [],
    icon: getBlockIcon(node),
    cover: format.page_cover
      ? convertImageUrl(format.page_cover) : undefined,
    fullWidth: typeof format.page_full_width !== "undefined"
      ? format.page_full_width : false,
    coverPosition: format.page_cover_position || 1,
    properties: node.properties
  }
}

export default transformPage