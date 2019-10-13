/** For types only */
import * as Notion from 'notionapi-agent';
import * as Nast from './nast';
declare function getOnePageAsTree(pageId: string, apiAgent: Notion.NotionAgent): Promise<Nast.Block>;
declare function getAllBlocksInOnePage(pageId: string, apiAgent: Notion.NotionAgent): Promise<(Notion.Record & {
    value: Notion.Block;
})[]>;
export { getOnePageAsTree, getAllBlocksInOnePage };
//# sourceMappingURL=index.d.ts.map