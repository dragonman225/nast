const { Logger } = require('@dnpr/logger')

/** Default log level is "warn". */
const log = new Logger('nast-util-to-html')

function raiseWarning(..._arguments: any[]) {
  log.warn.apply(log, _arguments)
}

export {
  raiseWarning
}