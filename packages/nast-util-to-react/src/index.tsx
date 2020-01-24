import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as NAST from "nast-types"
import { RenderBlockOptions, Renderer } from "./interfaces"

/** Components. TODO: How to dynamically load these ? */
import { Audio } from "./components/Audio"
import { Code } from "./components/Code"
import { Column, ColumnList } from "./components/ColumnList"
import { Heading } from "./components/Heading"
import { Text } from "./components/Text"

const rendererRegistry = new Map<string, Renderer>()
rendererRegistry.set("audio", Audio as Renderer)
rendererRegistry.set("code", Code as Renderer)
rendererRegistry.set("column", Column as Renderer)
rendererRegistry.set("column_list", ColumnList as Renderer)
rendererRegistry.set("heading", Heading as Renderer)
rendererRegistry.set("text", Text as Renderer)

function renderBlock(opts: RenderBlockOptions): JSX.Element {

  console.log(`depth: ${opts.depth}, listOrder: ${opts.listOrder}, key: ${opts.reactKey}`)

  const Renderer = opts.rendererRegistry.get(opts.current.type)
  const childrenData = opts.current.children

  let childrenRendered: JSX.Element[] = []
  let listItemQueue: RenderBlockOptions[] = []
  let listOrder = 0

  for (let i = 0; i < childrenData.length; i++) {

    const current = childrenData[i]
    const prev = childrenData[i - 1]
    const next = childrenData[i + 1]

    if (prev && prev.type === current.type) {
      listOrder++
    } else {
      listOrder = 0
    }

    const parent = opts.current
    const root = opts.root
    const depth = opts.depth + 1
    const reactKey = `${opts.reactKey}+` +
      `d${depth}-c${i}-${current.type}${listOrder}`
    const rendererRegistry = opts.rendererRegistry

    /**
     * When a block is processed for the first time, it is not rendered 
     * but queued in the listItemQueue, and its listLength is set to 0. 
     * Once the boundary of the list (a sequence of adjacent blocks of 
     * the same type) is found, listLengths of blocks in the listItemQueue 
     * are set to the correct value and blocks are rendered.
     * 
     * A list boundary is where adjacent blocks are of different types.
     */
    if (listOrder === 0) {
      for (let i = 0; i < listItemQueue.length; i++) {
        listItemQueue[i].listLength = listItemQueue.length
        childrenRendered.push(renderBlock(listItemQueue[i]))
      }
      listItemQueue = []
    }

    listItemQueue.push({
      current, prev, next, parent, root, depth, listOrder,
      listLength: 0, reactKey, rendererRegistry
    })

  }

  /** Render blocks in the last listItemQueue. */
  for (let i = 0; i < listItemQueue.length; i++) {
    listItemQueue[i].listLength = listItemQueue.length
    childrenRendered.push(renderBlock(listItemQueue[i]))
  }

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

function renderToHTML(tree: NAST.Block): string {

  return ReactDOMServer.renderToStaticMarkup(renderToJSX(tree))

}

function renderToJSX(tree: NAST.Block): JSX.Element {

  return renderBlock({
    current: tree,
    root: tree,
    depth: 0,
    listOrder: 0,
    listLength: 1,
    reactKey: `d0-c0-${tree.type}0`,
    rendererRegistry
  })

}

export { renderToHTML, renderToJSX }