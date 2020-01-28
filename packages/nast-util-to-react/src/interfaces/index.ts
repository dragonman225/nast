import * as NAST from "nast-types"

export interface RenderBlockOptions {
  current: NAST.Block
  prev?: NAST.Block
  next?: NAST.Block
  parent?: NAST.Block
  root: NAST.Block
  depth: number
  listOrder: number
  listLength: number
  reactKey: string
  blockRendererRegistry: Map<string, BlockRenderer>
  listWrapperRegistry: Map<string, ListWrapper>
}

export interface BlockRendererProps extends
  Omit<RenderBlockOptions,
  "reactKey" | "blockRendererRegistry" | "listWrapperRegistry"> {
  children: JSX.Element[]
}

export interface BlockRenderer {
  (props: BlockRendererProps): JSX.Element
}

export interface ListWrapperProps {
  children: JSX.Element[]
}

export interface ListWrapper {
  (props: ListWrapperProps): JSX.Element
}