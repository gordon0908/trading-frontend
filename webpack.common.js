const path = require('path');
const vendors = ['react', 'react-dom', 'react-router-dom', 'redux'
  ,'redux-thunk', 'redux-logger', 'react-redux'];

const config = {
  entry: {
    app: ['./src/index.js'],
    vendor: vendors
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015', 'react', 'stage-0'
          ]
        }
      }
    ]
  }
};

module.exports = config;
