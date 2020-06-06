<template>
  <div
    :class="[
      'site-list-item flex px-4 py-2 justify-between items-center',
      'transition duration-500 hover:bg-green-100',
    ]"
    style="border-bottom: solid 1px #e2e8f0;"
  >
    <div class="site-list-item-title">
      <h4 class="text-black">
        <img
          :src="site.faviconURL || emptyFileSVG"
          class="inline-block h-4 w-4 mr-1"
          @error="onFaviconError"
        />

        {{ site.name }}
      </h4>
      <a
        :href="site.url"
        target="_blank"
        class="transition ease-in-out duration-300 text-gray-700 hover:text-black"
      >
        {{ site.url }}
      </a>
    </div>

    <div class="site-list-item-actions">
      <router-link :to="`/edit-site/${site.host}`">
        <el-button
          circle
          plain
          size="small"
          type="primary"
          icon="el-icon-edit"
          class="border-0 focus:outline-none"
        />
      </router-link>

      <el-button
        circle
        plain
        size="small"
        type="danger"
        icon="el-icon-delete"
        class="border-0 focus:outline-none"
        @click.native="$emit('remove', { site })"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import emptyFileSVG from '@/popup/assets/images/empty-file.svg';

@Component
export default class SiteList extends Vue {
  @Prop({ required: true })
  site!: object;

  emptyFileSVG: string = emptyFileSVG;

  onFaviconError = (event: any) => {
    event.target.setAttribute('src', this.emptyFileSVG);
  }
}
</script>
