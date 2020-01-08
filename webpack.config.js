const { EnvironmentPlugin } = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ip = require('ip');
const TerserPlugin = require('terser-webpack-plugin');

const port = process.env.PORT || 3000;
const host = process.env.HOST = '0.0.0.0';

module.exports = {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  devServer: {
    port,
    host,
    contentBase: './dist',
    public: `${ip.address()}:${port}`,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Arkanoid',
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
  stats: {
    warnings: false
  }
};
