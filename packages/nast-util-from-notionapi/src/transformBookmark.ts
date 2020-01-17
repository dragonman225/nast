/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"

async function transformBookmark(
  node: NotionBlockMedia.Bookmark
): Promise<NAST.Bookmark> {
  const props = node.properties
  return {
    children: [],
    uri: getBlockUri(node),
    type: "bookmark",
    color: getBlockColor(node),
    link: props
      ? props.link
        ? props.link[0][0] : "#"
      : "#",
    title: props
      ? props.title
        ? props.title[0][0] : undefined
      : undefined,
    description: props
      ? props.description
        ? props.description[0][0] : undefined
      : undefined,
    icon: node.format ? node.format.bookmark_icon : undefined,
    cover: node.format ? node.format.bookmark_cover : undefined,
  }
}

export default transformBookmark