import * as Notion from './types/api'
import * as Nast from './types/nast'

import { transformCollection } from './transformers/transformCollection'
import { log } from './utils'
import blockMap from './block-map'

import transformPage from './transformers/transformPage'
import transformStub from './transformers/transformStub'
import transformText from './transformers/transformText'
import transformToDo from './transformers/transformToDo';
import transformHeading from './transformers/transformHeading';
import transformBulletedList from './transformers/transformBulletedList';
import transformNumberedList from './transformers/transformNumberedList';

async function transformBlock(
  node: Notion.BlockValue,
  apiAgent: Notion.Agent
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
    /** Nast.BulletedList */
    case blockMap.bulletedList: {
      nastNode = transformBulletedList(node)
      break
    }
    /** Nast.NumberedList */
    case blockMap.numberedList: {
      nastNode = transformNumberedList(node)
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