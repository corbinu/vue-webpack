import { Selector } from "testcafe";
//import VueSelector from "testcafe-vue-selectors";

import * as config from "../testcafe.conf";

fixture`default e2e tests`.page(config.devServerURL);

test("Check app welcome", async (t) => {
    await Selector("#app");

    const helloExists = await Selector(".hello").exists;
    const h1 = await Selector("h1");
    const img = await Selector("img");

    await t
        .expect(helloExists).ok()
        .expect(h1.textContent).contains("Welcome to Your Vue.js App")
        .expect(img.count).eql(1);
});
