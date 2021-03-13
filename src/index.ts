import Koa from 'koa'
import http2 from 'http2'
import fs from 'fs'

import { buildLogger } from './modules/logger'

// Koa2 サーバ初期設定
const app = new Koa()
const appLogger = buildLogger('APP')

// ミドルウェア設定
app.use(async (ctx) => {
  ctx.body = "koa app."
})

// サーバ起動
const port = process.env.PORT || 443
const options = {
  key: fs.readFileSync('ssc/server.key'),
  cert: fs.readFileSync('ssc/server.crt')
}
http2.createSecureServer(options, app.callback()).listen(port)
appLogger.info(`listening on port ${port}`)
