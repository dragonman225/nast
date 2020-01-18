import { CollectionView } from "notionapi-agent/dist/interfaces/notion-models"

import { COLLECTION_VIEW_TYPES, COLLECTION_ITEM_PROPERTY_TYPES, CSS } from "../constants"
import { escapeString, renderSemanticStringArray } from "../util"

function renderCollection(
  node: NAST.Collection
): string {
  const viewMeta = node.views.find(view => view.id === node.defaultViewId)

  if (typeof viewMeta === "undefined") {
    console.log(`Cannot find view of ${node.defaultViewId}`)
    return ""
  }

  const pages = node.children

  switch (viewMeta.type) {
    case COLLECTION_VIEW_TYPES.table:
      return renderTable(node, pages, viewMeta)
    case COLLECTION_VIEW_TYPES.gallery:
      return renderGallery(node, pages, viewMeta)
    default:
      console.log(`No render function for collection view "${viewMeta.type}".`)
      return ""
  }
}

function renderTable(
  node: NAST.Collection,
  pages: NAST.Page[],
  view: CollectionView
): string {
  const viewFormat = view.format
  const title = escapeString(node.name[0][0])
  // const wrap = (typeof viewFormat.table_wrap === "undefined")
  //   ? viewFormat.table_wrap : true

  const viewSchema = (viewFormat.table_properties || [])
    .filter(colViewInfo => colViewInfo.visible)
    /** 
     * Some collection views have "ghost" properties that don"t exist 
     * in collection schema.
     */
    .filter(colViewInfo => node.schema[colViewInfo.property])
    .map(colViewInfo => {
      const colId = colViewInfo.property

      return {
        id: colId,
        width: colViewInfo.width,
        name: node.schema[colId].name,
        type: node.schema[colId].type,
        options: node.schema[colId].options
      }
    })

  const theadHTML = viewSchema
    .map(col => `<th style="${col.width ? `width: ${col.width}px;` : ""}">${escapeString(col.name)}</th>`)

  const trowsHTML = pages
    /** Skip empty collection items (pages without properties) */
    .filter(page => page.properties)
    .map(page => {
      /**
       * Notion put properties of a collection item in the item"s "page" block. 
       * They even mixed those properties with "Notion.BlockProperties". 
       * Quite confusing and messy.
       */
      const pageProps = page.properties as { [key: string]: NAST.SemanticString[] }
      const row = viewSchema.map(clctItemProp => {

        switch (clctItemProp.type) {
          case COLLECTION_ITEM_PROPERTY_TYPES.title: {
            return `<td class="${CSS.tableCellContentType.text}"><span>${escapeString(page.title[0][0])}</span></td>`
          }
          case COLLECTION_ITEM_PROPERTY_TYPES.url:
          case COLLECTION_ITEM_PROPERTY_TYPES.text: {
            return `<td class="${CSS.tableCellContentType.text}"><span>${renderSemanticStringArray(pageProps[clctItemProp.id])}</span></td>`
          }
          case COLLECTION_ITEM_PROPERTY_TYPES.select:
          case COLLECTION_ITEM_PROPERTY_TYPES.multiSelect: {
            const optionNames = pageProps[clctItemProp.id]
              ? pageProps[clctItemProp.id][0][0].split(",") : []
            const optionsHTML = optionNames.map(optionName => {

              const option = (clctItemProp.options || []).find(o => o.value === optionName)

              if (!option) {
                console.log(`Select option "${optionName}" isn"t found on property "${clctItemProp.id}:${clctItemProp.name}".`)
                return ""
              }

              const color = `${CSS.tagInTableCellColorPrefix}${option.color}`
              return `<span class="${color}">${escapeString(option.value)}</span>`
            })

            return `<td class="${CSS.tableCellContentType.select}">${optionsHTML.join("")}</td>`
          }
          case COLLECTION_ITEM_PROPERTY_TYPES.checkbox: {
            const checkboxVal = pageProps[clctItemProp.id]
            const checked = checkboxVal ? checkboxVal[0][0] === "Yes" : false

            const checkedSvg = "<svg viewBox=\"0 0 14 14\" style=\"width: 12px; height: 12px; display: block; fill: white; flex-shrink: 0; backface-visibility: hidden;\" class=\"check\"><polygon points=\"5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039\"></polygon></svg>"
            const unCheckedSvg = "<svg viewBox=\"0 0 16 16\" style=\"width: 100%; height: 100%; display: block; flex-shrink: 0; backface-visibility: hidden;\" class=\"checkboxSquare\"><path d=\"M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z\"></path></svg>"

            if (checked) {
              return `<td class="${CSS.tableCellContentType.checkbox}"><div class="${CSS.checkBoxInTablePrefix}yes">${checkedSvg}</div></td>`
            } else {
              return `<td class="${CSS.tableCellContentType.checkbox}"><div class="${CSS.checkBoxInTablePrefix}no">${unCheckedSvg}</div></td>`
            }
          }
          default:
            console.log(`Collection item property type "${clctItemProp.type}" hasn"t been implemented.`)
            return `<td><span class="${CSS.tableCellContentType.text}">${renderSemanticStringArray(pageProps[clctItemProp.id])}</span></td>`
        }
      })

      return `<tr>${row.join("")}</tr>`
    })

  const tableHTML = `\
  <div class="collection-view-table">
    <h4>${title}</h4>
    <table style="width: 100%;">
      <thead>
        <tr>${theadHTML.join("")}</tr>
      </thead>
      <tbody>
        ${trowsHTML.join("\n")}
      </tbody>
    </table>
  </div>`

  return tableHTML
}

function renderGallery(
  node: NAST.Collection,
  pages: NAST.Page[],
  view: CollectionView
): string {
  const viewFormat = view.format
  const title = escapeString(node.name[0][0])
  const imageContain = viewFormat.gallery_cover_aspect
    ? viewFormat.gallery_cover_aspect === "contain" : false

  const pagesHTMLArr = pages.map(page => {
    return `\
<div id="${page.uri}" class="grid-item">
  <a href="${page.uri}">
  <div class="gird-item-content">
    <div>
      <div class="grid-item-cover ${imageContain
        ? "grid-item-cover--contain" : ""}">
        ${page.cover ? `<img src="${page.cover}" data-src="${page.cover}">` : ""}
      </div>
      <div class="grid-item-title">
        ${escapeString(page.title[0][0])}
      </div>
    </div>
  </div>
  </a>
</div>`
  })

  const galleryHTML = `\
<div class="collection-view-gallery">
  <h4>${title}</h4>
  <div class="grid">
    ${pagesHTMLArr.join("")}
  </div>
</div>`

  return galleryHTML
}

// function factorySortFunc(sortQuery: Sort[]) {
//   let directions = sortQuery.map(q => {
//     if (q.direction === "descending") return -1
//     else return 1
//   })

//   return function (a: NAST.Page, b: NAST.Page): number {
//     for (let i = 0; i < directions.length; ++i) {
//       let field: "title" | "createdTime"

//       if (sortQuery[i].type === "title") field = "title"
//       else if (sortQuery[i].type === "created_time") field = "createdTime"
//       else continue

//       /**
//        * Tricks here: when a[field] equals b[field], it does
//        * not return, continue to compare the next field.
//        */
//       if (a[field] > b[field]) return directions[i]
//       if (a[field] < b[field]) return -(directions[i])
//     }
//     return 0
//   }
// }

export default renderCollection