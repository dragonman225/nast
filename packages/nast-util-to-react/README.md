# nast-util-to-react

Render a [NAST](https://github.com/dragonman225/nast/blob/0a5174370b6f30739baf2e6f8b3738028415ba22/packages/nast-types/index.d.ts#L12) to `JSX.Element` or HTML.

## Documentation

- [Usage](#Usage)
- [API Reference](#API-Reference)
- [Note](#Note)
- [Develop](#Develop)

## Usage

```bash
npm i nast-util-to-react
```

Then,

```javascript
// CommonJS Module style
const { renderToHTML, renderToJSX } = require('nast-util-to-react');
// or ES Module style
import { renderToHTML, renderToJSX } from 'nast-util-to-react';
```

## API Reference

> #### :warning: This is a beta software, where APIs may change in near future!

---

### `renderToHTML(tree)`

Render a tree to HTML. This is just a wrapper that use `ReactDOMServer.renderToStaticMarkup()` to generate HTML from the return value of `renderToJSX()`.

#### **tree**

Type: [NAST.Block](https://github.com/dragonman225/nast/blob/0a5174370b6f30739baf2e6f8b3738028415ba22/packages/nast-types/index.d.ts#L12)

#### **@returns**

Type: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

A HTML string.

---

### `renderToJSX(tree)`

Render a tree to `JSX.Element`.

#### **tree**

Type: [NAST.Block](https://github.com/dragonman225/nast/blob/0a5174370b6f30739baf2e6f8b3738028415ba22/packages/nast-types/index.d.ts#L12)

#### **@returns**

Type: [JSX.Element](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/86ab4d56fa27a429827c24c8ff05971e9ca766de/types/react/index.d.ts#L2883)

This can be used as a child in a React component, which means it's easier to apply further processing, also it has a small benefit, which is that no `dangerouslySetInnerHTML` is needed.

## Note

### Implemented NAST Blocks

#### Block Capabilities

- [ ] Block can have color or background color.

  **Status: See commit [0a51743](https://github.com/dragonman225/nast/commit/0a5174370b6f30739baf2e6f8b3738028415ba22)**

  - [ ] Smart color inference based on the following rules.

    **Status: See commit [0a51743](https://github.com/dragonman225/nast/commit/0a5174370b6f30739baf2e6f8b3738028415ba22)**

    ```
    (I = Block)
    If I have a color, I use my color.
    If I don't have a color, I ask my parent for it.
    If I don't have a parent, then just pretend I have a color.
    ```

- [ ] Smart layout (full width, page width, normal) for some media blocks and embed blocks.

  **Status: Image has best support, others have different partial support.**

  **Note: Images larger than page width but smaller than full width are unsupported and are displayed as page width.**

  _This feature should be moved to a wrapper block where all blocks can use if needed._

- [x] Caption in media blocks and embed blocks.

#### Inline ([SemanticString](https://github.com/dragonman225/nast/blob/0a5174370b6f30739baf2e6f8b3738028415ba22/packages/nast-types/SemanticString.d.ts#L20))

- [x] Bold, Italic, Strike, Link, Code, Colored, Commented.

- [x] Mention an [Individual](https://github.com/dragonman225/nast/blob/0a5174370b6f30739baf2e6f8b3738028415ba22/packages/nast-types/SemanticString.d.ts#L77)

  _Shows the individual's name._

- [x] Mention a [Resource](https://github.com/dragonman225/nast/blob/0a5174370b6f30739baf2e6f8b3738028415ba22/packages/nast-types/SemanticString.d.ts#L95)

  _Show the resource's name._

- [x] Mention a [DateTime](https://github.com/dragonman225/nast/blob/0a5174370b6f30739baf2e6f8b3738028415ba22/packages/nast-types/SemanticString.d.ts#L130)

  _Support `start_date` and `end_date`_.

#### Basic Blocks

- [x] Text
- [x] Embedded Page / Link To Page

  _Gotcha 1: Empty pages and filled pages has the same "filled" icon._

  _Gotcha 2: Embedded Page and Link To Page looks the same._

- [x] Heading (1, 2, 3)
- [x] Bulleted List
- [x] Numbered List
- [x] Toggle List
- [x] To-do List
- [x] Quote
- [x] Divider
- [x] Callout

#### Database Blocks

- [x] Table

  _Gotcha 1: Only property types "Title", "Text", "URL", "Checkbox", "Select", "Multi-select" are correctly supported, other types are treated as "Text"._

  _Gotcha 2: Always wrap text._

- [x] Gallery

  _Gotcha 1: Only property type "Title" is rendered._

  _Gotcha 2: For "Card Preview" option, only "Page Cover" is supported._

- [ ] List
- [ ] Calendar
- [ ] Board

#### Media Blocks

- [x] Image
- [x] Web Bookmark
- [x] Video
- [x] Audio
- [x] Code
- [x] File

#### Embed Blocks

- [x] Embed
- [x] PDF

#### Advanced Blocks

- [x] Table of Contents
- [x] Math Equation
- [ ] Template Button

  **Status: The template is directly rendered as children like normal content blocks.**

- [ ] Breadcrumb

  **Status: Unable to implement in current rendering framework because it does not allow traveling to other pages.**

## Develop

Auto-detect changes and rebuild.

```bash
npm run dev
```

Generate data for testing.

```bash
npm run update-test-data
```

Test rendering to HTML.

```bash
npm run test
```
