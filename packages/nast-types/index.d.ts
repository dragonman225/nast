import {
  SemanticString as NotionSemanticString, CollectionView
} from "notionapi-agent/dist/interfaces/notion-models"
import {
  CollectionSchema
} from "notionapi-agent/dist/interfaces/notion-models/Collection"

export as namespace NAST

export type UUID = string
export type URL = string
export type SemanticString = NotionSemanticString

export interface Parent {
  children: Block[]
}

export interface Block extends Parent {
  id: UUID
  type: string
  color?: string
}

export interface Page extends Block {
  type: "page"
  title: SemanticString[]
  icon?: URL
  cover?: URL
  fullWidth: boolean
  coverPosition: number
  properties?: {
    [key: string]: SemanticString[]
  }
}

export interface Text extends Block {
  type: "text"
  title: SemanticString[]
}

export interface ToDo extends Block {
  type: "to_do"
  title: SemanticString[]
  checked: boolean
}

export interface Heading extends Block {
  type: "heading"
  title: SemanticString[]
  depth: number
}

export interface BulletedList extends Block {
  type: "bulleted_list"
  title: SemanticString[]
}

export interface NumberedList extends Block {
  type: "numbered_list"
  title: SemanticString[]
}

export interface Toggle extends Block {
  type: "toggle"
  title: SemanticString[]
}

export interface Quote extends Block {
  type: "quote"
  title: SemanticString[]
}

export interface Divider extends Block {
  type: "divider"
}

export interface Callout extends Block {
  type: "callout"
  icon?: URL
  title: SemanticString[]
}

/**
 * Visual content container.
 * 
 * If `width`, `height`, or `aspectRatio` is -1, 
 * it can be decided by the renderer.
 */
export interface Visual extends Block {
  type: "embed" | "image" | "video"
  source: URL
  caption?: SemanticString[]
  width: number
  height: number
  fullWidth: boolean
  pageWidth: boolean
  aspectRatio: number
  preserveScale: boolean
}

export interface Embed extends Visual {
  type: "embed"
}

export interface Image extends Visual {
  type: "image"
}

export interface Video extends Visual {
  type: "video"
}

export interface Audio extends Block {
  type: "audio"
  source: URL
}

export interface Bookmark extends Block {
  type: "bookmark"
  link: URL
  title?: string
  description?: string
  icon?: string
  cover?: string
}

export interface Code extends Block {
  type: "code"
  title: SemanticString[]
  language?: string
  wrap: boolean
}

export interface Equation extends Block {
  type: "equation"
  latex: string
}

/** A kind of helper for parallel layout. */
export interface ColumnList extends Block {
  type: "column_list"
  children: Column[]
}

/** A kind of helper for parallel layout. */
export interface Column extends Block {
  type: "column"
  ratio: number
}

export interface Collection extends Block {
  type: "collection_inline" | "collection_page"
  name: SemanticString[]
  collectionId: UUID
  defaultViewId: UUID
  views: CollectionView[]
  schema: CollectionSchema
  children: Page[]
}

export interface CollectionInline extends Collection {
  type: "collection_inline"
}

export interface CollectionPage extends Collection {
  type: "collection_page"
  icon?: URL
  cover?: URL
  description?: SemanticString[]
  coverPosition: number
}

export interface TableOfContent extends Block {
  type: "table_of_content"
}

export interface BreadCrumb extends Block {
  type: "breadcrumb"
}

export interface File extends Block {
  type: "file"
}