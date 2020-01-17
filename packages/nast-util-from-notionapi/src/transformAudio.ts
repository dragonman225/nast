/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"

async function transformAudio(
  node: NotionBlockMedia.Audio
): Promise<NAST.Audio> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "audio",
    color: getBlockColor(node),
    source: node.properties
      ? node.properties.source
        ? node.properties.source[0][0] : "#"
      : "#"
  }
}

export default transformAudio