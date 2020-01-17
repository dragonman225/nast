# NAST

A view model for linear documents.

## Specification

The view model specification is currently written as a TypeScript type definition module. See [packages/nast-types](./packages/nast-types).

## Packages

This is a monorepo and all officially implemented libraries are in the `packages` directory.

| Name                                                         | Direction | Description                                                  | Status           |
| :----------------------------------------------------------- | --------- | :----------------------------------------------------------- | :--------------- |
| [nast-util-from-notionapi](./packages/nast-util-from-notionapi) | From      | Get *NAST* from a [Notion](https://www.notion.so/) page.     | Experimental     |
| [nast-util-from-orgzly](./packages/nast-util-from-orgzly)    | From      | Get *NAST* from an org-mode file exported by [Orgzly](http://www.orgzly.com/). | Proof of Concept |
| [nast-util-to-html](./packages/nast-util-to-html)            | To        | Render *NAST* to HTML.                                       | Experimental     |
| nast-util-md                                                 | From / To | Get *NAST* from and render *NAST* to a Markdown file.        | Planned          |

* Stability : **Stable** > **Experimental** > **Proof of Concept**

## Development

### Setup

This project uses [lerna](https://github.com/lerna/lerna). If you haven't used it before, [this tutorial](https://github.com/reggi/lerna-tutorial) is a good start point.

```bash
npm i -g lerna
git clone https://github.com/dragonman225/nast.git && cd nast
lerna bootstrap
```

(Optional) `typedoc` needs to be available in the command-line for reference document generation.

```bash
npm i -g typedoc
```

(Optional) [Graphviz](https://www.graphviz.org/) `dot` needs to available in the command-line for dependency graph generation.

```bash
pacman -S graphviz # For Arch Linux
```

