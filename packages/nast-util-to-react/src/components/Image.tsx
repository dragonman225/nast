import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface ImageProps extends BlockRendererProps {
  current: NAST.Image
}

export function Image(props: ImageProps) {
  const blockName = "Image"
  const data = props.current
  const width =
    data.fullWidth ? "calc(100vw - 15px)" :
      data.pageWidth ? "100%" : `${data.width}px`
  const variant =
    data.fullWidth ? "FullWidth" :
      data.pageWidth ? "PageWidth" : "Normal"
  const height = data.height + "px"
  return (
    <div id={data.uri} className={`${blockName} ${blockName}--${variant}`}>
      <figure>
        <a href={data.source}>
          <img src={data.source} style={
            data.fullWidth ? { height } : { width }
          } />
        </a>
        {
          data.caption ?
            <figcaption>
              <SemanticStringArray semanticStringArray={data.caption} />
            </figcaption> : ""
        }
      </figure>
    </div>
  )
}