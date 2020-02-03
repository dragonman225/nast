import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface BookmarkProps extends BlockRendererProps {
  current: NAST.Bookmark
}

export function Bookmark(props: BookmarkProps) {
  const cname = "Bookmark"
  const data = props.current
  return (
    <div id={data.uri} className={cname}>
      <a href={data.link}>
        {data.title ?
          <h5 className={`${cname}__Title`}>{data.title}</h5> : ""}
        {data.description ?
          <p className={`${cname}__Desc`}>{data.description}</p> : ""}
        <p className={`${cname}__Link`}>{data.link}</p>
      </a>
    </div>
  )
}