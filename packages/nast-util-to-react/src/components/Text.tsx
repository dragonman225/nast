import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { colorfulBlock } from "../util"
import { SemanticStringArray } from "./SemanticString"

export interface TextProps extends BlockRendererProps {
  current: NAST.Text
}

export function Text(props: TextProps) {
  const blockName = "Text"
  const data = props.current
  /**
   * If I have a color, I use my color. 
   * If I don't have a color, I ask my parent for it.
   * If I don't have a parent, then just pretend I have a color.
   */
  const color = data.color ? data.color :
    props.parent ? props.parent.color : data.color
  return (
    <div id={data.uri} className={`${colorfulBlock(color)} ${blockName}`}>
      <p className={`${blockName}__Content`}>
        <SemanticStringArray semanticStringArray={props.current.title} />
      </p>
      {
        props.children.length ?
          <div className={`${blockName}__Children`}>
            {props.children}
          </div>
          : ""
      }
    </div>
  )
}