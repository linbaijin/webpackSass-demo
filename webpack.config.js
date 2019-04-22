const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globby = require('globby');

(() => {
  const entry = {}
  const plugins = []
  const paths = globby.sync(['./src/pages/*.js',]);
  let reg = /([.][^.]+)$/;
  const names = paths.map(p => {
    // console.log(path.basename(p))
    const name = path.basename(p).replace(reg, '')
    entry[name] = p
    plugins.push(new HtmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: [name]
    }))
    return name
    
  })
  console.log(entry)
  console.log(names)
  // console.log(plugins)


  module.exports = {
    mode: 'production',
    entry: entry,
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    //   output: {
    //     filename: 'main.js',
    //     path: path.resolve(__dirname, 'dist')
    //   },
    plugins: plugins
  };
})();

