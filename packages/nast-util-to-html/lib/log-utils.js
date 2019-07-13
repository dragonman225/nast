module.exports = {
  raiseWarning
}

function raiseWarning() {
  let args = Array.from(arguments)
  args.unshift('Warning:')
  console.log.apply(console, args)
}