import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { colorfulBlock } from "../util"
import { Anchor } from "./Anchor"
import { SemanticStringArray } from "./SemanticString"

export interface HeadingProps extends BlockRendererProps {
  current: NAST.Heading
}

export function Heading(props: HeadingProps) {
  const blockName = "Heading"
  const data = props.current
  const content =
    <>
      <Anchor href={data.uri} />
      <SemanticStringArray semanticStringArray={data.title} />
    </>
  switch (data.depth) {
    case 1: {
      return (
        <>
          <h1 id={data.uri} className={`${colorfulBlock(data.color)} \
${blockName} ${blockName}--1`}>
            {content}
          </h1>
          {props.children}
        </>
      )
    }

    case 2: {
      return (
        <>
          <h2 id={data.uri} className={`${colorfulBlock(data.color)} \
${blockName} ${blockName}--2`}>
            {content}
          </h2>
          {props.children}
        </>
      )
    }

    default: {
      return (
        <>
          <h3 id={data.uri} className={`${colorfulBlock(data.color)} \
${blockName} ${blockName}--3`}>
            {content}
          </h3>
          {props.children}
        </>
      )
    }
  }
}