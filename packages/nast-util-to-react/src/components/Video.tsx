import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface VideoProps extends BlockRendererProps {
  current: NAST.Video
}

export function Video(props: VideoProps) {
  const blockName = "Video"
  const data = props.current
  const width = data.fullWidth ? "100%" : data.width
  return (
    <div id={data.uri} className={blockName}>
      <div className={`${blockName}__Content`}>
        <video width={width} controls>
          <source src={data.source} />
        </video>
      </div>
      {
        data.caption ?
          <p className={`${blockName}__Caption`}>
            <SemanticStringArray semanticStringArray={data.caption} />
          </p> : ""
      }
    </div>
  )
}