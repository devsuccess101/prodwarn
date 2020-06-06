<template>
  <section class="section-search">
    <el-form :model="form" @submit.native.prevent="$emit('submit', form)">
      <el-input
        v-model="form.query"
        class="shadow"
        prefix-icon="el-icon-search"
        @focus="$emit('focus')"
        @input="$emit('submit', form)"
      >
        <template v-if="showCloseIcon" slot="append">
          <i class="el-icon-close" @click="form.query = '';$emit('close')" />
        </template>
      </el-input>
    </el-form>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import emptyFileSVG from '@/popup/assets/images/empty-file.svg';

@Component
export default class SiteList extends Vue {
  @Prop({ default: false })
  showCloseIcon!: boolean;

  form: object = {};
}
</script>

<style lang="scss">
  .section-search {
    .el-input {
      input {
        border-right: 0;
        &:focus {
          border-color: inherit;
        }
      }
    }
    .el-input-group__append {
      background: #fff;
      padding: 0 0.5rem;
      i {
        cursor: pointer;
      }
    }
  }
</style>
