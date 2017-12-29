const config = require("../../config");

module.exports = {

    "browsers": ["chrome:headless", "firefox:headless", "safari"],

    "devServerURL": `http://localhost:${process.env.PORT || config.dev.port}`
};
