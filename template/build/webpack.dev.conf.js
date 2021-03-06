"use strict";

const {
    promisify
} = require("util");
const path = require("path");

const webpack = require("webpack");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

const config = require("../config");

const baseWebpackConfig = require("./webpack.base.conf");

const {
    HOST
} = process.env;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
    "mode": "development",
    "devtool": config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    "devServer": {
        "clientLogLevel": "warning",
        "historyApiFallback": {
            "rewrites": [{
                "from": /.*/,
                "to": path.posix.join(config.dev.assetsPublicPath, "index.html")
            }]
        },
        "hot": true,
        "contentBase": false,
        "compress": true,
        "host": HOST || config.dev.host,
        "port": PORT || config.dev.port,
        "open": config.dev.autoOpenBrowser,
        "overlay": {
            "warnings": false,
            "errors": true
        },
        "publicPath": config.dev.assetsPublicPath,
        "proxy": config.dev.proxyTable,
        // necessary for FriendlyErrorsPlugin
        "quiet": true,
        "watchOptions": {
            "poll": config.dev.poll,
        }
    },
    "plugins": [
        new webpack.DefinePlugin({
            "process.env": require("../config/dev.env")
        }),
        // HMR shows correct file names in console on update.
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            "filename": "index.html",
            "template": "index.html",
            "inject": true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            "from": path.resolve(__dirname, "../static"),
            "to": config.dev.assetsSubDirectory,
            "ignore": [".*"]
        }])
    ]
});

module.exports = async () => {
    portfinder.basePort = process.env.PORT || config.dev.port;

    const port = await promisify(portfinder.getPort)();

    // publish the new Port, necessary for e2e tests
    process.env.PORT = port;
    // add port to devServer config
    devWebpackConfig.devServer.port = port;

    // Add FriendlyErrorsPlugin
    devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        "compilationSuccessInfo": {
            "messages": [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        }
    }));

    return devWebpackConfig;
};
