import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface EmbedProps extends BlockRendererProps {
  current: NAST.Embed
}

export function Embed(props: EmbedProps) {
  const blockName = "Embed"
  const data = props.current
  const width = data.fullWidth ? "100%" : `${data.width}px`
  const src = data.source
  const aspectRatio = data.aspectRatio * 100
  const iframeSandbox =
    "allow-scripts allow-popups allow-forms allow-same-origin"
  return (
    <div id={data.uri} className={blockName}>
      <div className={`${blockName}__Content`}>
        <div className={`${blockName}__ResponsiveContainer`} style={{
          width,
          paddingBottom: `${aspectRatio}%`
        }}>
          <iframe src={src} sandbox={iframeSandbox} allowFullScreen />
        </div>
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