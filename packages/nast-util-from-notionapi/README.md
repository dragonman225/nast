# nast-util-from-notionapi

Create NAST (**N**otion-compatible **A**bstract **S**yntax **T**ree) from [Notion](https://www.notion.so)'s API.

The NAST data structure is currently under active development, where the specification is changing often, so there are still no released documentation.

 For related projects, please see the topic [Notajs](https://github.com/topics/notajs).

## Documentation

* [Usage](#Usage)
* [Quickstart](#Quickstart)
* [API Methods](#API-Methods)
* [Notes](#Notes)

## Usage

```bash
npm i nast-util-from-notionapi
```

You also need [`notionapi-agent`](https://github.com/dragonman225/notionapi-agent).

```bash
npm i notionapi-agent
```

The agent is used to retrieve raw data from Notion's API.

## Getting Started

```javascript
const fs = require('fs')

const NotionAgent = require('notionapi-agent')
const { getOnePageAsTree, getAllBlocksInOnePage } = require('nast-util-from-notionapi')

/* Configure NotionAgent's options */
const options = {
  token: '',
  suppressWarning: false,
  verbose: true
}
const agent = new NotionAgent(options)

async function main() {
  try {
    /* Fill in a page ID */
    let pageID = ''
    let tree = await getOnePageAsTree(pageID, agent)
    let rawBlocks = await getAllBlocksInOnePage(pageID, agent)
    fs.writeFileSync(
        `PageTree-${pageID}.json`,
        JSON.stringify(tree),
        { encoding: 'utf-8' }
    )
    fs.writeFileSync(
        `RawBlocks-${pageID}.json`,
        JSON.stringify(rawBlocks),
        { encoding: 'utf-8' }
    )
  } catch (error) {
    console.error(error)
  }
}

main()
```

## API Methods

### `async` `getOnePageAsTree(pageID, agent)`

Download a Notion page as a re-formated tree with a Notion API agent.

* `pageID` - (required) The ID of a Notion page. It must be the one with dashes as below example :
  
  ```javascript
  'cbf2b645-xxxx-xxxx-xxxx-xxxxe8cfed93'
  ```

* `agent` - (required) A [`Notion.Agent`](https://github.com/dragonman225/notajs-types/blob/b1d75c1f6a4241afffd40bb74db34e0227bfbf54/src/api.ts#L6) instance from [notionapi-agent](https://github.com/dragonman225/notionapi-agent).

#### Returns :

The re-formated tree object. [View TypeScript Definition](https://github.com/dragonman225/notajs-types/blob/b1d75c1f6a4241afffd40bb74db34e0227bfbf54/src/nast.ts#L19)

```typescript
interface Block {
  id: string
  type: string
  color?: string
  createdTime: number
  lastEditedTime: number
  children: Block[]
}
```

### `async` `getAllBlocksInOnePage(pageID, agent)`

Download all blocks of a Notion page as an array in raw format.

Function parameters are the same as `getOnePageAsTree`.

#### Returns :

The array in raw format (`BlockRecordValue[]`). [View TypeScript Definition](https://github.com/dragonman225/notajs-types/blob/b1d75c1f6a4241afffd40bb74db34e0227bfbf54/src/api.ts#L90)

```typescript
interface BlockRecordValue {
  role: string
  value: BlockValue
}
```