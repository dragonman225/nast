import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface HeadingProps extends BlockRendererProps {
  current: NAST.Heading
}

export function Heading(props: HeadingProps) {
  const blockName = "Heading"
  const data = props.current
  switch (data.depth) {
    case 1: {
      return (
        <>
          <h1 id={data.uri} className={`${blockName} ${blockName}--D1`}>
            <SemanticStringArray
              semanticStringArray={data.title} />
          </h1>
          {props.children}
        </>
      )
    }

    case 2: {
      return (
        <>
          <h2 id={data.uri} className={`${blockName} ${blockName}--D2`}>
            <SemanticStringArray
              semanticStringArray={data.title} />
          </h2>
          {props.children}
        </>
      )
    }

    default: {
      return (
        <>
          <h3 id={data.uri} className={`${blockName} ${blockName}--D3`}>
            <SemanticStringArray
              semanticStringArray={data.title} />
          </h3>
          {props.children}
        </>
      )
    }
  }
}