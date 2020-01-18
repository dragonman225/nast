/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { getBlockUri, getBlockColor, convertImageUrl, convertFileUrl } from "./util"

/** Import types. */
import * as NotionBlockEmbed from "notionapi-agent/dist/interfaces/notion-models/block/Embed"
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"
import { transformTitle } from "./transformTitle"

function isDirectVideo(url?: string): boolean {
  if (url)
    return /\.mp4|\.ogg|\.webm/.test(url)
  else
    return false
}

async function transformVisual(
  node: NotionBlockEmbed.Codepen | NotionBlockEmbed.Embed
    | NotionBlockEmbed.Invision | NotionBlockEmbed.PDF
    | NotionBlockMedia.Image | NotionBlockMedia.Video
): Promise<NAST.Embed | NAST.PDF | NAST.Image | NAST.Video> {
  const format = node.format || {}
  return {
    children: [],
    uri: getBlockUri(node),
    type: (function (): "image" | "video" | "pdf" | "embed" {
      if (node.type === "image")
        return "image"
      else if (node.type === "video" && node.format
        && isDirectVideo(node.format.display_source))
        return "video"
      else if (node.type === "pdf")
        return "pdf"
      else
        return "embed"
    })(),
    color: getBlockColor(node),
    source: (function (): string {
      if (node.type === "image")
        return convertImageUrl(format.display_source || "#", format.block_width)
      else
        return convertFileUrl(
          format.display_source
          || (((node.properties || {}).source || {})[0] || [])[0]
          || "#")
    })(),
    caption: (function (): NAST.SemanticString[] | undefined {
      if (node.type === "image" || node.type === "video")
        return node.properties ? transformTitle(node.properties.caption) : undefined
      else
        return undefined
    })(),
    width: format.block_width || -1,
    height: format.block_height || -1,
    fullWidth: typeof format.block_full_width !== "undefined"
      ? format.block_full_width : false,
    pageWidth: typeof format.block_page_width !== "undefined"
      ? format.block_page_width : true,
    aspectRatio: format.block_aspect_ratio || -1,
    preserveScale: typeof format.block_preserve_scale !== "undefined"
      ? format.block_preserve_scale : true
  }
}

export default transformVisual