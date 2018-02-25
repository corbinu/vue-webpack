const path = require("path");

module.exports = {
    "rootDir": path.resolve(__dirname, "../../"),
    "moduleFileExtensions": [
        "js",
        "ts",
        "json",
        "vue"
    ],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$",
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    "transform": {
        "^.+\\.js$": "ts-jest",
        "^.+\\.ts$": "ts-jest",
        ".*\\.(vue)$": "vue-jest"
    },{{#e2e}}
    "testPathIgnorePatterns": [
        "<rootDir>/test/e2e"
    ],{{/e2e}}
    "snapshotSerializers": ["jest-serializer-vue"],
    "setupFiles": ["<rootDir>/test/unit/setup"],
    "collectCoverage": true,
    "coverageDirectory": "<rootDir>/test/unit/coverage",
    "collectCoverageFrom": [
        "src/**/*.{ts,js,vue}",
        "!src/main.ts",
        {{#router}}
        "!src/router/index.ts",
        {{/router}}
        "!**/node_modules/**"
    ]
};
