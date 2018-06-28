const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public', 'index.html')
  }),
  new webpack.HotModuleReplacementPlugin(),
];

const config = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: process.env.PORT || 3001,
    inline: true,
    hot: true,
    historyApiFallback: true
  },

  plugins: plugins
};

module.exports = merge(common, config);
