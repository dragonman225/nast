import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { colorfulBlock } from "../util"
import { SemanticStringArray } from "./SemanticString"
import { Icon } from "./Icon"

export interface CalloutProps extends BlockRendererProps {
  current: NAST.Callout
}

export function Callout(props: CalloutProps) {
  const blockName = "Callout"
  const data = props.current
  return (
    <div id={data.uri} className={`${colorfulBlock(data.color)} ${blockName}`}>
      <div className={`${blockName}__Icon`} >
        {data.icon ?
          <Icon src={data.icon} size="1.5em" /> : ""}
      </div>
      <p className={`${blockName}__Content`}>
        <SemanticStringArray semanticStringArray={data.title} />
        {props.children}
      </p>
    </div>
  )
}