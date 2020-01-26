import * as React from "react"
import * as NAST from "nast-types"
import { RendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface TextProps extends RendererProps {
  current: NAST.Text
}

export function Text(props: TextProps) {
  return (
    <>
      <p id={props.current.uri} className="text">
        <SemanticStringArray semanticStringArray={props.current.title} />
      </p>
      {
        props.children.length ?
          <div className="indent" style={{ marginLeft: "1em" }}>
            {props.children}
          </div>
          : ""
      }
    </>
  )
}