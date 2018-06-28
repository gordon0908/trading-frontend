const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public', 'index.html')
  }),
  new UglifyjsWebpackPlugin({
    sourceMap: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new WebpackBundleAnalyzer({
    analyzerMode: 'static'
  })
];

const config = {
  mode: 'production',
  plugins: plugins,
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = merge(common, config);
