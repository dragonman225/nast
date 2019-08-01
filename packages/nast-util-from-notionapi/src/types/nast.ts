import * as Notion from './api'

export interface Parent {
  children: Block[]
}

/** Displayed block in Notion.so. */
export interface Block extends Parent {
  id: string
  type: string
  color?: string
}

/** Hidden block in Notion.so. */
export interface HiddenBlock extends Parent {
  id: string
  type: string
}

/** Helper block that only exists in NAST. */
export interface PseudoBlock extends Parent {
  type: string
}

export interface PlainText extends Block {
  type: 'text'
  text: Notion.StyledString[]
}

export interface EmbededPage extends Block {
  type: 'embeded_page'
}

export interface ToDoList extends Block {
  type: 'to_do'
  text: Notion.StyledString[]
  checked: boolean
}

export interface Heading extends Block {
  type: 'heading'
  text: Notion.StyledString[]
  depth: number
}

/**
 * Both bulleted_list item & numbered_list use this interface.
 * Since we have wrappers, displayed look can be inferred 
 * by wrappers, so items can be the same.
 */
export interface ListItem extends Block {
  type: 'list_item'
  text: Notion.StyledString[]
}

/** Maybe not necessary? */
// export interface BulletedList extends Block {
//   type: 'bulleted_list'
//   text: StyledString[]
// }

// export interface numberedList extends Block {
//   type: 'numbered_list'
//   text: StyledString[]
// }

export interface ToggleList extends Block {
  type: 'toggle'
  text: Notion.StyledString[]
}

export interface Quote extends Block {
  type: 'quote'
  text: Notion.StyledString[]
}

export interface Divider extends Block {
  type: 'divider'
}

export interface LinkToPage extends Block {
  type: 'page_link'
}

export interface Callout extends Block {
  type: 'callout'
}

export interface Image extends Block {
  type: 'image'
  width: number
  source: string
  fullWidth: boolean
  pageWidth: boolean
}

export interface Video extends Block {
  type: 'video'
  width: number
  source: string
  fullWidth: boolean
  pageWidth: boolean
  aspectRatio: number
  preserveScale: boolean
}

export interface Audio extends Block {
  type: 'audio'
  source: string
}

export interface WebBookmark extends Block {
  type: 'bookmark'
  link: string
  title?: string
  description?: string
  icon?: string
  cover?: string
}

export interface Code extends Block {
  type: 'code'
  text: Notion.StyledString[]
  language: string
  wrap: boolean
}

export interface MathEquation extends Block {
  type: 'equation'
  latex: string
}

export interface ColumnList extends HiddenBlock {
  type: 'column_list'
}

export interface Column extends HiddenBlock {
  type: 'column'
  ratio: number
}

export interface Root extends PseudoBlock {
  type: 'root'
}

export interface UnorderedList extends PseudoBlock {
  type: 'unordered_list'
}

export interface OrderedList extends PseudoBlock {
  type: 'ordered_list'
}

export interface Collection {
  id: string
  collectionId: string
  icon: string
  type: 'collection'
  name: string
  schema: {
    [key: string]: Notion.SchemaItem
  }
  blocks: Notion.BlockValue[]
  views: CollectionViewMetadata[]
  defaultViewId: string
}

/**
 * CollectionViewMetadata mostly comes from
 * Notion.CollectionViewRecordValue and Notion.CollectionRecordValue
 */
export interface CollectionViewMetadata {
  id: string
  type: string
  name: string
  query: Notion.Query
  format: {}
  aggregate: AggregationMetadata[]
}

/**
 * AggregationMetadata merges useful parts of
 * Notion.Query.aggregate and Notion.AggregationResult
 */
export interface AggregationMetadata {
  aggregationType: string // From Notion.Query.aggregate
  property: string // From Notion.Query.aggregate
  value: number // From Notion.AggregationResult
}