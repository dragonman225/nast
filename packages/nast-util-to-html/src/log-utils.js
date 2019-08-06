module.exports = {
  raiseWarning
}

function raiseWarning() {
  let args = Array.from(arguments)
  args.unshift('(nast-util-to-html) Warning:')
  console.log.apply(console, args)
}