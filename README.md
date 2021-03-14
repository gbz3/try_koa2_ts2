# try_koa2_ts2

## nodenv で node リスト最新化

```bash
$ git -C "$(nodenv root)"/plugins/node-build pull
...
 create mode 100644 share/node-build/14.15.5
 create mode 100644 share/node-build/14.16.0
...
 create mode 100644 share/node-build/15.8.0
 create mode 100644 share/node-build/15.9.0
$ nodenv versions
* 14.15.3 (set by /home/***/.anyenv/envs/nodenv/version)
  14.16.0
```

## node ローカルインストール

```bash
$ nodenv local 14.16.0
$ node -v
v14.16.0
$ npm -v
6.14.11
```

## koa2/typescript 環境構築

- [Koa.js ミドルウェアの作り方](https://qiita.com/kei-nakoshi/items/904c46faff621c1be674)
- [TypeScript Ninja](http://typescript.ninja/typescript-in-definitelyland/index.html)
- [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/)
- [Node.js & TypeScriptのプロジェクト作成](https://typescript-jp.gitbook.io/deep-dive/nodejs)

```bash
$ npm init -y
$ npm i -D typescript @types/node ts-node
$ npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs
$ cp -p package.json package.json.org
$ vi package.json
$ diff package.json package.json.org 
7,8d6
<     "8443": "PORT=8443 PUB=on PRI=on ts-node src/index.ts",
<     "start": "sudo ts-node src/index.ts",
$ npm i -S koa
$ npm i -D @types/koa
$ cat src/index.ts
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
$ npm run 8443    # Ctrl-C で停止。http://localhost:8443 でアクセス
```

## HTTP/2 導入

- [Koaで構築したサーバをHTTPS/HTTP2化する](https://qiita.com/y_fujieda/items/9998f28e702dc7c84473)

```bash
$ mkdir ssc    # ssc = Self-signed certificate
$ echo "ssc/*" >> .gitignore
$ openssl genrsa 2048 > ssc/server.key
$ openssl req -new -sha256 -key ssc/server.key -out ssc/server.csr    # 全て Enter 押下
$ openssl x509 -in ssc/server.csr -out ssc/server.crt -req -signkey ssc/server.key -sha256 -days 3650
$ npm i -S http2
$ vi src/index.ts    # HTTP/2 有効化
$ npm run 8443    # Ctrl-C で停止。https://localhost:8443 でアクセス
```

## webpack 導入（フロントエンド用）

- [最新版で学ぶwebpack 5入門 JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)
- [webpack の基本的な使い方](https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html)

```bash
$ npm i -D webpack webpack-cli
$ echo "static/main.js" >> .gitignore
```

## フロントエンドを Typescript 化

- [最新版TypeScript+webpack 5の環境構築まとめ](https://ics.media/entry/16329/)

```bash
$ npm i -D ts-loader
```

## Bootstrap4.6 導入

- [最新版で学ぶwebpack 5入門 Bootstrapをバンドルする方法](https://ics.media/entry/17749/)

```bash
$ npm i -S bootstrap jquery popper.js
$ npm i -D style-loader css-loader
$ echo "static/main.js.map" >> .gitignore
```
