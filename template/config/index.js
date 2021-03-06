"use strict";

const path = require("path");

module.exports = {
    "dev": {

        // Paths
        "assetsSubDirectory": "static",
        "assetsPublicPath": "/",
        "proxyTable": {},

        // Various Dev Server settings
        // can be overwritten by process.env.HOST
        "host": "localhost",
        // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        "port": 8080,
        "autoOpenBrowser": true,
        // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        "poll": false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        "devtool": "cheap-module-eval-source-map",

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        "cacheBusting": true
    },

    "build": {
        // Template for index.html
        "index": path.resolve(__dirname, "../dist/index.html"),

        // Paths
        "assetsRoot": path.resolve(__dirname, "../dist"),
        "assetsSubDirectory": "static",
        "assetsPublicPath": "/",

        /**
         * Source Maps
         */
        // https://webpack.js.org/configuration/devtool/#production
        "devtool": "#source-map",

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        "bundleAnalyzerReport": process.env.npm_config_report
    }
};
