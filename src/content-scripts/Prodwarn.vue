<template>
  <div id="prodwarn-root">
    <FloatMessage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FloatMessage from '@/content-scripts/components/FloatMessage.vue';

@Component({ components: { FloatMessage } })
export default class Prodwarn extends Vue {}
</script>
