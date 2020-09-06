/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { getBlockUri, getBlockColor, convertFileUrl } from "./util"

/** Import types. */
import * as Notion from "notionapi-agent/dist/interfaces"

async function transformFile(
  node: Notion.Block.File
): Promise<NAST.File> {
  const props = node.properties
  return {
    children: [],
    uri: getBlockUri(node),
    type: "file",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    fileId: node.file_ids ? node.file_ids[0] : undefined,
    title: props ? props.title[0][0] : "Unnamed",
    size: props
      ? props.size
        ? props.size[0][0] : undefined
      : undefined,
    source: (function (): string {
      const src = (props || {}).source
      if (!src) return ""
      else return convertFileUrl(node.id, src[0][0])
    })()
  }
}

export default transformFile