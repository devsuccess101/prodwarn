<template>
  <el-header class="flex items-center bg-gray-800">
    <el-button
      type="text"
      class="outline-none px-3 -ml-3 mr-2"
      icon="el-icon-s-unfold text-2xl text-white"
      @click="drawer = true"
    />

    <span class="capitalize text-2xl text-white">{{ pageTitle }}</span>

    <el-drawer :visible.sync="drawer" :withHeader="false" direction="ltr" size="63%">
      <slot name="drawer-menu">
        <el-menu :default-active="$route.path" router>
          <el-menu-item index="/" @click="drawer = false">
            <i class="el-icon-s-home"></i>
            <span>Home</span>
          </el-menu-item>

          <el-menu-item index="/about" @click="drawer = false">
            <i class="el-icon-info"></i>
            <span>About us</span>
          </el-menu-item>
        </el-menu>
      </slot>
    </el-drawer>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class Header extends Vue {
  drawer: boolean = false;

  get pageTitle(): string {
    return this.$route.meta.title || process.env.PACKAGE_NAME || 'Prodwarn';
  }
}
</script>
