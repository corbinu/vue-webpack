"use strict";

process.env.NODE_ENV = "production";

const {
    promisify
} = require("util");
const path = require("path");

const rm = promisify(require("rimraf"));
const webpack = promisify(require("webpack"));
const ora = require("ora");
const chalk = require("chalk");

const config = require("../config");

const webpackConfig = require("./webpack.prod.conf");

const spinner = ora("building for production...");

async function build() {

    spinner.start();

    await rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory));

    const stats = await webpack(webpackConfig);

    spinner.stop();

    process.stdout.write(`${stats.toString({
        "colors": true,
        "modules": false,
        "children": true,
        "chunks": false,
        "chunkModules": false
    })}

`);

    if (stats.hasErrors()) throw new Error("Build failed");

    console.log(chalk `  {cyan Build complete.}

  {yellow Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.}
`);
}

/* eslint-disable promise/prefer-await-to-callbacks */
build().catch((err) => {
    spinner.stop();

    console.log(chalk `  {red Build failed with errors.}
`);

    console.log(err);

    process.exit(1);
});
