process.env.NODE_ENV = "testing";

const createTestCafe = require("testcafe");
const globby = require("globby");

const config = require("./testcafe.conf");

async function runTestCafe() {
    const testcafe = await createTestCafe("localhost", 1337, 1338);
    const runner = testcafe.createRunner();

    const paths = await globby(["test/e2e/specs/**/*.ts"]);

    const failedCount = await runner
        .src(paths)
        .browsers(config.browsers)
        .startApp("npm run dev:test", 4000)
        .run();

    testcafe.close();

    if (failedCount > 0) throw new Error("Test failure");

    process.exit(0);
}

runTestCafe().catch((err) => {
    console.log(err);

    process.exit(1);
});
