var path = require('path');
var webpack = require('webpack');
var extendify = require('extendify');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var base = {
    entry: {
        app: [
            './src/components/app'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: 'file?name=fonts/[hash].[ext]'
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'static/'),
        publicPath: '/static/'
    },
    plugins: [],
    resolve: {
        alias: {
            'TweenLite': path.join(__dirname, 'node_modules/gsap/src/minified/TweenLite.min.js'),
            'TimelineLite': path.join(__dirname, 'node_modules/gsap/src/minified/TimelineLite.min.js'),
            'EasePack': path.join(__dirname, 'node_modules/gsap/src/minified/easing/EasePack.min.js'),
            'CSSPlugin': path.join(__dirname, 'node_modules/gsap/src/minified/plugins/CSSPlugin.min.js')
        },
        extensions: ['', '.js', '.jsx']
    }
};

var development = {
    devtool: 'eval',
    entry: {
        app: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!autoprefixer!sass'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

var production = {
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize!autoprefixer!sass')
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].bundle.css')
    ]
};

module.exports = function(env) {
    return extendify({
        isDeep: true,
        inPlace: false,
        arrays: 'concat'
    })(base, eval(env) || development);
};
