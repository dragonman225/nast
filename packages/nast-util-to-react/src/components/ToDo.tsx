import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface ToDoProps extends BlockRendererProps {
  current: NAST.ToDo
}

export function ToDo(props: ToDoProps) {
  const cname = "ToDo"
  const data = props.current
  return (
    <div id={data.uri} className={cname}>
      <div className={`${cname}__Content`}>
        <div className={`${cname}__Icon`}>
          {
            data.checked ?
              <div className="IconCheckboxChecked">
                <svg viewBox="0 0 14 14">
                  <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
                </svg>
              </div> :
              <div className="IconCheckboxUnchecked">
                <svg viewBox="0 0 16 16">
                  <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path>
                </svg>
              </div>
          }
        </div>
        {
          data.checked ?
            <div className={`${cname}__Title ${cname}__Title--done`}>
              <del>
                <SemanticStringArray semanticStringArray={data.title} />
              </del>
            </div> :
            <div className={`${cname}__Title`}>
              <SemanticStringArray semanticStringArray={data.title} />
            </div>
        }
      </div>
      {
        props.children.length ?
          <div className={`${cname}__Children`}>
            {props.children}
          </div> : ""
      }
    </div>
  )
}