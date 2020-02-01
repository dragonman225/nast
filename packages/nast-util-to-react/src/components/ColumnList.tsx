import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface ColumnListProps extends BlockRendererProps {
  current: NAST.ColumnList
}

export function ColumnList(props: ColumnListProps) {
  return (
    <div id={props.current.uri} className="column_list">
      {props.children}
    </div>
  )
}

export interface ColumnProps extends BlockRendererProps {
  current: NAST.Column
}

export function Column(props: ColumnProps) {
  const columnSpacing = 46
  const style: React.CSSProperties = {
    width: `calc((100% - \
${columnSpacing * (props.listLength - 1)}px) * ${props.current.ratio})`
  }

  if (props.listOrder !== 1) {
    style.marginLeft = columnSpacing + "px"
  }

  return (
    <div id={props.current.uri}
      className="column"
      style={style}>
      {props.children}
    </div>
  )
}