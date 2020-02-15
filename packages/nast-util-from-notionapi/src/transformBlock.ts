/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
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
import transformPage from "./transformPage"
import transformQuote from "./transformQuote"
import transformTableOfContents from "./transformTableOfContents"
import transformText from "./transformText"
import transformToDo from "./transformToDo"
import transformToggle from "./transformToggle"
import transformVisual from "./transformVisual"

/** Import types. */
import { createAgent } from "notionapi-agent"
import * as Notion from "notionapi-agent/dist/interfaces"

async function transformBlock(
  node: Notion.Block,
  apiAgent: ReturnType<typeof createAgent>
): Promise<NAST.Block> {

  let nastNode: Promise<NAST.Block>

  switch (node.type) {
    case "breadcrumb": {
      nastNode = transformBreadcrumb(node as Notion.Block.Breadcrumb)
      break
    }
    case "page": {
      nastNode = transformPage(node as Notion.Block.Page)
      break
    }
    case "collection_view": {
      nastNode = transformCollection(node as Notion.Block.CollectionViewInline, apiAgent)
      break
    }
    case "collection_view_page": {
      nastNode = transformCollection(node as Notion.Block.CollectionViewPage, apiAgent)
      break
    }
    case "file": {
      nastNode = transformFile(node as Notion.Block.File)
      break
    }
    case "text": {
      nastNode = transformText(node as Notion.Block.Text)
      break
    }
    case "to_do": {
      nastNode = transformToDo(node as Notion.Block.ToDo)
      break
    }
    case "header": {
      nastNode = transformHeading(node as Notion.Block.Header)
      break
    }
    case "sub_header": {
      nastNode = transformHeading(node as Notion.Block.SubHeader)
      break
    }
    case "sub_sub_header": {
      nastNode = transformHeading(node as Notion.Block.SubSubHeader)
      break
    }
    case "bulleted_list": {
      nastNode = transformBulletedList(node as Notion.Block.BulletedList)
      break
    }
    case "numbered_list": {
      nastNode = transformNumberedList(node as Notion.Block.NumberedList)
      break
    }
    case "toggle": {
      nastNode = transformToggle(node as Notion.Block.Toggle)
      break
    }
    case "quote": {
      nastNode = transformQuote(node as Notion.Block.Quote)
      break
    }
    case "divider": {
      nastNode = transformDivider(node as Notion.Block.Divider)
      break
    }
    case "callout": {
      nastNode = transformCallout(node as Notion.Block.Callout)
      break
    }
    case "codepen": {
      nastNode = transformVisual(node as Notion.Block.Codepen)
      break
    }
    case "embed": {
      nastNode = transformVisual(node as Notion.Block.Embed)
      break
    }
    case "invision": {
      nastNode = transformVisual(node as Notion.Block.Invision)
      break
    }
    case "pdf": {
      nastNode = transformVisual(node as Notion.Block.PDF)
      break
    }
    case "image": {
      nastNode = transformVisual(node as Notion.Block.Image)
      break
    }
    case "video": {
      nastNode = transformVisual(node as Notion.Block.Video)
      break
    }
    case "audio": {
      nastNode = transformAudio(node as Notion.Block.Audio)
      break
    }
    case "bookmark": {
      nastNode = transformBookmark(node as Notion.Block.Bookmark)
      break
    }
    case "code": {
      nastNode = transformCode(node as Notion.Block.Code)
      break
    }
    case "equation": {
      nastNode = transformEquation(node as Notion.Block.Equation)
      break
    }
    case "column_list": {
      nastNode = transformColumnList(node as Notion.Block.ColumnList)
      break
    }
    case "column": {
      nastNode = transformColumn(node as Notion.Block.Column)
      break
    }
    case "table_of_contents": {
      nastNode = transformTableOfContents(node as Notion.Block.TableOfContents)
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