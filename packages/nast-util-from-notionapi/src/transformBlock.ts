/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

import { getBlockUri } from "./util"
import transformAudio from "./transformAudio"
import transformBookmark from "./transformBookmark"
import transformBreadcrumb from "./transformBreadcrumb"
import transformBulletedList from "./transformBulletedList"
import transformCallout from "./transformCallout"
import transformCode from "./transformCode"
import transformCollection from "./transformCollection"
import transformColumn from "./transformColumn"
import transformColumnList from "./transformColumnList"
import transformDivider from "./transformDivider"
import transformEquation from "./transformEquation"
import transformFile from "./transformFile"
import transformHeading from "./transformHeading"
import transformNumberedList from "./transformNumberedList"
import transformPageOrAlias from "./transformPageOrAlias"
import transformQuote from "./transformQuote"
import transformTableOfContents from "./transformTableOfContents"
import transformText from "./transformText"
import transformToDo from "./transformToDo"
import transformToggle from "./transformToggle"
import transformVisual from "./transformVisual"

import type { createAgent } from "notionapi-agent"
import type * as Notion from "notionapi-agent/dist/interfaces"

async function transformBlock(
  /** The block to be transformed. */
  node: Notion.Block,
  /**
   * Some transformers need to make requests to Notion API for more 
   * information.
   */
  apiAgent: ReturnType<typeof createAgent>,
  /**
   * Some transformers need to modify the parent block.
   * e.g. when dereferencing a pointer to the actual content.
   */
  parent?: Notion.Block
): Promise<NAST.Block> {

  let nastNode: Promise<NAST.Block>

  switch (node.type) {
    case "breadcrumb": {
      nastNode = transformBreadcrumb(node)
      break
    }
    case "alias":
    case "page": {
      nastNode = transformPageOrAlias(node, apiAgent, parent)
      break
    }
    case "collection_view": {
      nastNode = transformCollection(node, apiAgent)
      break
    }
    case "collection_view_page": {
      nastNode = transformCollection(node, apiAgent)
      break
    }
    case "file": {
      nastNode = transformFile(node)
      break
    }
    case "text": {
      nastNode = transformText(node)
      break
    }
    case "to_do": {
      nastNode = transformToDo(node)
      break
    }
    case "header": {
      nastNode = transformHeading(node)
      break
    }
    case "sub_header": {
      nastNode = transformHeading(node)
      break
    }
    case "sub_sub_header": {
      nastNode = transformHeading(node)
      break
    }
    case "bulleted_list": {
      nastNode = transformBulletedList(node)
      break
    }
    case "numbered_list": {
      nastNode = transformNumberedList(node)
      break
    }
    case "toggle": {
      nastNode = transformToggle(node)
      break
    }
    case "quote": {
      nastNode = transformQuote(node)
      break
    }
    case "divider": {
      nastNode = transformDivider(node)
      break
    }
    case "callout": {
      nastNode = transformCallout(node)
      break
    }
    case "codepen": {
      nastNode = transformVisual(node)
      break
    }
    case "embed": {
      nastNode = transformVisual(node)
      break
    }
    case "invision": {
      nastNode = transformVisual(node)
      break
    }
    case "pdf": {
      nastNode = transformVisual(node)
      break
    }
    case "image": {
      nastNode = transformVisual(node)
      break
    }
    case "video": {
      nastNode = transformVisual(node)
      break
    }
    case "audio": {
      nastNode = transformAudio(node)
      break
    }
    case "bookmark": {
      nastNode = transformBookmark(node)
      break
    }
    case "code": {
      nastNode = transformCode(node)
      break
    }
    case "equation": {
      nastNode = transformEquation(node)
      break
    }
    case "column_list": {
      nastNode = transformColumnList(node)
      break
    }
    case "column": {
      nastNode = transformColumn(node)
      break
    }
    case "table_of_contents": {
      nastNode = transformTableOfContents(node)
      break
    }
    default: {
      nastNode = new Promise((resolve) => {
        resolve({
          children: [],
          uri: getBlockUri(node),
          type: node.type,
          createdTime: node.created_time,
          lastEditedTime: node.last_edited_time
        })
      })
      console.log(`Unsupported block type: ${node.type}`)
    }
  }

  return nastNode

}

export {
  transformBlock
}