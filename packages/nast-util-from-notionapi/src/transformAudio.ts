/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as Notion from "notionapi-agent/dist/interfaces"

async function transformAudio(
  node: Notion.Block.Audio
): Promise<NAST.Audio> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "audio",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    source: node.properties
      ? node.properties.source
        ? node.properties.source[0][0] : "#"
      : "#"
  }
}

export default transformAudio