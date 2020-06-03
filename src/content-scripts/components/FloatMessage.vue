<template>
  <div
    :class="{
      'prodwarn-float-message': true,
      'prodwarn-float-message-bottom': true,
      'prodwarn-float-message-minimized': isMinimized,
    }"
  >
    <div v-if="!isMinimized" class="prodwarn-float-message-body">
      <strong>&#9888;</strong>
      <span>{{ message }}</span>
      <button
        class="prodwarn-float-message-close"
        title="Click to close"
        @click="toggleMinimize"
      >
        X
      </button>
    </div>

    <button
      v-else
      class="prodwarn-float-message-restore"
      title="Show detail"
      @click="toggleMinimize"
    >
      &#9888;
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FloatMessage extends Vue {
  message: string = '!!! Becareful, this is production site. Don\'t take any actions here, please!'

  isMinimized: boolean = false;

  created() {
    this.isMinimized = Boolean(localStorage.getItem('prodwarn-float-message-minimized'));
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;

    if (this.isMinimized) {
      localStorage.setItem('prodwarn-float-message-minimized', 'true');
    } else {
      localStorage.removeItem('prodwarn-float-message-minimized');
    }
  }
}
</script>

<style lang="scss" scoped>
  $minimizedSize: 45px;
  $minimizedFontSize: 30px;

  .prodwarn-float-message {
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 999999;
    padding: 1rem 2rem;
    background: #f82f25;
    color: #fff;
    box-shadow: 0 1px 5px 5px rgba(0, 0, 0, 0.2);
    &-body {
      font-size: 20px;
    }
    &-close {
      border: none;
      outline: none;
      background: transparent;
      color: #fff;
      display: inline-block;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor: pointer;
    }

    &-bottom {
      bottom: 0;
    }

    &-top {
      top: 0;
    }

    &-minimized {
      width: $minimizedSize;
      height: $minimizedSize;
      padding: 0;
      .prodwarn-float-message-restore {
        border: none;
        outline: none;
        width: $minimizedSize;
        height: $minimizedSize;
        background: #f82f25;
        color: #fff;
        font-size: $minimizedFontSize;
        font-weight: bold;
      }
    }
  }
</style>
