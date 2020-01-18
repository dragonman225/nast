export interface RenderContext {
  depthFromRoot: number
  numberedListCount: number
  cssClass: {
    prefixBlock: string
    prefixColor: string
    modifierIndent: string
  }
}

export type HTML = string
export type RenderNodes = (nodes: NAST.Block[], ctx: RenderContext) => HTML