import * as React from "react"
import * as NAST from "nast-types"
import { RendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface BulletedListProps extends RendererProps {
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