import * as React from "react"
import * as NAST from "nast-types"
import { colorElemClass } from "../legacy/util"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"

export interface CollectionProps {
  view: NAST.Collection["views"][number]
  schema: NAST.Collection["schema"]
  rows: NAST.Page[]
}

export interface CollectionDriverProps extends BlockRendererProps {
  current: NAST.Collection
}

export function Collection(props: CollectionProps) {
  const viewType = props.view.type
  switch (viewType) {
    case "table":
      return <Table {...props} />
    case "gallery":
      return <Gallery {...props} />
    default:
      console.log(`Collection view type "${viewType}" is unsupported`)
      return <></>
  }
}

export function CollectionDriver(props: CollectionDriverProps) {
  const data = props.current
  const view = data.views.find(view => view.id === data.defaultViewId)
  const rows = data.children

  if (!view) {
    console.log(`Cannot find default view "${data.defaultViewId}" in \
collection "${data.collectionId}"`)
    return <></>
  }

  if (data.type === "collection_page") {
    const blockName = "CollectionPage"
    return (
      <main id={data.uri} className={blockName}>
        <Collection view={view} schema={data.schema} rows={rows} />
      </main>
    )
  } else {
    const blockName = "CollectionInline"
    return (
      <div id={data.uri} className={blockName}>
        <h3><SemanticStringArray semanticStringArray={data.name} /></h3>
        <Collection view={view} schema={data.schema} rows={rows} />
      </div>
    )
  }
}

export function Table(props: CollectionProps) {
  const blockName = "Table"
  const viewFormat = props.view.format
  const columnInfos = (viewFormat.table_properties || [])
    .filter(colViewInfo => colViewInfo.visible)
    /** 
     * Some collection views have "ghost" properties that don"t exist 
     * in collection schema.
     */
    .filter(colViewInfo => props.schema[colViewInfo.property])
    .map(colViewInfo => {
      const colId = colViewInfo.property
      return {
        id: colId,
        name: props.schema[colId].name,
        type: props.schema[colId].type,
        options: props.schema[colId].options,
        width: colViewInfo.width
      }
    })
  const tableHeadCells = columnInfos.map(info =>
    <th style={info.width ? { width: `${info.width}px` } : {}}>
      {info.name}
    </th>
  )
  const tableRows = props.rows
    .filter(row => row.properties)
    .map(row => {
      const rowProps = row.properties || {}
      return (
        <tr>
          {
            columnInfos.map(info => {
              const elemNameBase = `${blockName}__Cell`
              const colId = info.id
              const colType = info.type
              const colName = info.name
              const data = rowProps[colId]
              switch (colType) {
                case "checkbox": {
                  const elemName = `${elemNameBase}Checkbox`
                  const checked = data ? (data[0][0] === "Yes") : false
                  return (
                    <td className={`${elemName} ${checked ?
                      `${elemName}--Yes` : `${elemName}--No`}`}>
                      <div style={
                        checked ? { background: "rgb(46, 170, 220)" } : {}
                      }>
                        {
                          checked ?
                            <svg viewBox="0 0 14 14">
                              <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
                            </svg> :
                            <svg viewBox="0 0 16 16">
                              <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z" />
                            </svg>
                        }
                      </div>
                    </td>
                  )
                }
                case "title": {
                  return (
                    <td className={`${elemNameBase}Title`}>
                      <a href={row.uri}>
                        <SemanticStringArray
                          semanticStringArray={row.title} />
                      </a>
                    </td>
                  )
                }
                case "select":
                case "multi_select": {
                  const optionNames = data ? data[0][0].split(",") : []
                  return (
                    <td className={`${elemNameBase}Select`}>
                      {
                        optionNames.map(optionName => {
                          const option = (info.options || [])
                            .find(o => o.value === optionName)

                          if (!option) {
                            console.log(`Select option "${optionName}" is \
not found on property "${colId}:${colName}".`)
                            return <></>
                          }

                          return (
                            <span className={
                              colorElemClass("Pill Pill", option.color)}>
                              {option.value}
                            </span>
                          )
                        })
                      }
                    </td>
                  )
                }
                default:
                  return (
                    <td className={`${elemNameBase}Text`}>
                      <SemanticStringArray
                        semanticStringArray={rowProps[colId] || []} />
                    </td>
                  )
              }
            })
          }
        </tr>
      )
    })

  return (
    <div className={blockName}>
      <table>
        <thead>
          <tr>{tableHeadCells}</tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}

export function Gallery(props: CollectionProps) {
  const blockName = "Gallery"
  const viewFormat = props.view.format
  const imageContain = viewFormat.gallery_cover_aspect
    ? viewFormat.gallery_cover_aspect === "contain" : false

  const galleryItems = props.rows.map(row => {
    return (
      <div id={row.uri} className={`${blockName}__Item`}>
        <a href={row.uri}>
          <div>
            <div>
              <div className={`${blockName}__Item__Cover ${imageContain ?
                `${blockName}__Item__Cover--Contain` : ""}`}>
                {
                  row.cover ? <img src={row.cover} /> : ""
                }
              </div>
              <div className={`${blockName}__Item__Title`}>
                <SemanticStringArray semanticStringArray={row.title} />
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  })

  return (
    <div className={blockName}>
      {galleryItems}
    </div>
  )
}