import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface DividerProps extends BlockRendererProps {
  current: NAST.Divider
}

export function Divider(props: DividerProps) {
  return (
    <div id={props.current.uri} className="Divider" />
  )
}