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
const { getPageTreeById } = require('nast-util-from-notionapi')

/* Fill in your token. */
const options = {
  token: ''
}
const agent = new NotionAgent(options)

async function main() {
  try {
    /* Fill in a page ID. */
    let pageID = ''
    let tree = await getPageTreeById(pageID, agent)
    let file = `PageTree-${pageID}.json`
    fs.writeFileSync(file, JSON.stringify(tree), { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
```

## API Methods

### `async` `getPageTreeById(pageID, agent)`

Download a Notion page as NAST with a Notion API agent.

* `pageID` - (required) The ID of a Notion page. It must be the one with dashes as below example :

  ```javascript
  'cbf2b645-xxxx-xxxx-xxxx-xxxxe8cfed93'
  ```

* `agent` - (required) A `NotionAgent` instance from [notionapi-agent](https://github.com/dragonman225/notionapi-agent).

#### Returns :

NAST, a tree-like object. Refer to `src/types/nast.ts` for details.

```typescript
interface Block {
  id: string
  type: string
  color?: string
  children: BlockNode[]
}
```
