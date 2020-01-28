import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps, ListWrapperProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface BulletedListProps extends BlockRendererProps {
  current: NAST.BulletedList
}

export function BulletedList(props: BulletedListProps) {
  return (
    <li id={props.current.uri} className="bulleted_list">
      <SemanticStringArray semanticStringArray={props.current.title} />
      {props.children}
    </li>
  )
}

export function BulletedListWrapper(props: ListWrapperProps) {
  return (
    <ul>{props.children}</ul>
  )
}