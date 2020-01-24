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
  rendererRegistry: Map<string, Renderer>
}

export interface RendererProps extends
  Omit<RenderBlockOptions, "reactKey" | "rendererRegistry"> {
  children: JSX.Element[]
}

export interface Renderer {
  (props: RendererProps): JSX.Element
}