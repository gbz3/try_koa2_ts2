const path = require('path')

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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
