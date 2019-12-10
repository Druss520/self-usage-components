const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        // use: { 
        //   loader: 'babel-loader', 
        //   options: {
        //     plugins: [
        //       ["import", [{ libraryName: "antd", style: 'css'}]],
        //     ],
        //     compact: true,
        //   }
        // },
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
    ]
  },
  externals: [nodeExternals()]
};

