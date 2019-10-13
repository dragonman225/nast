/** For types only */
import * as Notion from 'notionapi-agent';
import * as Nast from '../nast';
declare function transformPage(node: Notion.Block): Promise<Nast.Page>;
export default transformPage;
//# sourceMappingURL=transformPage.d.ts.map