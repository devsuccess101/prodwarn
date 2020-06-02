<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.87);
  min-width: 350px;
  height: 500px;
}
</style>
