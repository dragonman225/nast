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

async function transformBreadcrumb(
  node: Notion.Block.Breadcrumb
): Promise<NAST.BreadCrumb> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "breadcrumb",
    color: getBlockColor(node)
  }
}

export default transformBreadcrumb