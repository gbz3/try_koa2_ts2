import log4js from 'log4js'

export const buildLogger = (requestId: string) => log4js.configure({
  appenders: {
    'console': {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '[%d] [%x{requestId}] [%p] : %m',
        tokens: { requestId: requestId },
      },
    },
  },
  categories: { default: { appenders: ['console'], level: 'debug' } }
}).getLogger()
