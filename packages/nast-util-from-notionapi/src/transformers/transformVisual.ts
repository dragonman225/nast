/** Import scripts. */
import { getBlockColor, convertImageUrl } from './utils'

/** Import types. */
import * as NotionBlockEmbed from "notionapi-agent/dist/interfaces/notion-models/block/Embed"
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"
import * as NAST from '../nast'

function isDirectVideo(url?: string) {
  if (url)
    return /\.mp4|\.ogg|\.webm/.test(url)
  else
    return false
}

async function transformVisual(
  node: NotionBlockEmbed.Codepen | NotionBlockEmbed.Embed
    | NotionBlockEmbed.Invision | NotionBlockEmbed.PDF
    | NotionBlockMedia.Image | NotionBlockMedia.Video
): Promise<NAST.Embed | NAST.Image | NAST.Video> {
  const format = node.format || {}
  return {
    children: [],
    id: node.id,
    type: (function () {
      if (node.type === "image")
        return "image"
      else if (node.type === "video" && node.format
        && isDirectVideo(node.format.display_source))
        return "video"
      else
        return "embed"
    })(),
    color: getBlockColor(node),
    source: (function () {
      if (node.type === "image")
        return convertImageUrl(format.display_source || "#", format.block_width)
      else
        return format.display_source || "#"
    })(),
    caption: (function () {
      if (node.type === "image" || node.type === "video")
        return node.properties ? node.properties.caption : undefined
      else
        return undefined
    })(),
    width: format.block_width || -1,
    height: format.block_height || -1,
    fullWidth: typeof format.block_full_width !== 'undefined'
      ? format.block_full_width : false,
    pageWidth: typeof format.block_page_width !== 'undefined'
      ? format.block_page_width : true,
    aspectRatio: format.block_aspect_ratio || -1,
    preserveScale: typeof format.block_preserve_scale !== 'undefined'
      ? format.block_preserve_scale : true
  }
}

export default transformVisual