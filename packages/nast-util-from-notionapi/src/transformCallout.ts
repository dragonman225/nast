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
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import { transformTitle } from "./transformTitle"

async function transformCallout(
  node: NotionBlockBasic.Callout
): Promise<NAST.Callout> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "callout",
    color: getBlockColor(node),
    icon: getBlockIcon(node),
    title: node.properties ? transformTitle(node.properties.title) || [] : []
  }
}

export default transformCallout