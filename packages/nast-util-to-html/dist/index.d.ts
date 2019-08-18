import Nast from 'notajs-types/nast';
import Notion from 'notajs-types/notion';
declare type RenderOptions = {
    /** Ignore the root node */
    contentOnly: boolean;
    /** Skip bulleted list and numbered list analysis */
    bypassPreRenderTransform: boolean;
};
/**
 * Generate static HTML from NAST or StyledString[].
 */
declare function renderToHTML(data: Nast.Block | Notion.StyledString[], options?: RenderOptions): string;
export { renderToHTML };
//# sourceMappingURL=index.d.ts.map