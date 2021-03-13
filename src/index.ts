import Koa from 'koa'

// Koa2 サーバ初期設定
const app = new Koa()

// ミドルウェア設定
app.use(async (ctx) => {
  ctx.body = "koa app."
})

// サーバ起動
const port = process.env.PORT || 443
app.listen(port)
