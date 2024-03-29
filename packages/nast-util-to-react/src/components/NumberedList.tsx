import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps, ListWrapperProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface NumberedListProps extends BlockRendererProps {
  current: NAST.NumberedList
}

export function NumberedList(props: NumberedListProps) {
  return (
    <li key={props.current.uri} id={props.current.uri} className="NumberedList"
      value={props.listOrder}>
      <SemanticStringArray semanticStringArray={props.current.title} />
      {props.children}
    </li>
  )
}

export function NumberedListWrapper(props: ListWrapperProps) {
  return (
    <ol className="NumberedListWrapper">{props.children}</ol>
  )
}