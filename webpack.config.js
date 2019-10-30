const path = require('path');
const glob = require('glob');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');

const config = {
  entry: [
    '@babel/polyfill',
    './src/js/index.js',
  ],
  output: {
    filename: '[name].bundle.js',
    path: distPath
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              isProduction ? require('cssnano') : () => {},
              require('autoprefixer')()
            ]
          }
        },
        'sass-loader'
      ]
    }, {
      test: /images[\\\/].+\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name][hash].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70
          }
        }
      },
      ],
    }, {
      test: /fonts[\\\/].+\.(otf|eot|svg|ttf|woff|woff2)$/i,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]'
        }
      },
    }]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    ...glob.sync('./src/*.html')
      .map(htmlFile => {
        return new HtmlWebpackPlugin({
          filename: path.basename(htmlFile),
          template: htmlFile
        });
      })
  ],
  optimization: isProduction ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            drop_console: true
          },
        },
      }),
    ],
  } : {},
  devServer: {
    proxy: {
      '/api/v1': {
        target: 'https://sdkfinance.app/api/v1',
        secure: false,
        changeOrigin: true,
        open: true,
        pathRewrite: { '^/api/v1': '' },
      },
    },
  }
  // devServer: {
  //   contentBase: distPath,
  //   port: 8080,
  //   compress: true,
  //   open: true,
  //   host: 'local.sdk.finance',
  //   proxy: {
  //     '/api': {
  //       target: 'https://sdkfinance.app/api/v1',
  //       secure: false,
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': '' },
  //     },
  //   },
  // }
};

module.exports = config;
