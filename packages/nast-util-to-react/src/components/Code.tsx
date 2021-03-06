import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface CodeProps extends BlockRendererProps {
  current: NAST.Code
}

export function Code(props: CodeProps) {
  const className = props.current.wrap ? "Code" : "Code Code--NoWrap"
  return (
    <pre id={props.current.uri} className={className}>
      <code>
        <SemanticStringArray
          semanticStringArray={props.current.title}
          isCode={true}
          codeLang={props.current.language} />
      </code>
    </pre>
  )
}