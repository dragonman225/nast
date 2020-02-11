import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface PDFProps extends BlockRendererProps {
  current: NAST.PDF
}

export function PDF(props: PDFProps) {
  const blockName = "PDF"
  const data = props.current
  const width = data.fullWidth ? "100%" : data.width
  const height = data.height
  return (
    <div id={data.uri} className={blockName}>
      <div className={`${blockName}__Content`}>
        <embed width={width} height={height} src={data.source}
          type="application/pdf" />
      </div>
      {
        data.caption ?
          <p className={`${blockName}__Caption`}>
            <SemanticStringArray semanticStringArray={data.caption} />
          </p> : ""
      }
    </div >
  )
}