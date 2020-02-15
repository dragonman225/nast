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

async function transformTableOfContent(
  node: Notion.Block.TableOfContents
): Promise<NAST.TableOfContents> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "table_of_contents",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time
  }
}

export default transformTableOfContent