import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http'
import Koa from 'koa'

const obj2str = (obj: IncomingHttpHeaders | OutgoingHttpHeaders) =>
  Object.entries(obj).reduce((acc, [curK, curV]) => `${acc}\n  [${curK}] = [${curV}]`, '')

export const mwRequestTrace = async (ctx: Koa.Context, next: Koa.Next) => {
  const start = Date.now()
  ctx.logger.info(`>> START RequestHeaders=${JSON.stringify(ctx.request.headers)}`)
  if (ctx.logger.isTraceEnabled()) ctx.logger.trace(`RequestHeaders=${obj2str(ctx.request.headers)}`)

  await next()

  if (ctx.logger.isTraceEnabled()) ctx.logger.trace(`ResponseHeaders=${obj2str(ctx.response.headers)}`)
  const ms = Date.now() - start
  ctx.logger.info(`<< END ${ms}ms status=${ctx.response.status} ResponseHeaders=${JSON.stringify(ctx.response.headers)}`)
}
