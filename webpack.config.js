const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  // devtool: 'source-map',
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  externals: {
    "aws-sdk": 'aws-sdk'
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' }
    ],
  },
};