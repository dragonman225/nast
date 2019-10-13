/** For types only */
import * as Notion from 'notionapi-agent';
import * as Nast from './nast';
declare function transformBlock(node: Notion.Block, apiAgent: Notion.NotionAgent): Promise<Nast.Block>;
export { transformBlock };
//# sourceMappingURL=transformBlock.d.ts.map