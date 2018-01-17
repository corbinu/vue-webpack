import { mount } from "@vue/test-utils";

import HelloWorld from "../../../src/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
    it("should render correct contents", () => {
        const wrapper = mount(HelloWorld);

        expect(wrapper.isVueInstance()).toBeTruthy();

        expect(wrapper.element.querySelector(".hello h1").textContent).toEqual("Welcome to Your Vue.js App");
    });
});
