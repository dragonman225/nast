import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface DividerProps extends BlockRendererProps {
  current: NAST.Divider
}

export function Divider(props: DividerProps) {
  return (
    <div id={props.current.uri} className="divider"
      style={{
        width: "100%",
        border: "1px solid rgba(55, 53, 47, 0.09)"
      }} />
  )
}