import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface HeadingProps extends BlockRendererProps {
  current: NAST.Heading
}

export function Heading(props: HeadingProps) {
  switch (props.current.depth) {
    case 1: {
      return (
        <>
          <h1 id={props.current.uri} className="heading">
            <SemanticStringArray
              semanticStringArray={props.current.title} />
          </h1>
          {props.children}
        </>
      )
    }

    case 2: {
      return (
        <>
          <h2 id={props.current.uri} className="heading">
            <SemanticStringArray
              semanticStringArray={props.current.title} />
          </h2>
          {props.children}
        </>
      )
    }

    default: {
      return (
        <>
          <h3 id={props.current.uri} className="heading">
            <SemanticStringArray
              semanticStringArray={props.current.title} />
          </h3>
          {props.children}
        </>
      )
    }
  }
}