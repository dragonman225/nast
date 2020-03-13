# NAST

An universal, extensible intermediate representation for document-like content.

## Packages

| Name                                                         | Description                                                  | Status           |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :--------------- |
| [nast-types](./packages/nast-types)                                               | A TypeScript type definition module to specify data models for intermediate representation of data. | Experimental     |
| [nast-util-from-notionapi](./packages/nast-util-from-notionapi) | Import data from a [Notion](https://www.notion.so/) page.    | Experimental     |
| [nast-util-from-orgzly](./packages/nast-util-from-orgzly)    | Import data from an org-mode file exported by [Orgzly](http://www.orgzly.com/). | Proof of Concept |
| [nast-util-to-html](./packages/nast-util-to-html)            | Render data to HTML. (Deprecated)                            | Experimental     |
| [nast-util-to-react](./packages/nast-util-to-react)          | Render data to `JSX.Element` or HTML. (Preferred)            | Experimental     |
| nast-util-to-svelte                                          | Render data to HTML using Svelte.                            | -                |

* Stability : **Stable** > **Experimental** > **Proof of Concept**

## Development

### Setup

This project uses [lerna](https://github.com/lerna/lerna) to manage the monorepo. If you haven't used it before, [this tutorial](https://github.com/reggi/lerna-tutorial) is a good start point.

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

