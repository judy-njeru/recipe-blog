module.exports = {
  entry: './src/index.js',


  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },


  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [

          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          "postcss-loader",
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          "postcss-loader",
          'sass-loader'
        ]
      },

      {
        test: /\.(jpg|png)/,
        loader: 'file-loader?name=assets/img-[hash:6].[ext]'
      },
      {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    }
    ]
  }
}
