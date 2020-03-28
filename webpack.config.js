require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const WorkerPlugin = require('worker-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CrittersPlugin = require('critters-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const VERSION = require('./package.json').version;

module.exports = async function (env, argv) {
  const isProd = argv && argv.mode === 'production';
  const isTest = env === 'test';

  return {
	  mode: isProd ? 'production' : 'development',
	  // Turn off various NodeJS environment polyfills Webpack adds to bundles.
    node: {
      console: false,
      // Keep global, it's just an alias of window and used by many third party modules:
      global: true,
      // Turn off process to avoid bundling a nextTick implementation:
      process: false,
      // Inline __filename and __dirname values:
      __filename: 'mock',
      __dirname: 'mock',
      // Never embed a portable implementation of Node's Buffer module:
      Buffer: false,
      // Never embed a setImmediate implementation:
      setImmediate: false
	  },
    externals: [isTest && nodeExternals()].filter(Boolean),
	  devServer: {
      // Any unmatched request paths will serve static files from src/*:
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      // Request paths not ending in a file extension serve index.html:
      historyApiFallback: true,
      // Suppress forwarding of Webpack logs to the browser console:
      clientLogLevel: 'none',
      // Supress the extensive stats normally printed after a dev build (since sizes are mostly useless):
      stats: 'minimal',
      // Don't embed an error overlay ("redbox") into the client bundle:
      overlay: false
	  },
    entry: {
      app: './src/index.tsx'
    },
    devtool: isProd ? 'source-map' : 'inline-cheap-module-source-map',
    stats: 'minimal',
    output: {
      filename: isProd ? 'js/[name].[chunkhash:5].js' : '[name].js',
      chunkFilename: 'js/[name].[chunkhash:5].js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      globalObject: 'self',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss', '.vue'],
      alias: {
        style: path.join(__dirname, 'src/style'),
        vue$: 'vue/dist/vue.runtime.esm.js'
      },
      plugins: [
        new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })
      ].filter(Boolean)
    },
    module: {
      noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
      // Disable the default JavaScript handling:
      defaultRules: [],
      rules: [
        {
          oneOf: [
            {
              test: /(\.mjs|\.esm\.js)$/i,
              type: 'javascript/esm',
              resolve: {},
              parser: {
                harmony: true,
                amd: false,
                commonjs: false,
                system: false,
                requireInclude: false,
                requireEnsure: false,
                requireContext: false,
                browserify: false,
                requireJs: false,
                node: false
              }
            },
            {
              type: 'javascript/auto',
              resolve: {},
              parser: {
                system: false,
                requireJs: false
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          use: [
            /* config.module.rule('vue').use('cache-loader') */
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/vue-loader'),
                cacheIdentifier: '21c59b65'
              }
            },
            /* config.module.rule('vue').use('vue-loader') */
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  whitespace: 'condense'
                },
                cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/vue-loader'),
                cacheIdentifier: '21c59b65'
              }
            }
          ]
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            // In production, CSS is extracted to files on disk. In development, it's inlined into JS:
            isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            {
              loader: 'css-modules-typescript-loader',
              options: {
                mode: isProd ? 'verify' : 'emit'
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: isProd
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.ts(x?)$/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: '/home/marcroemmelt/Projects/zmeldung/client/node_modules/.cache/ts-loader',
                cacheIdentifier: '54a7502f'
              }
            },
            {
              loader: 'thread-loader'
            },
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsSuffixTo: [
                  '\\.vue$'
                ],
                happyPackMode: true
              }
            },
            isProd && {
              loader: 'eslint-loader'
            }
          ].filter(Boolean)
        },
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: '/home/marcroemmelt/Projects/zmeldung/client/node_modules/.cache/ts-loader',
                cacheIdentifier: '54a7502f'
              }
            },
            {
              loader: 'thread-loader'
            },
            {
              loader: 'babel-loader'
            },
            isProd && {
              loader: 'eslint-loader'
            }
          ].filter(Boolean)
        },
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:5].[ext]'
              }
            }
          }
        },
        {
          test: /\.(svg)(\?.*)?$/,
          use: [
            /* config.module.rule('svg').use('file-loader') */
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:5].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'media/[name].[hash:5].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[name].[hash:5].[ext]'
                  }
                }
              }
            }
          ]
        },
      ]
    },
    plugins: [
      // Required to apply defined rules to individual language blocks in .vue files
      new VueLoaderPlugin(),

      new FriendlyErrorsWebpackPlugin(),

      // Remove old files before outputting a production build:
      isProd && new CleanWebpackPlugin({
        verbose: false,
      }),

      // Automatically split code into async chunks.
      // See: https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      isProd && new webpack.optimize.SplitChunksPlugin({}),

      // In production, extract all CSS to produce files on disk, even for
      // lazy-loaded CSS chunks. CSS for async chunks is loaded on-demand.
      // This is a modern Webpack 4 replacement for ExtractTextPlugin.
      // See: https://github.com/webpack-contrib/mini-css-extract-plugin
      // See also: https://twitter.com/wsokra/status/970253245733113856
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:5].css',
        chunkFilename: 'css/[name].[contenthash:5].css'
      }),

      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          postcssReduceIdents: {
            counterStyle: false,
            gridTemplate: false,
            keyframes: false
          }
        }
      }),

      // For now we're not doing SSR.
      new HtmlPlugin({
        filename: path.join(__dirname, 'dist/index.html'),
        template: 'public/index.html',
        minify: isProd && {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeRedundantAttributes: true,
          collapseBooleanAttributes: true,
          removeComments: true
        },
        inject: 'body',
        compile: true
      }),

      new ScriptExtHtmlPlugin({
        inline: ['app'] // we inline our initial app since we don't pre-render our index.html
      }),

      // Inline constants during build, so they can be folded by UglifyJS.
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(VERSION),
        NODE_ENV: JSON.stringify('"production"'),
        VUE_APP_BASE_URL: JSON.stringify('"http://127.0.0.1:8080"'),
        VUE_APP_SERVER: JSON.stringify('"http://127.0.0.1:3001"'),
        BASE_URL: JSON.stringify('"/"'),
      }),

      // Copy static assets
      new CopyPlugin([
        { from: 'public', to: './' },
      ]),

      // For production builds, output module size analysis to build/report.html
      isProd && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        openAnalyzer: false
      }),

      // Inline Critical CSS
      isProd && new CrittersPlugin({
        // use <link rel="stylesheet" media="not x" onload="this.media='all'"> hack to load async css:
        preload: 'media',
        // inline all styles from any stylesheet below this size:
        inlineThreshold: 2000,
        // don't bother lazy-loading non-critical stylesheets below this size, just inline the non-critical styles too:
        minimumExternalSize: 4000,
        // don't emit <noscript> external stylesheet links since the app fundamentally requires JS anyway:
        noscriptFallback: false,
        // inline fonts
        inlineFonts: true,
        // (and don't lazy load them):
        preloadFonts: false
      }),

      new ForkTsCheckerWebpackPlugin(
        {
          vue: true,
          tslint: false,
          formatter: 'codeframe',
          checkSyntacticErrors: false
        }
      ),

      new WorkerPlugin(),

      isProd && new StyleLintPlugin({
        files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
      })
    ].filter(Boolean), // Filter out any falsey plugin array entries.

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          sourceMap: isProd,
          extractComments: 'dist/licenses.txt',
          cache: true,
          parallel: true,
          terserOptions: {
            compress: {
              inline: 1
            },
            mangle: {
              safari10: true
            },
            output: {
              safari10: true
            }
          }
        })
      ]
    },
  };
};
