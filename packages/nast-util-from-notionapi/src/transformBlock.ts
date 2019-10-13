/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from './nast'

import { transformCollection } from './transformers/transformCollection'
import { log } from './utils'
import blockMap from './block-map'

import transformPage from './transformers/transformPage'
import transformStub from './transformers/transformStub'
import transformText from './transformers/transformText'
import transformToDo from './transformers/transformToDo'
import transformHeading from './transformers/transformHeading'
import transformBulletedListItem from './transformers/transformBulletedListItem'
import transformNumberedListItem from './transformers/transformNumberedListItem'
import transformEmbed from './transformers/transformEmbed'
import transformImage from './transformers/transformImage'
import transformCallout from './transformers/transformCallout'
import transformDivider from './transformers/transformDivider'
import transformQuote from './transformers/transformQuote'
import transformToggleList from './transformers/transformToggleList'
import transformColumn from './transformers/transformColumn'
import transformColumnList from './transformers/transformColumnList'
import transformEquation from './transformers/transformEquation'
import transformCode from './transformers/transformCode'
import transformAudio from './transformers/transformAudio'
import transformBookmark from './transformers/transformBookmark'

async function transformBlock(
  node: Notion.Block,
  apiAgent: Notion.NotionAgent
): Promise<Nast.Block> {

  let nastNode

  switch (node.type) {
    /** Nast.Page */
    case blockMap.page: {
      nastNode = transformPage(node)
      break
    }
    /** Nast.Collection */
    case blockMap.collectionView: {
      nastNode = transformCollection(node, apiAgent)
      break
    }
    case blockMap.collectionViewPage: {
      nastNode = transformCollection(node, apiAgent)
      break
    }
    /** Nast.Text */
    case blockMap.text: {
      nastNode = transformText(node)
      break
    }
    /** Nast.ToDoList */
    case blockMap.toDo: {
      nastNode = transformToDo(node)
      break
    }
    /** Nast.Heading */
    case blockMap.header: {
      nastNode = transformHeading(node)
      break
    }
    case blockMap.subHeader: {
      nastNode = transformHeading(node)
      break
    }
    case blockMap.subSubHeader: {
      nastNode = transformHeading(node)
      break
    }
    /** Nast.BulletedListItem */
    case blockMap.bulletedList: {
      nastNode = transformBulletedListItem(node)
      break
    }
    /** Nast.NumberedListItem */
    case blockMap.numberedList: {
      nastNode = transformNumberedListItem(node)
      break
    }
    /** Nast.ToggleList */
    case blockMap.toggle: {
      nastNode = transformToggleList(node)
      break
    }
    /** Nast.Quote */
    case blockMap.quote: {
      nastNode = transformQuote(node)
      break
    }
    /** Nast.Divider */
    case blockMap.divider: {
      nastNode = transformDivider(node)
      break
    }
    /** Nast.Callout */
    case blockMap.callout: {
      nastNode = transformCallout(node)
      break
    }
    /** Nast.Image */
    case blockMap.image: {
      nastNode = transformImage(node)
      break
    }
    /** Nast.Video */
    case blockMap.video: 
    /** Codepen is Embed */
    case blockMap.codepen:
    /** Nast.Embed */
    case blockMap.embed: {
      nastNode = transformEmbed(node)
      break
    }
    /** Nast.Audio */
    case blockMap.audio: {
      nastNode = transformAudio(node)
      break
    }
    /** Nast.WebBookmark */
    case blockMap.bookmark: {
      nastNode = transformBookmark(node)
      break
    }
    /** Nast.Code */
    case blockMap.code: {
      nastNode = transformCode(node)
      break
    }
    /** Nast.Equation */
    case blockMap.equation: {
      nastNode = transformEquation(node)
      break
    }
    /** Nast.ColumnList */
    case blockMap.columnList: {
      nastNode = transformColumnList(node)
      break
    }
    /** Nast.Column */
    case blockMap.column: {
      nastNode = transformColumn(node)
      break
    }
    default: {
      nastNode = transformStub(node)
      log(`Unsupported block type: ${node.type}`)
    }
  }

  return nastNode

}

export {
  transformBlock
}