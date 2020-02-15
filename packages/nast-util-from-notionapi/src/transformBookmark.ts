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

async function transformBookmark(
  node: Notion.Block.Bookmark
): Promise<NAST.Bookmark> {
  const props = node.properties
  return {
    children: [],
    uri: getBlockUri(node),
    type: "bookmark",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    link: props
      ? props.link
        ? props.link[0][0] : "#"
      : "#",
    title: props
      ? props.title
        ? props.title[0][0] : undefined
      : undefined,
    description: props
      ? props.description
        ? props.description[0][0] : undefined
      : undefined,
    icon: node.format ? node.format.bookmark_icon : undefined,
    cover: node.format ? node.format.bookmark_cover : undefined,
  }
}

export default transformBookmark