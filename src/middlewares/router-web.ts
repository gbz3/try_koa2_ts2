import Router from '@koa/router'
import Koa from 'koa'
import compose from 'koa-compose'

// see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
const RouterWeb = new Router<Koa.DefaultState, Koa.Context>()
  .get('/', async (ctx: Koa.Context) => {
    ctx.body = "koa app."

    ctx.logger.info(`PUB=${process.env.PUB} PRI=${process.env.PRI}`)
  })

export const mwRouterWeb = compose([RouterWeb.routes(), RouterWeb.allowedMethods()])
