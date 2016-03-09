var webpack               = require('webpack'),
    ReloadPlugin          = require('webpack-reload-plugin'),
    path                  = require('path'),
    zlib                  = require('zlib'),
    ChunkManifestPlugin   = require('chunk-manifest-webpack-plugin'),
    HtmlWebpackPlugin     = require('html-webpack-plugin'),
    WebpackNotifierPlugin = require('webpack-notifier'),
    ExtractTextPlugin     = require('extract-text-webpack-plugin'),
    DedupePlugin          = require('webpack/lib/optimize/DedupePlugin'),
    UglifyJsPlugin        = require('webpack/lib/optimize/UglifyJsPlugin'),
    CompressionPlugin     = require('compression-webpack-plugin');
/**
 * Support for extra commandline arguments
 */
var argv = require('optimist').argv;

/**
 * Useful variables
 */
var cwd = process.cwd();
var DEBUG = !argv.release;
var isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;
var version = require(path.resolve(cwd,'package.json')).version;
var reloadHost = '0.0.0.0';
var npmRoot = __dirname + '/node_modules';
var vendorRoot = __dirname + '/app/js/vendor';
var appDir = __dirname + '/app';

var entry = ['tag.ts'];

function gzipMaxLevel(buffer, callback) {
  return zlib['gzip'](buffer, {level: 9}, callback)
}

function makeConfig(options) {
  return {
    debug: false,
    context: appDir,

    entry: {
      vendor: 'vendor.ts',
      bundle: entry
    },

    devtool: 'source-map',

    output: {
      path: path.resolve(cwd, 'build'),
      filename: '[name].js',
      publicPath: '/', // isDevServer ? './': './',
      chunkFilename: '[id].bundle.js'
    },

    plugins: [
      new webpack.IgnorePlugin(/spec\.js$/),
      new DedupePlugin(),
      //new webpack.optimize.CommonsChunkPlugin('core.js'),
      new ExtractTextPlugin('styles.css'),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(version),
        ENV: JSON.stringify(options.env)
      }),
      new HtmlWebpackPlugin({
        template: path.join(appDir, 'index.html'),
      }),
      new UglifyJsPlugin({
        // to debug prod builds uncomment //debug lines and comment //prod lines

        // beautify: true,//debug
        // mangle: false,//debug
        // dead_code: false,//debug
        // unused: false,//debug
        // deadCode: false,//debug
        // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
        // comments: true,//debug

        beautify: false,//prod
        // disable mangling because of a bug in angular2 beta.1, beta.2 and beta.3
        // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
        // mangle: { screw_ie8 : true },//prod
        mangle: false,
        compress : { screw_ie8 : true},//prod
        comments: false//prod

      }),
     // include uglify in production
      new CompressionPlugin({
        algorithm: gzipMaxLevel,
        regExp: /\.css$|\.html$|\.js$|\.map$|\.ts$/,
        threshold: 2 * 1024
      })
    ],
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
      modulesDirectories: ['node_modules'],
      fallback: path.join(__dirname, 'node_modules')
    },
    resolve: {
      cache:false,
      root: [path.resolve(cwd)],
      modulesDirectories: [
        'node_modules', 'app', 'app/ts', '.'
      ],
      extensions: ['', '.ts', '.js', '.json', '.css'],
      alias: {
        'app': 'app',
        'scripts': npmRoot
      }
    },
    module: {

      loaders: [
        { test: /\.(png|jpg|gif|ico)$/,   loader: 'file-loader?limit=50000&name=[path][name].[ext]' },
        { test: /\.json$/, loader: 'json' },
        { test: /\.scss$/, loaders: ['style-loader',
                             ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap'),
                             'sass-loader' +
                             '?outputStyle=expanded&' +
                             'root='+appDir+'&' +
                             '&includePaths[]'+npmRoot + '&' +
                             '&includePaths[]'+appDir
                            ]},
        // { test: /^(?!.*\.min\.css$).*\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')},
        { test: /^.*\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')},
        { test: /\.html$/,    loader: 'raw' },
        { test: /\.ts$/, loader: 'ts', exclude: [ /test/, /node_modules/]},
        //{ test: /\.ts$/, loader: 'ts', exclude: [ /test/, /node_modules\/(?!(ng2-bootstrap))/]},
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,         loader: 'url-loader' },
        { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file-loader?mimetype=application/font-woff&name=[path][name].[ext]' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,         loader: 'file-loader?mimetype=application/x-font-ttf&name=[path][name].[ext]' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?\??$/,      loader: 'file-loader?mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]' },
        { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,         loader: 'file-loader?mimetype=application/font-otf&name=[path][name].[ext]' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,         loader: 'url-loader'   },
      ],
      noParse: [
        /\.min\.js/,
        /vendor\/.*?\.(js|css)$/
      ]
    },
    tslint: {
        emitErrors: false,
        failOnHint: false
    }
  }
}

var config = makeConfig(argv)

console.log(require('util').inspect(config, {depth: 10}))
module.exports = config;
