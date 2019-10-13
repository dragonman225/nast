/** For types only */
import * as Notion from 'notionapi-agent';
import * as Nast from '../nast';
declare function transformCode(node: Notion.Block): Promise<Nast.Code>;
export default transformCode;
//# sourceMappingURL=transformCode.d.ts.map