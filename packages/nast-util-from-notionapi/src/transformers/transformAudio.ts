/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"
import * as NAST from "../nast"

async function transformAudio(
  node: NotionBlockMedia.Audio
): Promise<NAST.Audio> {
  return {
    children: [],
    id: node.id,
    type: "audio",
    color: getBlockColor(node),
    source: node.properties
      ? node.properties.source
        ? node.properties.source[0][0] : "#"
      : "#"
  }
}

export default transformAudio