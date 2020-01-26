import * as React from "react"
import * as NAST from "nast-types"
import { RendererProps } from "../interfaces"

export interface ColumnListProps extends RendererProps {
  current: NAST.ColumnList
}

export function ColumnList(props: ColumnListProps) {
  return (
    <div id={props.current.uri}
      className="column_list"
      style={{ display: "flex", flexWrap: "wrap" }}>
      {props.children}
    </div>
  )
}

export interface ColumnProps extends RendererProps {
  current: NAST.Column
}

export function Column(props: ColumnProps) {
  const columnSpacing = 46
  const style: React.CSSProperties = {
    wordBreak: "break-word",
    width: `calc((100% - \
${columnSpacing * (props.listLength - 1)}px) * ${props.current.ratio})`
  }

  if (props.listOrder !== 0) {
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