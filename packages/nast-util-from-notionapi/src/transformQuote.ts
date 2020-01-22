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
import { transformTitle } from "./transformTitle"

async function transformQuote(
  node: Notion.Block.Quote
): Promise<NAST.Quote> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "quote",
    color: getBlockColor(node),
    title: node.properties ?
      await transformTitle(node.properties.title) || [] : []
  }
}

export default transformQuote