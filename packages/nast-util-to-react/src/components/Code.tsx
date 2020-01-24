import * as React from "react"
import * as NAST from "nast-types"
import { RendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface CodeProps extends RendererProps {
  current: NAST.Code
}

export function Code(props: CodeProps) {
  return (
    <>
      <pre id={props.current.uri} className="code">
        <code>
          <SemanticStringArray
            semanticStringArray={props.current.title}
            isCode={true}
            codeLang={props.current.language} />
        </code>
      </pre>
    </>
  )
}