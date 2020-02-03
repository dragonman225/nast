import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface TextProps extends BlockRendererProps {
  current: NAST.Text
}

export function Text(props: TextProps) {
  const name = "Text"
  return (
    <>
      <p id={props.current.uri} className={name}>
        <SemanticStringArray semanticStringArray={props.current.title} />
      </p>
      {
        props.children.length ?
          <div className={`${name}__Children`}>
            {props.children}
          </div>
          : ""
      }
    </>
  )
}