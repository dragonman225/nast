import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface TableOfContentsProps extends BlockRendererProps {
  current: NAST.TableOfContent
}

export function TableOfContents(props: TableOfContentsProps) {
  const blocks = getBlocksThatCanBePutInTOC(props.root)
  const rendered: JSX.Element[] = []
  const indentWidth = 24
  const indentUnit = "px"
  let prevHDepth = 0 // previous heading depth
  let indentNum = 0
  for (let i = 0; i < blocks.length; i++) {
    const h = blocks[i] as NAST.Heading

    if (prevHDepth === 0) {
      prevHDepth = h.depth
    }

    /**
     * Indentation is based on context, e.g. h3 has no indentation when 
     * there is no h1 or h2 before it.
     */
    if (h.depth > prevHDepth) {
      /** Increase indentation when smaller heading is encountered. */
      prevHDepth = h.depth
      indentNum++
    } else if (h.depth < prevHDepth) {
      /** 
       * Decrease indentation when bigger heading is encountered, 
       * but stop at zero indentation.
       */
      prevHDepth = h.depth
      if (indentNum > 0) indentNum--
    }

    rendered.push(
      <li>
        <a href={`#${h.uri}`}>
          <div style={{ marginLeft: `${indentNum * indentWidth}${indentUnit}` }}>
            <SemanticStringArray semanticStringArray={h.title} />
          </div>
        </a>
      </li>
    )
  }

  return (
    <ul id={props.current.uri} className="table_of_contents">
      {rendered}
    </ul>
  )
}


function getBlocksThatCanBePutInTOC(tree: NAST.Block): NAST.Block[] {
  const blocks: NAST.Block[] = []
  for (let i = 0; i < tree.children.length; i++) {
    const block = tree.children[i]
    switch (block.type) {
      case "heading": {
        blocks.push(block)
        break
      }

      /** Inspect the first layer of column list. */
      case "column_list": {
        const columnList = block as NAST.ColumnList
        columnList.children.forEach(column => {
          column.children.forEach(block => {
            if (block.type === "heading") blocks.push(block)
          })
        })
        break
      }
    }
  }
  return blocks
}