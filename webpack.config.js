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
      contentBase: path.resolve(__dirname, './src'),
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
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      globalObject: 'self',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss', '.css', '.vue'],
      alias: {
        style: path.resolve(__dirname, './src/style'),
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
            {
              loader: 'cache-loader',
            },
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  whitespace: 'condense'
                },
                cacheDirectory: path.resolve(__dirname, './node_modules/.cache/vue-loader'),
              }
            }
          ]
        },
        { // explicint css loader to load vuetify css (cannot use css-modules)
          test: /\.css$/,
          include: /node_modules/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers'),
                },
              },
            },
          ],
        },
        {
          test: /\.(scss|sass)$/,
          include: [/node_modules/, /ui\/styles\/global/],
          use: [
            // In production, CSS is extracted to files on disk. In development, it's inlined into JS:
            isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
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
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers'),
                },
              },
            },
          ]
        },
        {
          test: /\.(scss|sass)$/,
          exclude: [/node_modules/, /ui\/styles\/global/],
          use: [
            // In production, CSS is extracted to files on disk. In development, it's inlined into JS:
            isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            {
              loader: 'css-modules-typescript-loader',
              options: {
                // mode: isProd ? 'verify' : 'emit'
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
                sourceMap: true,
              },
            },
            {
              loader: "sass-resources-loader",
              options: {
                resources: path.resolve(__dirname, "./src/ui/styles/variables/index.scss"),
              }
            }
          ]
        },
        {
          test: /\.ts(x?)$/,
          use: [
            {
              loader: 'cache-loader',
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
          test: /\.js(x?)$/,
          use: [
            {
              loader: 'cache-loader',
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

      isProd && new webpack.optimize.SplitChunksPlugin({}),

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
        filename: path.resolve(__dirname, './dist/index.html'),
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

      // Inline constants during build, so they can be folded by UglifyJS.
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(VERSION),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VUE_APP_BASE_URL: JSON.stringify('http://127.0.0.1:8080'),
        VUE_APP_SERVER: JSON.stringify('http://127.0.0.1:3001'),
        BASE_URL: JSON.stringify('/'),
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
        inlineThreshold: 8000,
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
