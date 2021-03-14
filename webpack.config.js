const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src-wp/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'static'),
  },
}
