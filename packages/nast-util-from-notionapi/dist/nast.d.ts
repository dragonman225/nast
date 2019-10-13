import * as Notion from 'notionapi-agent';
/**
 * ===============
 * Base Interfaces
 * ===============
 */
/**
 * Theoretically, all blocks can have children, but some blocks can't
 * have children semantically. When this is the case, the children array
 * should be empty and the renderer can ignore it.
 */
export interface Parent {
    children: Block[];
}
/** Displayed block in Notion.so. */
export interface Block extends Parent {
    id: string;
    type: string;
    color?: string;
    createdTime: number;
    lastEditedTime: number;
}
/**
 * ================
 * Block Interfaces
 * ================
 */
/**
 * Root can be any type of block. The differences are that Root has
 * additional properties.
 */
export interface Root extends Block {
    type: string;
    linkedPages: string[];
}
/**
 * Page represents all page blocks, so a page may also be "Link to Page"
 * or "Embedded Sub-page".
 *
 * "Link to Page" can be inferred by the parent_id of linked page not
 * being the root's id (if the root is a page), while "Embedded Sub-page" has
 * parent_id being the root's id.
 */
export interface Page extends Block {
    type: 'page';
    title: string;
    icon?: string;
    cover?: string;
    fullWidth: boolean;
    coverPosition: number;
    properties?: Notion.BlockProperties;
}
export interface Text extends Block {
    type: 'text';
    text: Notion.StyledString[];
}
export interface ToDoList extends Block {
    type: 'to_do';
    text: Notion.StyledString[];
    checked: boolean;
}
export interface Heading extends Block {
    type: 'heading';
    text: Notion.StyledString[];
    depth: number;
}
/**
 * BulletedList and NumberedList are stored without wrappers.
 *
 * Their order can be inferred by document context.
 */
export interface BulletedListItem extends Block {
    type: 'bulleted_list_item';
    text: Notion.StyledString[];
}
export interface NumberedListItem extends Block {
    type: 'numbered_list_item';
    text: Notion.StyledString[];
}
export interface ToggleList extends Block {
    type: 'toggle';
    text: Notion.StyledString[];
}
export interface Quote extends Block {
    type: 'quote';
    text: Notion.StyledString[];
}
export interface Divider extends Block {
    type: 'divider';
}
export interface Callout extends Block {
    type: 'callout';
    icon?: string;
    text: Notion.StyledString[];
}
export interface Image extends Block {
    type: 'image';
    width: number;
    source: string;
    fullWidth: boolean;
    pageWidth: boolean;
}
/**
 * Embed and Video seems the same ?
 *
 * In my experience, Youtube videos are "video" blocks, Vimeo videos are
 * "embed" blocks. As for HTML videos, I haven't test so I'm not sure.
 */
export interface Embed extends Block {
    type: 'video' | 'embed';
    width: number;
    source: string;
    fullWidth: boolean;
    pageWidth: boolean;
    aspectRatio: number;
    preserveScale: boolean;
}
export interface Video extends Embed {
    type: 'video';
}
export interface Audio extends Block {
    type: 'audio';
    source: string;
}
/**
 * Code represents bookmark including title, description, icon, cover.
 *
 * I guess the additional info is obtained through OpenGraph meta.
 */
export interface WebBookmark extends Block {
    type: 'bookmark';
    link: string;
    title?: string;
    description?: string;
    icon?: string;
    cover?: string;
}
/**
 * Code represents code in many languages and can be styled.
 */
export interface Code extends Block {
    type: 'code';
    text: Notion.StyledString[];
    language?: string;
    wrap: boolean;
}
/**
 * Equation represents equation in Latex.
 */
export interface Equation extends Block {
    type: 'equation';
    latex: string;
}
/**
 * Children of ColumnList must be Columns.
 */
export interface ColumnList extends Block {
    type: 'column_list';
}
/**
 * Columns are wrappers that make placing blocks on the same horizontal
 * row possible.
 */
export interface Column extends Block {
    type: 'column';
    ratio: number;
}
/**
 * Collection represents all types of databases.
 */
export interface Collection extends Block {
    type: 'collection';
    id: string;
    collectionId: string;
    name: string;
    icon?: string;
    cover?: string;
    description?: Notion.StyledString[];
    coverPosition: number;
    schema: {
        [key: string]: Notion.CollectionColumnInfo;
    };
    blocks: Page[];
    views: CollectionViewMetadata[];
    defaultViewId: string;
}
/**
 * CollectionViewMetadata mostly comes from
 * Notion.CollectionViewRecordValue and Notion.CollectionRecordValue
 */
export interface CollectionViewMetadata {
    id: string;
    type: string;
    name: string;
    query: Notion.Query;
    format: Notion.CollectionViewFormat;
    aggregate: AggregationMetadata[];
}
/**
 * AggregationMetadata merges useful parts of
 * Notion.Query.aggregate and Notion.AggregationResult
 */
export interface AggregationMetadata {
    aggregationType: string;
    property: string;
    value: number;
}
/**
 * ================
 * Temporary Blocks
 * ================
 */
export interface Stub extends Block {
    raw: Notion.Block;
}
/**
 * ==========
 * Deprecated
 * ==========
 */
//# sourceMappingURL=nast.d.ts.map