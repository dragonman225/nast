/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import {
  getBlockUri, getBlockColor, convertImageUrl, convertFileUrl
} from "./util"

/** Import types. */
import * as Notion from "notionapi-agent/dist/interfaces"
import { transformTitle } from "./transformTitle"

function isDirectVideo(url?: string): boolean {
  if (url)
    return /\.mp4|\.ogg|\.webm/.test(url)
  else
    return false
}

async function transformVisual(
  node: Notion.Block.Codepen | Notion.Block.Embed | Notion.Block.Invision |
    Notion.Block.PDF | Notion.Block.Image | Notion.Block.Video
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
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    source: (function (): string {
      if (node.type === "image")
        return convertImageUrl(format.display_source || "#", "block", node.id, format.block_width)
      else
        return convertFileUrl(
          node.id,
          format.display_source
          || (((node.properties || {}).source || {})[0] || [])[0]
          || "#")
    })(),
    caption: await getCaption(node),
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

async function getCaption(
  node: Notion.Block.Codepen | Notion.Block.Embed | Notion.Block.Invision |
    Notion.Block.PDF | Notion.Block.Image | Notion.Block.Video
): Promise<NAST.SemanticString[] | undefined> {
  if (node.type === "image" || node.type === "video"
    || node.type === "embed")
    return node.properties ?
      await transformTitle(node, node.properties.caption) : undefined
  else
    return undefined
}

export default transformVisual