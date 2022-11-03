import { resolve as _resolve } from 'path';
import 'babel-polyfill';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin'

const productionGzipExtensions = ['js', 'css']

export const entry = ['babel-polyfill', './src/main.ts'];
export const optimization = {
  minimizer: [
    // we specify a custom UglifyJsPlugin here to get source maps in production
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true
      },
      sourceMap: true
    })
  ],
  minimize: true,
  splitChunks: {
    chunks: 'all'
  }
};
export const output = {
  path: _resolve(__dirname, './dist'),
  publicPath: '/dist/',
  filename: 'build.js'
};
export const module = {
  rules: [{
    test: /\.css$/,
    use: [
      'vue-style-loader',
      'css-loader'
    ],
  },
  {
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'sass-loader'
    ],
  },
  {
    test: /\.sass$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'sass-loader?indentedSyntax'
    ],
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      loaders: {
        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
        // the "scss" and "sass" values for the lang attribute to the right configs here.
        // other preprocessors should work out of the box, no loader config like this necessary.
        'scss': [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
        'sass': [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ]
      }
      // other vue-loader options go here
    }
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]?[hash]'
    }
  }
  ],
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
    ],
  },
};
export const resolve = {
  alias: {
    'vue$': 'vue/dist/vue.esm.js'
  },
  extensions: ['*', '.js', '.vue', '.json']
};
export const devServer = {
  historyApiFallback: true,
  noInfo: true,
  overlay: true
};
export const performance = {
  hints: false
};
export const devtool = 'true';