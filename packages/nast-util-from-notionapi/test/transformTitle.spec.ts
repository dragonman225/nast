import { test } from "zora"

import { transformTitle } from "../src/transformTitle"

const case1 = [
  [
    "Link to Heading 1",
    [
      [
        "a",
        "https://www.notion.so/Testing-Blocks-1c4d63a8ffc747bea5658672797a595a#f51e527493dd4fc0946218a2010d2440"
      ]
    ]
  ]
]

const case1ans = [
  [
    "Link to Heading 1",
    [
      [
        "a",
        "#https://www.notion.so/f51e527493dd4fc0946218a2010d2440"
      ]
    ]
  ]
]

const case2 = [
  [
    "‣",
    [
      [
        "u",
        "c1282c3a-ad55-4c3a-8c50-b810234a23b5"
      ]
    ]
  ],
  [
    " Inline Mention Person"
  ]
]

const case2ans = [
  [
    "‣",
    [
      [
        "u",
        {
          "name": "c1282c3a-ad55-4c3a-8c50-b810234a23b5"
        }
      ]
    ]
  ],
  [
    " Inline Mention Person"
  ]
]

test("transformTitle", (t) => {
  t.deepEqual(transformTitle(case1 as any), case1ans as any,
    "The link should be converted to a hash link.")
  t.deepEqual(transformTitle(case2 as any), case2ans as any,
    "The user ID should be converted to an NAST.Individual object.")
})