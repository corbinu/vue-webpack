const config = require("../../config");

module.exports = {

    "browsers": ["chrome:headless", "firefox:headless"],

    "devServerURL": `http://localhost:${process.env.PORT || config.dev.port}`
};
