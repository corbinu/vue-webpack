"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

exports.cssLoaders = () => {
    const cssLoader = {
        "loader": "css-loader",
        "options": {
            "sourceMap": isProduction
        }
    };

    const postcssLoader = {
        "loader": "postcss-loader",
        "options": {
            "sourceMap": isProduction
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [cssLoader, postcssLoader];

        if (loader) {
            loaders.push({
                "loader": `${loader}-loader`,
                "options": Object.assign({}, loaderOptions, {
                    "sourceMap": isProduction
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (isProduction) {
            return ExtractTextPlugin.extract({
                "use": loaders,
                "fallback": "vue-style-loader"
            });
        }

        return ["vue-style-loader"].concat(loaders);

    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        "css": generateLoaders(),
        "postcss": generateLoaders(),
        "less": generateLoaders("less"),
        "sass": generateLoaders("sass", {
            "indentedSyntax": true
        }),
        "scss": generateLoaders("sass"),
        "stylus": generateLoaders("stylus"),
        "styl": generateLoaders("stylus")
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (options) => {
    const output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension in loaders) {
        if ({}.hasOwnProperty.call(loaders, extension)) {
            const loader = loaders[extension];

            output.push({
                "test": new RegExp(`\\.${extension}$`),
                "use": loader
            });
        }
    }

    return output;
};
