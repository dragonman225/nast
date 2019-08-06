/**
 * Notion.Agent
 */
export interface Agent {
  loadPageChunk: Function
  getAssetsJson: Function
  getRecordValues: Function
  loadUserContent: Function
  queryCollection: Function
  submitTransaction: Function
}

export interface RecordRequest {
  id: string
  table: string
}

export interface AgentResponse {
  statusCode: number
}

export interface BlockRecordValuesResponse extends AgentResponse {
  data: {
    results: BlockRecordValue[]
  }
}

export interface CollectionRecordValueResponse extends AgentResponse {
  data: {
    results: CollectionRecordValue[]
  }
}

export interface CollectionViewRecordValueResponse extends AgentResponse {
  data: {
    results: CollectionViewRecordValue[]
  }
}

export interface QueryCollectionResponse {
  recordMap: RecordMap
  result: {
    aggregationResults: AggregationResult[]
    blockIds: string[]
    total: number
    type: string
  }
}

export interface LoadPageChunkResponse {
  recordMap: RecordMap
  cursor: []
}

export interface RecordMap {
  block: {
    [key: string]: BlockRecordValue
  }
  collection: {
    [key: string]: CollectionRecordValue
  }
  collection_view: {
    [key: string]: CollectionViewRecordValue
  }
}

export interface AggregationResult {
  id: string
  value: number
}

export interface User {
  timeZone: string
  locale: string
}

/**
 * Table: Block
 */
export interface BlockRecordValue {
  role: string
  value: BlockValue
}

export interface BlockValue {
  id: string
  version: number
  type: string
  view_ids?: string[]
  collection_id?: string
  properties?: BlockProperties
  format?: BlockFormat
  permissions?: BlockPermission[]
  content?: string[]
  created_by: string
  created_time: number
  last_edited_by: string
  last_edited_time: number
  parent_id: string
  parent_table: string
  alive: boolean
  copied_from?: string
}

export interface BlockProperties {
  link?: {
    0: { 0: string } // bookmark
  }
  title?: StyledString[] // text, heading, list, bookmark
  description?: {
    0: { 0: string } // bookmark
  }
  checked?: {
    0: { 0: 'Yes' | 'No' } // to_do
  }
  source?: {
    0: { 0: string } // audio
  }
  language?: {
    0: { 0: string } // code
  }
}

/**
 * For non-boolean properties, test with 
 *  <property> || <default_value>.
 * 
 * For boolean properties, test with 
 *  typeof <property> !== 'undefined' ? <property> : <default_value> 
 *  because we have to distinguish `false` and `undefined`.
 */
export interface BlockFormat {
  block_color?: string
  block_width?: number // image, video
  block_locked?: boolean
  block_full_width?: boolean // image, video
  block_page_width?: boolean // image, video
  block_aspect_ratio?: number // video
  block_preserve_scale?: boolean // video
  block_locked_by?: string
  bookmark_icon?: string // bookmark
  bookmark_cover?: string // bookmark
  code_wrap?: boolean // code
  column_ratio?: number // column
  display_source?: string // image, video
  page_icon?: string
  page_cover?: string
  page_full_width?: boolean
  page_cover_position?: number
}

export interface BlockPermission {
  role: string
  type: string
  user_id: string
}

/**
 * Table: Collection
 */
export interface CollectionRecordValue {
  role: string
  value: CollectionValue
}

export interface CollectionValue {
  alive: boolean
  icon: string
  id: string
  name: string[][]
  parent_id: string
  parent_table: string
  schema: {
    [key: string]: SchemaItem
  }
  version: number
}

export interface SchemaItem {
  name: string
  options: SchemaItemOption[]
  type: string
}

export interface SchemaItemOption {
  id: string
  color: string
  value: string
}

/**
 * Table: CollectionView
 */
export interface CollectionViewRecordValue {
  role: string
  value: CollectionViewValue
}

export interface CollectionViewValue {
  alive: boolean
  format: {
    table_properties: TableProperty[]
    table_wrap: boolean
  }
  id: string
  name: string
  page_sort: string[]
  parent_id: string
  parent_table: string
  query: Query
  type: string
  version: number
}

export interface TableProperty {
  width: number
  visible: boolean
  property: string
}

export interface Query {
  sort: SortQuery[]
  aggregate?: AggregateQuery[]
  filter: []
  filter_operator: string
}

export interface SortQuery {
  id: string
  type: string
  property: string
  direction: string
}

export interface AggregateQuery {
  id: string
  type: string
  property: string
  view_type: string
  aggregation_type: string
}

/**
 * Utils
 */
export interface TextStyle {
  0: string
  1?: string
}

export interface StyledString {
  0: string
  1?: TextStyle[]
}