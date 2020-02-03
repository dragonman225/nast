import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { Icon } from "./Icon"
import { SemanticStringArray } from "./SemanticString"

export interface PageProps extends BlockRendererProps {
  current: NAST.Page
}

export function Page(props: PageProps) {
  const data = props.current
  const isRoot = props.current === props.root
  if (isRoot) {
    const blockName = "PageRoot"
    return (
      <div id={data.uri} className={data.fullWidth ?
        `${blockName} ${blockName}--FullWidth` : `${blockName}`}>
        {props.children}
      </div>
    )
  } else {
    const blockName = "Page"
    return (
      <a id={data.uri} className={blockName} href={data.uri}>
        <div>
          <div className={`${blockName}__Icon`}>
            {
              data.icon ?
                <Icon src={data.icon} size="1em" /> :
                <svg viewBox="0 0 30 30" style={{
                  width: "1.1875em",
                  height: "1.1875em",
                  fill: "inherit",
                  opacity: "0.8"
                }}>
                  <g>
                    <path d="M16,1H4v28h22V11L16,1z M23.172,11H16V3.828L23.172,11z M24,27H6V3h8v10h10V27z"></path>
                  </g>
                </svg>
            }
          </div>
          <div className={`${blockName}__Title`}>
            <SemanticStringArray
              semanticStringArray={data.title.length ? data.title : [["Untitled"]]} />
          </div>
        </div>
      </a>
    )
  }
}