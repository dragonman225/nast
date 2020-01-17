/** Import scripts. */
import { log } from "./utils"
import transformAudio from "./transformers/transformAudio"
import transformBookmark from "./transformers/transformBookmark"
import transformBreadcrumb from "./transformers/transformBreadcrumb"
import transformBulletedList from "./transformers/transformBulletedList"
import transformCallout from "./transformers/transformCallout"
import transformCode from "./transformers/transformCode"
import transformCollection from "./transformers/transformCollection"
import transformColumn from "./transformers/transformColumn"
import transformColumnList from "./transformers/transformColumnList"
import transformDivider from "./transformers/transformDivider"
import transformEquation from "./transformers/transformEquation"
import transformFile from "./transformers/transformFile"
import transformHeading from "./transformers/transformHeading"
import transformNumberedList from "./transformers/transformNumberedList"
import transformPage from "./transformers/transformPage"
import transformQuote from "./transformers/transformQuote"
import transformTableOfContent from "./transformers/transformTableOfContent"
import transformText from "./transformers/transformText"
import transformToDo from "./transformers/transformToDo"
import transformToggle from "./transformers/transformToggle"
import transformVisual from "./transformers/transformVisual"

/** Import types. */
import { createAgent } from "notionapi-agent"
import { Block } from "notionapi-agent/dist/interfaces/notion-models"
import {
  Breadcrumb, Equation, TableOfContent
} from "notionapi-agent/dist/interfaces/notion-models/block/AdvancedBlock"
import {
  BulletedList, Callout, Column, ColumnList, Divider, Header,
  NumberedList, Page, Quote, SubHeader, SubSubHeader, Text, ToDo, Toggle
} from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import {
  CollectionViewInline, CollectionViewPage
} from "notionapi-agent/dist/interfaces/notion-models/block/Database"
import {
  Codepen, Embed, Invision, PDF
} from "notionapi-agent/dist/interfaces/notion-models/block/Embed"
import {
  Audio, Bookmark, Code, File, Image, Video
} from "notionapi-agent/dist/interfaces/notion-models/block/Media"
import * as NAST from "./nast"

async function transformBlock(
  node: Block,
  apiAgent: ReturnType<typeof createAgent>
): Promise<NAST.Block> {

  let nastNode: Promise<NAST.Block>

  switch (node.type) {
    case "breadcrumb": {
      nastNode = transformBreadcrumb(node as Breadcrumb)
      break
    }
    case "page": {
      nastNode = transformPage(node as Page)
      break
    }
    case "collection_view": {
      nastNode = transformCollection(node as CollectionViewInline, apiAgent)
      break
    }
    case "collection_view_page": {
      nastNode = transformCollection(node as CollectionViewPage, apiAgent)
      break
    }
    case "file": {
      nastNode = transformFile(node as File)
      break
    }
    case "text": {
      nastNode = transformText(node as Text)
      break
    }
    case "to_do": {
      nastNode = transformToDo(node as ToDo)
      break
    }
    case "header": {
      nastNode = transformHeading(node as Header)
      break
    }
    case "sub_header": {
      nastNode = transformHeading(node as SubHeader)
      break
    }
    case "sub_sub_header": {
      nastNode = transformHeading(node as SubSubHeader)
      break
    }
    case "bulleted_list": {
      nastNode = transformBulletedList(node as BulletedList)
      break
    }
    case "numbered_list": {
      nastNode = transformNumberedList(node as NumberedList)
      break
    }
    case "toggle": {
      nastNode = transformToggle(node as Toggle)
      break
    }
    case "quote": {
      nastNode = transformQuote(node as Quote)
      break
    }
    case "divider": {
      nastNode = transformDivider(node as Divider)
      break
    }
    case "callout": {
      nastNode = transformCallout(node as Callout)
      break
    }
    case "codepen": {
      nastNode = transformVisual(node as Codepen)
      break
    }
    case "embed": {
      nastNode = transformVisual(node as Embed)
      break
    }
    case "invision": {
      nastNode = transformVisual(node as Invision)
      break
    }
    case "pdf": {
      nastNode = transformVisual(node as PDF)
      break
    }
    case "image": {
      nastNode = transformVisual(node as Image)
      break
    }
    case "video": {
      nastNode = transformVisual(node as Video)
      break
    }
    case "audio": {
      nastNode = transformAudio(node as Audio)
      break
    }
    case "bookmark": {
      nastNode = transformBookmark(node as Bookmark)
      break
    }
    case "code": {
      nastNode = transformCode(node as Code)
      break
    }
    case "equation": {
      nastNode = transformEquation(node as Equation)
      break
    }
    case "column_list": {
      nastNode = transformColumnList(node as ColumnList)
      break
    }
    case "column": {
      nastNode = transformColumn(node as Column)
      break
    }
    case "table_of_contents": {
      nastNode = transformTableOfContent(node as TableOfContent)
      break
    }
    default: {
      nastNode = new Promise((resolve) => {
        resolve({
          children: [],
          id: node.id,
          type: node.type
        })
      })
      log.warn(`Unsupported block type: ${node.type}`)
    }
  }

  return nastNode

}

export {
  transformBlock
}