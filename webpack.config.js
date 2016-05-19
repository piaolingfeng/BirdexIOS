
var path = require('path');

module.exports = {
  // entry file
  entry: './app/main/main.js',
  output: {
    path: __dirname + '/build',
    publicPath: 'build/',
    filename: 'bundle.js'
    //chunkFilename: '[id].chunk.js'
  },

  resolve: {
        //查找module的话从这里开始查找
        root: path.resolve("./app")
    },
    
  // we will use webpack-dev-server
  devServer: {
    historyApiFallback: true,
    inline: true, // reload on the fly (auto refresh)
    port: 9999 // which port to run the server on
  },
  module: {
    // loaders are transformers basically
    loaders: [
      {
        // All files that end with `.js`
        test: /\.js$/,
        // Do not consider node_modules for webpack bundling
        exclude: /node_modules/,
        // use babel as the loader (transformer)
        loader: ['babel'],
        // Passing queries/arguments to the loader
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot$/,  loader: "file-loader" },
      { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.(jpg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.(png)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  /*plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]*/
}
