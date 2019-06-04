# notionast-util-from-notionapi

> An util that help user operate their `notionapi-agent` and convert a [Notion](https://www.notion.so) page to a Notion Abstract Syntax Tree (NotionAST).
>
> The library is currently a Work In Progress, so it may be unstable.
>
> **The library is unofficial.**

## Documentation

* [Installation](#Installation)
* [Quickstart](#Quickstart)
* [API Methods](#API-Methods)

## Installation

```bash
npm i dragonman225/notionast-util-from-notionapi --save
```

You also need an Notion API agent that has method `getRecordValues`. I recommend [notionapi-agent](https://github.com/dragonman225/notionapi-agent), which is also written by me.

```bash
npm i notionapi-agent --save
```

## Quickstart

```javascript
const fs = require('fs')

const NotionAgent = require('notionapi-agent')
const downloadPageAsTree = require('notionast-util-from-notionapi')

/* Fill in your cookie. */
const options = {
  cookie: ''
}
const agent = new NotionAgent(options)

async function main() {
  try {
    /* Fill in a page ID. */
    let pageID = ''
    let tree = await downloadPageAsTree(pageID, agent)
    let file = `PageTree-${pageID}.json`
    fs.writeFileSync(file, JSON.stringify(tree), { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
```

## API Methods

### `async` `downloadPageAsTree(pageID, agent)`

Download a Notion page as a Notion Abstract Syntax Tree with a Notion API agent.

* `pageID` - (required) The ID of a Notion page. Must be the one with dashes. e.g.

  ```javascript
  'cbf2b645-xxxx-xxxx-xxxx-xxxxe8cfed93'
  ```

* `agent` - (required) An API agent with method `getRecordValues`. I recomment using [notionapi-agent](https://github.com/dragonman225/notionapi-agent).

#### Returns :

A Notion Abstract Syntax Tree. Refer to `src/types/interfaces.ts` for details.

```typescript
interface BlockNode {
  type: string
  data?: BlockProperties
  raw_value: BlockValue
  children: BlockNode[]
}
```

