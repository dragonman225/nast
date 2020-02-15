/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { getBlockUri, getBlockColor, getBlockIcon } from "./util"

/** Import types. */
import * as Notion from "notionapi-agent/dist/interfaces"
import { transformTitle } from "./transformTitle"

async function transformCallout(
  node: Notion.Block.Callout
): Promise<NAST.Callout> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "callout",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    icon: getBlockIcon(node),
    title: node.properties ? await transformTitle(node.properties.title) || [] : []
  }
}

export default transformCallout