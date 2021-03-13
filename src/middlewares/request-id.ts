import * as uuid from 'uuid'
import Koa from 'koa'
import log4js from 'log4js'
import { buildLogger } from '../modules/logger'

// Koa.Context に logger プロパティを追加
declare module 'koa' {
  interface DefaultContext {
    logger: log4js.Logger,
  }
}

const HEADER_NAME = 'x-request-id'

export const mwRequestId = async (ctx: Koa.Context, next: Koa.Next) => {
  const requestId = ctx.request.get(HEADER_NAME) || uuid.v4()
  ctx.set(HEADER_NAME, requestId)
  ctx.logger = buildLogger(requestId)

  await next()
}
