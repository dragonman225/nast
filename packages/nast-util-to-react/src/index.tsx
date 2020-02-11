import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as NAST from "nast-types"
import { RenderBlockOptions, BlockRenderer, ListWrapper } from "./interfaces"

/** Components. TODO: How to dynamically load these ? */
import { Audio } from "./components/Audio"
import { Bookmark } from "./components/Bookmark"
import { BulletedList, BulletedListWrapper } from "./components/BulletedList"
import { Callout } from "./components/Callout"
import { Code } from "./components/Code"
import { Column, ColumnList } from "./components/ColumnList"
import { Divider } from "./components/Divider"
import { Embed } from "./components/Embed"
import { EquationDriver } from "./components/Equation"
import { File } from "./components/File"
import { Heading } from "./components/Heading"
import { Image } from "./components/Image"
import { NumberedList, NumberedListWrapper } from "./components/NumberedList"
import { Page } from "./components/Page"
import { PDF } from "./components/PDF"
import { QuoteDriver } from "./components/Quote"
import { TableOfContents } from "./components/TableOfContents"
import { Text } from "./components/Text"
import { ToDo } from "./components/ToDo"
import { Toggle } from "./components/Toggle"

const blockRendererRegistry = new Map<string, BlockRenderer>()
blockRendererRegistry.set("audio", Audio as BlockRenderer)
blockRendererRegistry.set("bookmark", Bookmark as BlockRenderer)
blockRendererRegistry.set("bulleted_list", BulletedList as BlockRenderer)
blockRendererRegistry.set("callout", Callout as BlockRenderer)
blockRendererRegistry.set("code", Code as BlockRenderer)
blockRendererRegistry.set("column", Column as BlockRenderer)
blockRendererRegistry.set("column_list", ColumnList as BlockRenderer)
blockRendererRegistry.set("divider", Divider as BlockRenderer)
blockRendererRegistry.set("embed", Embed as BlockRenderer)
blockRendererRegistry.set("equation", EquationDriver as BlockRenderer)
blockRendererRegistry.set("file", File as BlockRenderer)
blockRendererRegistry.set("heading", Heading as BlockRenderer)
blockRendererRegistry.set("image", Image as BlockRenderer)
blockRendererRegistry.set("numbered_list", NumberedList as BlockRenderer)
blockRendererRegistry.set("page", Page as BlockRenderer)
blockRendererRegistry.set("pdf", PDF as BlockRenderer)
blockRendererRegistry.set("quote", QuoteDriver as BlockRenderer)
blockRendererRegistry.set("table_of_contents", TableOfContents as BlockRenderer)
blockRendererRegistry.set("text", Text as BlockRenderer)
blockRendererRegistry.set("to_do", ToDo as BlockRenderer)
blockRendererRegistry.set("toggle", Toggle as BlockRenderer)

const listWrapperRegistry = new Map<string, ListWrapper>()
listWrapperRegistry.set("bulleted_list", BulletedListWrapper)
listWrapperRegistry.set("numbered_list", NumberedListWrapper)

function renderBlock(opts: RenderBlockOptions): JSX.Element {

  console.log(`depth: ${opts.depth}, listOrder: ${opts.listOrder}, key: ${opts.reactKey}`)

  const blockRendererRegistry = opts.blockRendererRegistry
  const listWrapperRegistry = opts.listWrapperRegistry
  const childrenData = opts.current.children

  let childrenRendered: JSX.Element[] = []
  let listItemQueue: RenderBlockOptions[] = []
  let listOrder = 1

  for (let i = 0; i < childrenData.length; i++) {

    const current = childrenData[i]
    const prev = childrenData[i - 1]
    const next = childrenData[i + 1]

    if (prev && prev.type === current.type) {
      listOrder++
    } else {
      listOrder = 1
    }

    const parent = opts.current
    const root = opts.root
    const depth = opts.depth + 1
    const reactKey = `${opts.reactKey}+` +
      `d${depth}-c${i + 1}-${current.type}${listOrder}`

    /**
     * When a block is processed for the first time, it is not rendered 
     * but queued in the listItemQueue, and its listLength is set to 0. 
     * Once the boundary of the list (a sequence of adjacent blocks of 
     * the same type) is found, listLengths of blocks in the listItemQueue 
     * are set to the correct value and blocks are rendered.
     * 
     * A list boundary is where adjacent blocks are of different types.
     */
    if (listOrder === 1) {
      /** Render the list. */
      const listRendered = renderList(listItemQueue, listWrapperRegistry)
      childrenRendered = childrenRendered.concat(listRendered)
      /** Clear listItemQueue. */
      listItemQueue = []
    }

    listItemQueue.push({
      current, prev, next, parent, root, depth, listOrder,
      listLength: 0, reactKey, blockRendererRegistry, listWrapperRegistry
    })

  }

  /** Render the last list in children. */
  const listRendered = renderList(listItemQueue, listWrapperRegistry)
  childrenRendered = childrenRendered.concat(listRendered)

  /** Render current block. */
  const Renderer = blockRendererRegistry.get(opts.current.type)
  if (Renderer)
    return (
      <Renderer
        current={opts.current}
        prev={opts.prev}
        next={opts.next}
        parent={opts.parent}
        root={opts.root}
        depth={opts.depth}
        listOrder={opts.listOrder}
        listLength={opts.listLength}
        key={opts.reactKey}>
        {childrenRendered}
      </Renderer>
    )
  else
    return <div key={opts.reactKey}>{childrenRendered}</div>
}

/**
 * Render a list of one type, if a ListWrapper of the type is registered, 
 * the list will be wrapped by the wrapper.
 * @param listItemQueue 
 * @param listWrapperRegistry 
 */
function renderList(
  listItemQueue: RenderBlockOptions[],
  listWrapperRegistry: Map<string, ListWrapper>
): JSX.Element[] {
  /** Render blocks. */
  const listRendered: JSX.Element[] = []
  for (let i = 0; i < listItemQueue.length; i++) {
    listItemQueue[i].listLength = listItemQueue.length
    listRendered.push(renderBlock(listItemQueue[i]))
  }
  /** Render list wrapper. */
  if (listItemQueue.length > 0) {
    const listType = listItemQueue[0].current.type
    const ListWrapper = listWrapperRegistry.get(listType)
    if (ListWrapper)
      return [<ListWrapper>{listRendered}</ListWrapper>]
    else
      return listRendered
  } else {
    return listRendered
  }
}

/**
 * Render NAST to HTML.
 * @param tree 
 */
function renderToHTML(tree: NAST.Block): string {
  return ReactDOMServer.renderToStaticMarkup(renderToJSX(tree))
}

/**
 * Render NAST to JSX.Element.
 * @param tree 
 */
function renderToJSX(tree: NAST.Block): JSX.Element {
  return renderBlock({
    current: tree,
    root: tree,
    depth: 0,
    listOrder: 1,
    listLength: 1,
    reactKey: `d0-c1-${tree.type}1`,
    blockRendererRegistry,
    listWrapperRegistry
  })
}

export { renderToHTML, renderToJSX }