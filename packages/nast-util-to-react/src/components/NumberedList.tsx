import * as React from "react"
import * as NAST from "nast-types"
import { RendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface NumberedListProps extends RendererProps {
  current: NAST.NumberedList
}

export function NumberedList(props: NumberedListProps) {
  return (
    <li id={props.current.uri} value={props.listOrder}>
      <SemanticStringArray semanticStringArray={props.current.title} />
      {props.children}
    </li>
  )
}