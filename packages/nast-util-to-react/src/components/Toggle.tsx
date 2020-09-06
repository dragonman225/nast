import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { colorfulBlock } from "../util"
import { SemanticStringArray } from "./SemanticString"

export interface ToggleProps extends BlockRendererProps {
  current: NAST.Toggle
}

export function Toggle(props: ToggleProps) {
  const blockName = "Toggle"
  const data = props.current
  /**
   * If I have a color, I use my color. 
   * If I don't have a color, I ask my parent for it.
   * If I don't have a parent, then just pretend I have a color.
   */
  const color = data.color ? data.color :
    props.parent ? props.parent.color : data.color
  return (
    <details id={data.uri} className={`${colorfulBlock(color)} ${blockName} ${props.children.length ? `` : `${blockName}--Empty`}`}>
      <summary className={`${blockName}__Summary`}>
        <SemanticStringArray semanticStringArray={data.title} />
      </summary>
      <div className={`${blockName}__Content`}>
        {props.children}
      </div>
    </details>
  )
}