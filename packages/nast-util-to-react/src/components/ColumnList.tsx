import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface ColumnListProps extends BlockRendererProps {
  current: NAST.ColumnList
}

export function ColumnList(props: ColumnListProps) {
  return (
    <div id={props.current.uri} className="ColumnList">
      {props.children}
    </div>
  )
}

export interface ColumnProps extends BlockRendererProps {
  current: NAST.Column
}

export function Column(props: ColumnProps) {
  const style: React.CSSProperties = {
    width: `calc((100% - var(--column-spacing) * ${props.listLength - 1}) * ${props.current.ratio})`
  }

  return (
    <div id={props.current.uri}
      className="Column"
      style={style}>
      {props.children}
    </div>
  )
}