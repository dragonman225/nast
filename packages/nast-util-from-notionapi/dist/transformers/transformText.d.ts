/** For types only */
import * as Notion from 'notionapi-agent';
import * as Nast from '../nast';
declare function transformText(node: Notion.Block): Promise<Nast.Text>;
export default transformText;
//# sourceMappingURL=transformText.d.ts.map