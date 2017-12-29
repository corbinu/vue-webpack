<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

{{#unless router}}
import HelloWorld from "./components/HelloWorld";

{{/unless}}
export default Vue.extend({
    "name": "app"{{#router}}{{else}},
    "components": {
        HelloWorld
    }{{/router}}
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
