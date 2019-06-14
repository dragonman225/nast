export interface NotionAgent {
  loadPageChunk: Function
  getAssetsJson: Function
  getRecordValues: Function
  loadUserContent: Function
  queryCollection: Function
  submitTransaction: Function
}

export interface RecordValue {
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
  link?: any[]
  title?: StyledString[]
  description?: any[]
  checked?: any[]
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
  table: string
  id: string
}

export interface BlockNode {
  type: string
  data?: BlockProperties
  raw_value: BlockValue
  children: BlockNode[]
}