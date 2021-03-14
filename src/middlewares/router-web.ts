import Router from '@koa/router'
import Koa from 'koa'
import compose from 'koa-compose'

// see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
const RouterWebPub = new Router<Koa.DefaultState, Koa.Context>('PUB' in process.env? { prefix: `/${process.env.PUB}` }: {})
  .get('/', async (ctx: Koa.Context) => ctx.body = `koa app. (PUB=${process.env.PUB})`)

const RouterWebPri = new Router<Koa.DefaultState, Koa.Context>('PRI' in process.env? { prefix: `/${process.env.PRI}` }: {})
  .get('/', async (ctx: Koa.Context) => ctx.body = `koa app. (PRI=${process.env.PRI})`)

export const mwRouterWeb = compose(
  [...('PUB' in process.env? [RouterWebPub]: []), ...('PRI' in process.env? [RouterWebPri]: [])]
  .flatMap(e => [e.routes(), e.allowedMethods()])
)
