function raiseWarning(..._arguments: any[]) {
  let args = Array.from(_arguments)
  args.unshift('(nast-util-to-html) Warning:')
  console.log.apply(console, args as [])
}

export {
  raiseWarning
}