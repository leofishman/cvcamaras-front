const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { port } = require('../config')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'

const prod = mode === 'production'

module.exports = {
    entry: {
        bundle: ['./src/main.js'],
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        chunkFilename: '[name].[id].js',
    },
    devServer: {
	host: '0.0.0.0',
	port: 8080,
	disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://localhost:' + port,
            },
        },
        clientLogLevel: 'silent',
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    /**
                     * MiniCssExtractPlugin doesn't support HMR.
                     * For developing, use 'style-loader' instead.
                     * */
                    //prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devtool: prod ? false : 'source-map',

}
