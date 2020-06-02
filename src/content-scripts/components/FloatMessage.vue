<template>
  <el-alert
    :class="{
      'prodwarn-float-message': true,
      'prodwarn-float-bottom': true,
    }"
    type="warning"
    show-icon
  >
    <p class="prodwarn-float-message-body">{{ message }}</p>
  </el-alert>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FloatMessage extends Vue {
  message: String = 'Becareful, this is production site. Don\'t take any actions here, please!'
}
</script>

<style lang="scss">
  .prodwarn-float {
    &-message {
      position: fixed !important;
      left: 0 !important;
      width: 100% !important;
      z-index: 999999 !important;
      &-body {
        font-size: 20px;
      }
    }

    &-bottom {
      bottom: 0 !important;
    }

    &-top {
      top: 0 !important;
    }
  }
</style>
