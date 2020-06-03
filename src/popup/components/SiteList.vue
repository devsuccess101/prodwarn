<template>
  <section class="section-protected-sites">
    <el-collapse v-model="activeNames" class="bg-white shadow-md">
      <el-collapse-item
        v-for="(sites, group) in dataSource"
        :key="group"
        :title="`${group || 'Unnamed'} (${sites.length})`"
        :name="group"
        class="protected-site-item"
      >
        <div
          v-for="(site, index) in sites"
          :key="index"
          class="flex px-4 py-2 justify-between items-center"
          style="border-bottom: solid 1px #e2e8f0;"
        >
          <div>
            <h4 class="text-black">
              <i v-if="!site.faviconURL" class="el-icon-link" />
              <img v-else :src="site.faviconURL" class="inline-block h-5 w-5 mr-1" />

              {{ site.name }}
            </h4>
            <span class="text-gray-700">
              {{ site.url }}
            </span>
          </div>

          <el-dropdown trigger="click">
            <el-button
              icon="el-icon-more transform rotate-90"
              class="border-0 pl-2"
              circle
            />

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push(`/edit-site/${site.host}`)">
                Edit
              </el-dropdown-item>

              <el-dropdown-item @click.native="$emit('remove', { site, index })">
                Remove
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SiteList extends Vue {
  @Prop({ default: () => ({ hello: true }) })
  dataSource!: object;

  activeNames: string[] = ['localhost'];
}
</script>

<style lang="scss">
  .protected-site-item {
    .el-collapse-item__header {
      padding-left: 1rem;
      padding-right: 1rem;
      &.is-active {
        border-bottom: solid 1px #73d47b;
      }
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
</style>
