export interface Agent {
  loadPageChunk: Function
  getAssetsJson: Function
  getRecordValues: Function
  loadUserContent: Function
  queryCollection: Function
  submitTransaction: Function
}

export interface AgentResponse {
  statusCode: number
  data?: GetRecordValuesResponse | QueryCollectionResponse
}

/**
 * Existing tables for getRecordValues: 
 * block, collection, collection_view, 
 * follow, notion_user, user_settings, user_root, 
 * space_view, space
 */
export interface GetRecordValuesResponse {
  results: BlockRecordValue | CollectionRecordValue | CollectionViewRecordValue
}

export interface QueryCollectionResponse {
  recordMap: RecordMap
  result: {
    aggregationResults: []
    blockIds: string[]
    total: number
    type: string
  }
}

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
}

export interface TextStyle {
  0: string
  1?: string
}

export interface StyledString {
  0: string
  1?: TextStyle[]
}

export interface BlockProperties {
  link?: []
  title?: StyledString[]
  description?: []
  checked?: []
}

export interface BlockFormat {
  block_locked?: boolean
  block_locked_by?: string
  bookmark_icon?: string
  bookmark_cover?: string
}

export interface BlockPermission {
  role: string
  type: string
  user_id: string
}

export interface RecordRequest {
  id: string
  table: string
}

export interface User {
  timeZone: string
  locale: string
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

export interface AggregationResult {
  id: string
  value: number
}