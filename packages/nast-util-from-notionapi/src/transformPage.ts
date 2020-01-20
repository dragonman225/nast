/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { getBlockUri, getBlockColor, getBlockIcon, convertImageUrl } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import { transformTitle } from "./transformTitle"

async function transformPage(
  node: NotionBlockBasic.Page
): Promise<NAST.Page> {
  const format = node.format || {}
  return {
    children: [],
    uri: getBlockUri(node),
    type: "page",
    color: getBlockColor(node),
    title: node.properties ? await transformTitle(node.properties.title) || [] : [],
    icon: getBlockIcon(node),
    cover: format.page_cover
      ? convertImageUrl(format.page_cover) : undefined,
    fullWidth: typeof format.page_full_width !== "undefined"
      ? format.page_full_width : false,
    coverPosition: format.page_cover_position || 1,
    properties: node.properties as any
  }
}

export default transformPage