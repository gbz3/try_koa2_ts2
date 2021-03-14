const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src-wp/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'static'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { // CSS ファイルを書き出すオプションを有効化
            loader: MiniCssExtractPlugin.loader,
          },
          { // CSS をバンドル
            loader: 'css-loader',
            options: {
              url: false,  // オプションで CSS 内の url() メソッドを取り込まない
              sourceMap: true,
              importLoaders: 2,  // Sass+PostCSS の場合は 2 を指定
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: { plugins: ['autoprefixer'] },
            },
          },
          { // Sass をバンドル
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],
  devtool: 'source-map',
}
