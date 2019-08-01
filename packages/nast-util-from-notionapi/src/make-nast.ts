import * as Notion from './types/api'
import * as Nast from './types/nast'

import {
  transformRoot
} from './transformer'

function makeNast(allRecords: Notion.BlockRecordValue[]): Nast.Root {

  /* Cast BlockRecordValue to BlockNode. */
  let list = allRecords.map((record, index): Nast.Parent => {

    /** First record must be root. */
    if (index === 0 && record.value.type === 'page') {
      return transformRoot(record.value)
    }

    switch (record.value.type) {
      case 
    }
    return {
      id: record.value.id,
      type: record.value.type,
      data: record.value.properties,
      raw_value: record.value,
      children: [] as BlockNode[]
    }
  })

}

export {
  makeNast
}