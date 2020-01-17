/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"

async function transformFile(
  node: NotionBlockMedia.File
): Promise<NAST.File> {
  const props = node.properties
  return {
    children: [],
    uri: getBlockUri(node),
    type: "file",
    color: getBlockColor(node),
    fileId: node.file_ids ? node.file_ids[0] : undefined,
    title: props ? props.title[0][0] : "Unnamed",
    size: props
      ? props.size
        ? props.size[0][0] : undefined
      : undefined,
    source: (function (): string {
      const src = (props || {}).source
      if (!src) return "#"
      const url = src[0][0]
      if (/^https:\/\/s3/.test(url))
        return `https://www.notion.so/signed/${encodeURIComponent(url)}`
      else
        return url
    })()
  }
}

export default transformFile