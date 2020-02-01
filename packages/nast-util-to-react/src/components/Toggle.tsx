import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface ToggleProps extends BlockRendererProps {
  current: NAST.Toggle
}

export function Toggle(props: ToggleProps) {
  const cname = "toggle"
  const data = props.current
  return (
    <details id={data.uri} className={cname}>
      <summary className={`${cname}__summary`}>
        <SemanticStringArray semanticStringArray={data.title} />
      </summary>
      <div className={`${cname}__content`}>
        {props.children}
      </div>
    </details>
  )
}