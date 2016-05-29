const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: [
            'webpack-hot-middleware/client?reload=true',
            './src/app'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', '!css!postcss')
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', '!css!postcss!stylus')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', '!css!postcss!sass')
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: 'file?name=fonts/[hash].[ext]'
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'static')
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    postcss: [
        require('autoprefixer')()
    ],
    plugins: [
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })

    ]
}
