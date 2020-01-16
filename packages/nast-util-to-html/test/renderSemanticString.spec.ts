const testCaseMap = {
  "Plain": ["Hello, World!"],
  "Bold": ["Hello, World!", [["b"]]],
  "Italic": ["Hello, World!", [["i"]]],
  "Strike": ["Hello, World!", [["s"]]],
  "Link": ["Hello, World!", [["a", "https://example.com"]]],
  "InlineCode": ["Hello, World!", [["c"]]],
  "Colored": ["Hello, World!", [["h", "yellow"]]],
  "Commented": ["Hello, World!", [["m"]]],
  "Bold + Italic + Yellow": [
    "Hello, World!",
    [["b"], ["i"], ["h", "yellow"]]
  ],
  "InlineMentionUser": [
    "‣",
    [["u", "ab6fbe39-f7b9-4b6f-8043-e691fe2f4e2e"]] // Ivan Zhao
  ],
  "InlineMentionPage": [
    "‣",
    [["p", "15776535-3f2c-4705-bd45-474e5ba8b46c"]] // What's New?
  ],
  "InlineMentionDate": [
    "‣",
    [["d", {
      type: "date",
      start_date: "2020-01-01",
      date_format: "YYYY/MM/DD"
    }]]
  ]
}