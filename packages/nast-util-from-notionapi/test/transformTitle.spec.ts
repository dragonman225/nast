import { test } from "zora"

import { transformTitle } from "../src/transformTitle"

const dummyBlock = {
  id: "0eeee000-cccc-bbbb-aaaa-123450000000"
}

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
        "ab6fbe39-f7b9-4b6f-8043-e691fe2f4e2e"
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
          "name": "Ivan Zhao",
          "contacts": [
            {
              "namespace": "notion.so",
              "identifier": "ab6fbe39-f7b9-4b6f-8043-e691fe2f4e2e"
            },
            {
              "namespace": "email",
              "identifier": "ivan@makenotion.com"
            }
          ]
        }
      ]
    ]
  ],
  [
    " Inline Mention Person"
  ]
]

const case3 = [
  [
    "LMch0pp1-13.jfx",
    [
      [
        "a",
        "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/04954f60-3ec9-48e7-93f4-6c852d920714/LMch0pp1-13.jfx"
      ]
    ]
  ]
]

const case3ans = [
  [
    "LMch0pp1-13.jfx",
    [
      [
        "a",
        `https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F04954f60-3ec9-48e7-93f4-6c852d920714%2FLMch0pp1-13.jfx?table=block&id=${dummyBlock.id}`
      ]
    ]
  ]
]

export async function testTransformTitle() {

  test("transformTitle", async t => {
    t.deepEqual(await transformTitle(dummyBlock as any, case1 as any), case1ans as any,
      "The link should be converted to a hash link.")
    t.deepEqual(await transformTitle(dummyBlock as any, case2 as any), case2ans as any,
      "The user ID should be converted to an NAST.Individual object.")
    t.deepEqual(await transformTitle(dummyBlock as any, case3 as any), case3ans as any,
      "The secured link to a file should be converted to a direct accessible one.")
  })

}