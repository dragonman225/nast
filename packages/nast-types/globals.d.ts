import {
  SemanticString as NotionSemanticString, CollectionView
} from "notionapi-agent/dist/interfaces/notion-models"
import {
  CollectionSchema
} from "notionapi-agent/dist/interfaces/notion-models/Collection"

declare namespace NAST {

  type UUID = string
  type URL = string

  type SemanticString = NotionSemanticString

  interface Parent {
    children: Block[]
  }

  interface Block extends Parent {
    id: UUID
    type: string
    color?: string
  }

  interface Page extends Block {
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

  interface Text extends Block {
    type: "text"
    title: SemanticString[]
  }

  interface ToDo extends Block {
    type: "to_do"
    title: SemanticString[]
    checked: boolean
  }

  interface Heading extends Block {
    type: "heading"
    title: SemanticString[]
    depth: number
  }

  interface BulletedList extends Block {
    type: "bulleted_list"
    title: SemanticString[]
  }

  interface NumberedList extends Block {
    type: "numbered_list"
    title: SemanticString[]
  }

  interface Toggle extends Block {
    type: "toggle"
    title: SemanticString[]
  }

  interface Quote extends Block {
    type: "quote"
    title: SemanticString[]
  }

  interface Divider extends Block {
    type: "divider"
  }

  interface Callout extends Block {
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
  interface Visual extends Block {
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

  interface Embed extends Visual {
    type: "embed"
  }

  interface Image extends Visual {
    type: "image"
  }

  interface Video extends Visual {
    type: "video"
  }

  interface Audio extends Block {
    type: "audio"
    source: URL
  }

  interface Bookmark extends Block {
    type: "bookmark"
    link: URL
    title?: string
    description?: string
    icon?: string
    cover?: string
  }

  interface Code extends Block {
    type: "code"
    title: SemanticString[]
    language?: string
    wrap: boolean
  }

  interface Equation extends Block {
    type: "equation"
    latex: string
  }

  /** A kind of helper for parallel layout. */
  interface ColumnList extends Block {
    type: "column_list"
    children: Column[]
  }

  /** A kind of helper for parallel layout. */
  interface Column extends Block {
    type: "column"
    ratio: number
  }

  interface Collection extends Block {
    type: "collection_inline" | "collection_page"
    name: SemanticString[]
    collectionId: UUID
    defaultViewId: UUID
    views: CollectionView[]
    schema: CollectionSchema
    children: Page[]
  }

  interface CollectionInline extends Collection {
    type: "collection_inline"
  }

  interface CollectionPage extends Collection {
    type: "collection_page"
    icon?: URL
    cover?: URL
    description?: SemanticString[]
    coverPosition: number
  }

  interface TableOfContent extends Block {
    type: "table_of_content"
  }

  interface BreadCrumb extends Block {
    type: "breadcrumb"
  }

  interface File extends Block {
    type: "file"
  }
  
}