"use strict";

const path = require("path");

const config = require("../config");

const utils = require("./utils");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

const isProduction = process.env.NODE_ENV === "production";
let publicPath = config.dev.assetsPublicPath;

if (isProduction) publicPath = config.build.assetsPublicPath;

module.exports = {
    "mode": "production",
    "context": path.resolve(__dirname, "../"),
    "entry": {
        "app": "./src/main.ts"
    },
    "output": {
        "path": config.build.assetsRoot,
        "filename": "[name].js",
        publicPath
    },
    "resolve": {
        "extensions": [".ts", ".js", ".vue", ".json"],
        "alias": {
            {{#if_eq build "standalone"}}
            "vue$": "vue/dist/vue.esm.js",
            {{/if_eq}}
            "@": resolve("src"),
        }
    },
    "module": {
        "rules": [{
            "test": /\.vue$/,
            "loader": "vue-loader",
            "options": {
                "loaders": utils.cssLoaders(),
                "cssSourceMap": isProduction,
                "cacheBusting": config.dev.cacheBusting,
                "transformToRequire": {
                    "video": ["src", "poster"],
                    "source": "src",
                    "img": "src",
                    "image": "xlink:href"
                },
                "esModule": true
            }
        },
        {
            "test": /\.ts$/,
            "loader": "ts-loader",
            "options": {
                "appendTsSuffixTo": [/\.vue$/]
            }
        },
        {
            "test": /\.js$/,
            "loader": "babel-loader",
            "include": [resolve("src")]
        },
        {
            "test": /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            "loader": "url-loader"
        },
        {
            "test": /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            "loader": "url-loader"
        },
        {
            "test": /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            "loader": "url-loader"
        },
        ].concat(utils.styleLoaders())
    },
    "node": {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        "setImmediate": false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        "dgram": "empty",
        "fs": "empty",
        "net": "empty",
        "tls": "empty",
        "child_process": "empty"
    }
};
