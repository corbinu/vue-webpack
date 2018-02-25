"use strict";
/* eslint-disable import/max-dependencies */

const path = require("path");

const webpack = require("webpack");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = require("../config");

function assetsPath(assetsPath) {
    return path.posix.join(config.build.assetsSubDirectory, assetsPath);
}

{{#if_or unit e2e}}
let env;
let indexFilename;

if (process.env.NODE_ENV === "testing") {
    env = require("../config/test.env");
    indexFilename = "index.html";
} else {
    env = require("../config/prod.env");
    indexFilename = config.build.index;
}
{{/if_or}}

const baseWebpackConfig = require("./webpack.base.conf");

const webpackConfig = merge(baseWebpackConfig, {
    "devtool": config.build.devtool,
    "output": {
        "path": config.build.assetsRoot,
        "filename": assetsPath("js/{{ name }}.[name].js"),
        "chunkFilename": assetsPath("js/{{ name }}.[name].js")
    },
    "optimization": {
        "splitChunks": {
            "cacheGroups": {
                // split vendor js into its own file
                "vendor": {
                    "name": "vendor",
                    "test": /node_modules/,
                    "chunks": "initial",
                    "enforce": true
                }
            }
        },
        "namedModules": true
    },
    "plugins": [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            {{#if_or unit e2e}}"process.env": env{{/if_or}}{{#unless unit}}{{#unless e2e}}"process.env": require("../config/prod.env"){{/unless}}{{/unless}}
        }),
        new UglifyJsPlugin({
            "uglifyOptions": {
                "compress": {
                    "warnings": false
                }
            },
            "sourceMap": true,
            "parallel": true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            "filename": assetsPath("css/{{ name }}.css"),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            "allChunks": true,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            "cssProcessorOptions": {
                "safe": true,
                "map": {
                    "inline": false
                }
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            {{#if_or unit e2e}}"filename": indexFilename,{{/if_or}}{{#unless unit}}{{#unless e2e}}"filename": config.build.index,{{/unless}}{{/unless}}
            "template": "index.html",
            "inject": true,
            "minify": {
                "removeComments": true,
                "collapseWhitespace": true,
                "removeAttributeQuotes": true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            "chunksSortMode": "dependency"
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // copy custom static assets
        new CopyWebpackPlugin([{
            "from": path.resolve(__dirname, "../static"),
            "to": config.build.assetsSubDirectory,
            "ignore": [".*"]
        }])
    ]
});

if (config.build.bundleAnalyzerReport) {
    const {
        BundleAnalyzerPlugin
    } = require("webpack-bundle-analyzer");

    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
