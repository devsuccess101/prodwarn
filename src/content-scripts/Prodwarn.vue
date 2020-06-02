<template>
  <div id="prodwarn-root">
    <FloatMessage />
  </div>
</template>

<script lang="ts">
import ElementUI from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import FloatMessage from '@/content-scripts/components/FloatMessage.vue';

const loadStyle: Function = require('load-style');

Vue.use(ElementUI);

@Component({ components: { FloatMessage } })
export default class Prodwarn extends Vue {
  // eslint-disable-next-line
  beforeMount() {
    loadStyle('https://unpkg.com/element-ui/lib/theme-chalk/index.css');
  }
}
</script>
