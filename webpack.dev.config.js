const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/App.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
　　　　　test: /\.(png|jpg|svg)$/,
　　　　　loader: 'url-loader?limit=8192'
　　　 },
      // {
      //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
      //   use: [{
      //     loader: resolve('url-loader'),
      //     options: {
      //       limit: 8192,
      //       fallback: {
      //         loader: resolve('file-loader'),
      //         options: {
      //           name: 'images/[name].[hash:8].[ext]'
      //         }
      //       }
      //     }
      //   }]
      // }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname,'public'),
    proxy: {
      // '/ugis': 'http://192.168.121.16:16550',
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html',
    })
  ],
};
