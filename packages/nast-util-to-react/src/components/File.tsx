import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface FileProps extends BlockRendererProps {
  current: NAST.File
}

export function File(props: FileProps) {
  const cname = "File"
  const data = props.current
  return (
    <a id={data.uri} className={cname} href={data.source}>
      <div>
        <div className={`${cname}__Icon`}>
          <svg viewBox="0 0 30 30" style={{
            width: "1.35em",
            height: "1.35em",
            fill: "inherit"
          }}>
            <g>
              <path d="M22,8v12c0,3.866-3.134,7-7,7s-7-3.134-7-7V8c0-2.762,2.238-5,5-5s5,2.238,5,5v12c0,1.657-1.343,3-3,3s-3-1.343-3-3V8h-2v12c0,2.762,2.238,5,5,5s5-2.238,5-5V8c0-3.866-3.134-7-7-7S6,4.134,6,8v12c0,4.971,4.029,9,9,9s9-4.029,9-9V8H22z"></path>
            </g>
          </svg>
        </div>
        <div>
          <span className={`${cname}__Title`}>{data.title}</span>
          {
            data.size ?
              <span className={`${cname}__Size`}>{data.size}</span> : ""
          }
        </div>
      </div>
    </a>
  )
}